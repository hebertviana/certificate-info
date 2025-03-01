# Certificate Info

**Certificate Info** é uma extensão para o Visual Studio Code que facilita a visualização e análise de certificados digitais, chaves públicas e CSRs (Certificate Signing Requests). Utilizando comandos do OpenSSL, a extensão extrai informações relevantes dos arquivos e as apresenta em uma aba de preview somente leitura, permitindo uma inspeção rápida.

## Features

- **Visualização Rápida de Certificados:**  
  Suporta arquivos com extensões como `.cer`, `.crt`, `.csr`, `.pem` e `.pub`. A extensão detecta o tipo de arquivo e executa o comando OpenSSL correspondente para extrair os detalhes.

- **Aba de Preview Personalizada:**  
  Os resultados são exibidos em uma nova aba, em modo preview (somente leitura), ao lado do arquivo original, facilitando a análise.

## Requirements

- **OpenSSL:**  
  Certifique-se de que o OpenSSL está instalado e acessível no seu sistema, pois a extensão depende dele para processar os arquivos de certificado.

- **Node.js (versão LTS recomendada):**  
  Para desenvolvimento da extensão, é recomendável utilizar uma versão LTS do Node.js (como v16 ou v18).

## Usage

1. Abra um arquivo de certificado (.cer, .crt, .csr, .pem ou .pub) no VS Code.
2. Clique no botão de ação (ícone) na barra de título do editor para exibir as informações do certificado.
3. O output do comando OpenSSL será exibido em uma nova aba de preview, onde você poderá visualizar os detalhes sem risco de edição.

## Extension Settings

Atualmente, a extensão não possui configurações adicionais. Futuramente, podem ser adicionadas opções para configurar o caminho do OpenSSL ou ajustar os parâmetros dos comandos.

## Known Issues

- Se múltiplos arquivos forem abertos, certifique-se de que cada preview seja exibido em uma aba separada (a URI única gerada pela extensão garante essa funcionalidade).
- Em alguns ambientes, pode ser necessário ajustar as permissões para que o OpenSSL seja executado corretamente.

## Release Notes

### 1.0.0

- Lançamento inicial com suporte para visualização de certificados, CSRs e chaves públicas.
- Integração com a barra de título do editor e exibição de preview somente leitura.

---

## Contributing

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues com sugestões de melhorias e correções.

## License

[MIT License](LICENSE)

---

## Additional Resources

- [Documentação Oficial do VS Code para Extensões](https://code.visualstudio.com/api)
- [OpenSSL Documentation](https://www.openssl.org/docs/)
- [VS Code Icon Guidelines](https://code.visualstudio.com/api/references/icons-in-labels)

**Aproveite e melhore seus processos de análise de certificados com o Certificate Info!**
