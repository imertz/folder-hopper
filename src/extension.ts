// folder-hopper/src/extension.ts

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Represents a folder item in the Quick Pick list
 */
interface FolderItem extends vscode.QuickPickItem {
    folderPath: string;
}

/**
 * Extension configuration
 */
interface FolderHopperConfig {
    maxDepth: number;
    excludePatterns: string[];
    showHiddenFolders: boolean;
    sortAlphabetically: boolean;
}

/**
 * Get extension configuration
 */
function getConfig(): FolderHopperConfig {
    const config = vscode.workspace.getConfiguration('folderHopper');
    return {
        maxDepth: config.get<number>('maxDepth', 5),
        excludePatterns: config.get<string[]>('excludePatterns', [
            'node_modules', '.git', '.svn', '.hg', '__pycache__',
            '.venv', 'venv', '.idea', '.vscode', 'dist', 'build',
            'out', 'target', '.next', '.nuxt'
        ]),
        showHiddenFolders: config.get<boolean>('showHiddenFolders', false),
        sortAlphabetically: config.get<boolean>('sortAlphabetically', true)
    };
}

/**
 * Check if a folder should be excluded based on configuration
 */
function shouldExclude(folderName: string, config: FolderHopperConfig): boolean {
    // Check if it's a hidden folder
    if (!config.showHiddenFolders && folderName.startsWith('.')) {
        return true;
    }
    
    // Check against exclude patterns
    return config.excludePatterns.includes(folderName);
}

/**
 * Recursively scan directories and collect folder paths
 */
async function scanFolders(
    rootPath: string,
    config: FolderHopperConfig,
    currentDepth: number = 0,
    cancellationToken?: vscode.CancellationToken
): Promise<string[]> {
    const folders: string[] = [];
    
    if (currentDepth >= config.maxDepth) {
        return folders;
    }
    
    if (cancellationToken?.isCancellationRequested) {
        return folders;
    }
    
    try {
        const entries = await fs.promises.readdir(rootPath, { withFileTypes: true });
        
        for (const entry of entries) {
            if (cancellationToken?.isCancellationRequested) {
                break;
            }
            
            if (!entry.isDirectory()) {
                continue;
            }
            
            if (shouldExclude(entry.name, config)) {
                continue;
            }
            
            const fullPath = path.join(rootPath, entry.name);
            folders.push(fullPath);
            
            // Recursively scan subfolders
            const subFolders = await scanFolders(
                fullPath,
                config,
                currentDepth + 1,
                cancellationToken
            );
            folders.push(...subFolders);
        }
    } catch (error) {
        // Silently ignore permission errors and other read failures
        console.warn(`Folder Hopper: Could not read directory ${rootPath}:`, error);
    }
    
    return folders;
}

/**
 * Convert folder paths to QuickPickItems
 */
function foldersToQuickPickItems(folders: string[], rootPath: string): FolderItem[] {
    return folders.map(folderPath => {
        const relativePath = path.relative(rootPath, folderPath);
        const folderName = path.basename(folderPath);
        
        return {
            label: `$(folder) ${folderName}`,
            description: relativePath,
            detail: folderPath,
            folderPath: folderPath
        };
    });
}

/**
 * Show folder picker and return selected folder path
 */
async function showFolderPicker(
    title: string,
    placeholder: string
): Promise<string | undefined> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('Folder Hopper: No workspace folder is open.');
        return undefined;
    }
    
    const config = getConfig();
    const quickPick = vscode.window.createQuickPick<FolderItem>();
    
    quickPick.title = title;
    quickPick.placeholder = placeholder;
    quickPick.busy = true;
    quickPick.show();
    
    // Create a cancellation token source
    const cts = new vscode.CancellationTokenSource();
    
    // Cancel scanning when quick pick is hidden
    quickPick.onDidHide(() => {
        cts.cancel();
    });
    
    try {
        // Collect all folders from all workspace roots
        const allFolders: FolderItem[] = [];
        
        for (const workspaceFolder of workspaceFolders) {
            const rootPath = workspaceFolder.uri.fsPath;
            
            // Add the root folder itself
            allFolders.push({
                label: `$(root-folder) ${workspaceFolder.name}`,
                description: '(workspace root)',
                detail: rootPath,
                folderPath: rootPath
            });
            
            // Scan for subfolders
            const folders = await scanFolders(rootPath, config, 0, cts.token);
            const items = foldersToQuickPickItems(folders, rootPath);
            allFolders.push(...items);
        }
        
        // Sort if configured
        if (config.sortAlphabetically) {
            allFolders.sort((a, b) => {
                // Keep workspace roots at the top
                if (a.description === '(workspace root)') return -1;
                if (b.description === '(workspace root)') return 1;
                return a.folderPath.localeCompare(b.folderPath);
            });
        }
        
        quickPick.items = allFolders;
        quickPick.busy = false;
        
        // Wait for user selection
        return new Promise<string | undefined>((resolve) => {
            quickPick.onDidAccept(() => {
                const selected = quickPick.selectedItems[0];
                quickPick.hide();
                resolve(selected?.folderPath);
            });
            
            quickPick.onDidHide(() => {
                quickPick.dispose();
                resolve(undefined);
            });
        });
    } catch (error) {
        quickPick.hide();
        vscode.window.showErrorMessage(`Folder Hopper: Error scanning folders: ${error}`);
        return undefined;
    }
}

