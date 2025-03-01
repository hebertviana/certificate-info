import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(
            'certificate.preview',
            new CertificatePreviewEditorProvider(),
            { supportsMultipleEditorsPerDocument: true }
        )
    );

    let disposable = vscode.commands.registerCommand('certificate-info.showDetails', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("Nenhum arquivo aberto.");
            return;
        }
        const filePath = editor.document.uri.fsPath;
        const ext = path.extname(filePath).toLowerCase();

        let command = "";
        if(ext === '.csr') {
            command = `openssl req -in "${filePath}" -text -noout -verify`;
        } else if(ext === '.pem' || ext === '.pub') {
            command = `openssl pkey -pubin -in "${filePath}" -text -noout`;
        } else if(ext === '.crt' || ext === '.cer') {
            command = `openssl x509 -in "${filePath}" -text -noout`;
        } else {
            vscode.window.showErrorMessage("Tipo de arquivo não suportado. Utilize .csr, .pem, .pub, .crt ou .cer.");
            return;
        }

        exec(command, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Erro ao processar o arquivo: ${stderr}`);
                return;
            }
            // Gera uma URI única usando o nome do arquivo (sem extensão) e um timestamp
            const fileName = path.basename(filePath, path.extname(filePath));
            const previewUri = vscode.Uri.parse(
                `certificate-preview://authority/${encodeURIComponent(fileName)}?t=${Date.now()}`
            );
            // Abre o documento com o custom editor
            vscode.commands.executeCommand('vscode.openWith', previewUri, 'certificate.preview', vscode.ViewColumn.Beside);
            // Armazena o conteúdo no custom editor (você pode utilizar um provider interno para isso)
            CertificatePreviewEditorProvider.contents.set(previewUri.toString(), stdout);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

/**
 * Um provider básico para o custom readonly editor que exibe o conteúdo processado.
 */
class CertificatePreviewEditorProvider implements vscode.CustomReadonlyEditorProvider {
    // Armazena o conteúdo para cada URI
    static contents: Map<string, string> = new Map();

    async openCustomDocument(uri: vscode.Uri, openContext: vscode.CustomDocumentOpenContext, token: vscode.CancellationToken): Promise<vscode.CustomDocument> {
        return { uri, dispose: () => {} };
    }

    async resolveCustomEditor(document: vscode.CustomDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): Promise<void> {
        // Define as opções da webview – se não precisar de scripts, mantenha desabilitados
        webviewPanel.webview.options = {
            enableScripts: false
        };

        // Obtém o conteúdo para a URI atual
        const content = CertificatePreviewEditorProvider.contents.get(document.uri.toString()) || "Sem conteúdo.";
        // Configura o HTML a ser exibido na webview (apenas leitura)
        webviewPanel.webview.html = this.getHtmlForContent(content);
    }

    private getHtmlForContent(content: string): string {
        // Utilize <pre> para preservar a formatação
        return `
            <!DOCTYPE html>
            <html lang="pt">
            <head>
                <meta charset="UTF-8">
                <title>Certificate Preview</title>
                <style>
                    body { font-family: monospace; padding: 1rem; }
                    pre { white-space: pre-wrap; }
                </style>
            </head>
            <body>
                <pre>${content}</pre>
            </body>
            </html>
        `;
    }
}
