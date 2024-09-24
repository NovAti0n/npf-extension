import * as vscode from 'vscode';

import { constantCompletionProvider, constantHoverProvider } from './providers/constantProvider';
import { parameterCompletionProvider, parameterHoverProvider } from './providers/parameterProvider';
import { sectionCompletionProvider, sectionHoverProvider } from './providers/sectionProvider';
import { diagnosticProvider } from './providers/diagnosticProvider';

export function activate(context: vscode.ExtensionContext) {
    // Register the providers
    context.subscriptions.push(
        constantCompletionProvider,
        constantHoverProvider,
        parameterCompletionProvider,
        parameterHoverProvider,
        sectionCompletionProvider,
        sectionHoverProvider,
        diagnosticProvider
    );
}

export function deactivate() { }