/**
 * Open a folder in VS Code
 */
async function openFolder(folderPath: string, newWindow: boolean): Promise<void> {
    const folderUri = vscode.Uri.file(folderPath);
    
    await vscode.commands.executeCommand(
        'vscode.openFolder',
        folderUri,
        { forceNewWindow: newWindow }
    );
}

/**
 * Command: Go to Folder
 */
async function goToFolder(resource?: vscode.Uri): Promise<void> {
    // If called from context menu on a folder, open that folder directly
    if (resource) {
        const stat = await vscode.workspace.fs.stat(resource);
        if (stat.type === vscode.FileType.Directory) {
            await openFolder(resource.fsPath, false);
            return;
        }
    }
    
    const selectedFolder = await showFolderPicker(
        'Go to Folder',
        'Select a folder to open in the current window'
    );
    
    if (selectedFolder) {
        await openFolder(selectedFolder, false);
    }
}

/**
 * Command: Go to Folder (New Window)
 */
async function goToFolderNewWindow(resource?: vscode.Uri): Promise<void> {
    // If called from context menu on a folder, open that folder directly
    if (resource) {
        const stat = await vscode.workspace.fs.stat(resource);
        if (stat.type === vscode.FileType.Directory) {
            await openFolder(resource.fsPath, true);
            return;
        }
    }
    
    const selectedFolder = await showFolderPicker(
        'Go to Folder (New Window)',
        'Select a folder to open in a new window'
    );
    
    if (selectedFolder) {
        await openFolder(selectedFolder, true);
    }
}

/**
 * Command: Open Parent Folder
 */
async function openParentFolder(): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('Folder Hopper: No workspace folder is open.');
        return;
    }
    
    // If multiple workspace folders, let user choose
    let targetFolder: string;
    
    if (workspaceFolders.length === 1) {
        targetFolder = workspaceFolders[0].uri.fsPath;
    } else {
        const items = workspaceFolders.map(folder => ({
            label: folder.name,
            description: folder.uri.fsPath,
            folderPath: folder.uri.fsPath
        }));
        
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select workspace folder to get parent of'
        });
        
        if (!selected) {
            return;
        }
        
        targetFolder = selected.folderPath;
    }
    
    const parentFolder = path.dirname(targetFolder);
    await openFolder(parentFolder, false);
}

/**
 * Command: Open Parent Folder (New Window)
 */
async function openParentFolderNewWindow(): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage('Folder Hopper: No workspace folder is open.');
        return;
    }
    
    let targetFolder: string;
    
    if (workspaceFolders.length === 1) {
        targetFolder = workspaceFolders[0].uri.fsPath;
    } else {
        const items = workspaceFolders.map(folder => ({
            label: folder.name,
            description: folder.uri.fsPath,
            folderPath: folder.uri.fsPath
        }));
        
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select workspace folder to get parent of'
        });
        
        if (!selected) {
            return;
        }
        
        targetFolder = selected.folderPath;
    }
    
    const parentFolder = path.dirname(targetFolder);
    await openFolder(parentFolder, true);
}

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext): void {
    console.log('Folder Hopper extension is now active');
    
    // Register commands
    const commands = [
        vscode.commands.registerCommand('folderHopper.goToFolder', goToFolder),
        vscode.commands.registerCommand('folderHopper.goToFolderNewWindow', goToFolderNewWindow),
        vscode.commands.registerCommand('folderHopper.openParentFolder', openParentFolder),
        vscode.commands.registerCommand('folderHopper.openParentFolderNewWindow', openParentFolderNewWindow)
    ];
    
    context.subscriptions.push(...commands);
}

/**
 * Extension deactivation
 */
export function deactivate(): void {
    console.log('Folder Hopper extension is now deactivated');
}
