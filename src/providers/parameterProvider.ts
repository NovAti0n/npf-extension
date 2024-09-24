import * as vscode from "vscode";

import { buildSymbolHoverProvider } from "./generic/symbolProvider";
import parameters from "../symbols/parameters";
import { Section } from "../symbols/sections";

export const parameterCompletionProvider = vscode.languages.registerCompletionItemProvider({ language: 'npf', scheme: 'file' }, {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        // Get the current line and detect the section
        const line = document.lineAt(position).text;
        const sectionMatch = line.match(/^%(\w+)/);

        if (!sectionMatch || !line.endsWith(" ")) return undefined;

        const currentSection = sectionMatch[1] as Section;

        // Find all valid parameters for the current section
        const validParameters = parameters.filter(param => param.sections.includes(currentSection));

        // Create completion items for each valid parameter
        const completionItems = validParameters.map(param => {
            const item = new vscode.CompletionItem(param.name, vscode.CompletionItemKind.Variable);
            item.insertText = new vscode.SnippetString(`${param.name}=\${1:value}`);
            item.documentation = new vscode.MarkdownString(param.description);

            return item;
        });

        return completionItems;
    }
});

export const parameterHoverProvider = buildSymbolHoverProvider(parameters);
