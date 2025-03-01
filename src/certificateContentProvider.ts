import * as vscode from 'vscode';

export class CertificateContentProvider implements vscode.TextDocumentContentProvider {
    private _content: string = '';
    private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
    public readonly onDidChange = this._onDidChange.event;

    update(uri: vscode.Uri, content: string) {
        this._content = content;
        this._onDidChange.fire(uri);
    }

    // Método para acessar o conteúdo atual
    getContent(): string {
        return this._content;
    }

    provideTextDocumentContent(uri: vscode.Uri): string {
        return this._content;
    }
}
