import * as vscode from 'vscode';

import { sectionCompletionProvider, sectionHoverProvider } from './providers/sectionProvider';
import { constantCompletionProvider, constantHoverProvider } from './providers/constantProvider';
import { diagnosticProvider } from './providers/diagnosticProvider';

export function activate(context: vscode.ExtensionContext) {
    // Register the providers
    context.subscriptions.push(
        sectionCompletionProvider,
        sectionHoverProvider,
        constantCompletionProvider,
        constantHoverProvider,
        diagnosticProvider
    );
}

export function deactivate() { }
