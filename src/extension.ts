import * as vscode from 'vscode';

const sections = [
    "%info",
    "%variables",
    "%script",
    "%config"
]

export function activate(context: vscode.ExtensionContext) {
    console.log("Hello World!");

    const sectionCompletionProvider = vscode.languages.registerCompletionItemProvider(
        { language: 'npf', scheme: 'file' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substring(0, position.character);
    
                if (!linePrefix.startsWith('%')) return undefined;
    
                const typedSection = linePrefix.slice(1);
    
                const filteredSections = sections.filter(section =>
                    section.startsWith(`%${typedSection}`)
                );
    
                return filteredSections.map(section => {
                    const item = new vscode.CompletionItem(section, vscode.CompletionItemKind.Keyword);
                    item.insertText = section;
                    return item;
                });
            }
        },
        '%'
      );
    
      context.subscriptions.push(sectionCompletionProvider);
}

export function deactivate() { }
