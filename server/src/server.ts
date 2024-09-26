import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeResult,
	TextDocumentSyncKind,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

import { validateDocument } from './utils/parser';

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize(_ => {
	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental, // Server will sync document changes to the client
			/* completionProvider: { // Server provides completion items
				resolveProvider: true // Server will resolve additional information for completion items
			} */
		}
	};

	return result;
});

connection.onInitialized(() => {
	console.log("Server initialized");
});

documents.onDidChangeContent(c => {
	const diagnostics = validateDocument(c.document);
	connection.sendDiagnostics({ uri: c.document.uri, diagnostics });
})

documents.listen(connection);
connection.listen();