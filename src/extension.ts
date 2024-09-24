import * as vscode from 'vscode';

import { sectionCompletionProvider, sectionHoverProvider } from './providers/sectionProvider';
import { diagnosticProvider } from './providers/diagnosticProvider';

export function activate(context: vscode.ExtensionContext) {
    // Register the providers
    context.subscriptions.push(sectionCompletionProvider, sectionHoverProvider, diagnosticProvider);
}

export function deactivate() { }
