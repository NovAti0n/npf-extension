import * as path from "path";

import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from "vscode-languageclient/node";

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    let serverModule = context.asAbsolutePath(path.join("server", "out", "server.js"));
    let debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

    let serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: "file", language: "npf" }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher("**/.clientrc")
        }
    };

    client = new LanguageClient(
        "npfLanguageServer",
        "NPF Language Server",
        serverOptions,
        clientOptions
    );

    client.start();
    console.log("Client started");
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) return undefined;

    return client.stop();
}