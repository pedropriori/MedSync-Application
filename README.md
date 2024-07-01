# MedSync Frontend

Este é o repositório do frontend do projeto MedSync, uma plataforma que conecta profissionais de saúde com pacientes, facilitando o acesso a serviços de saúde de qualidade, eficientes e transparentes.

## Configuração do Ambiente

Para configurar o frontend, você precisará criar um arquivo `.env.local` na raiz do projeto com a seguinte variável de ambiente:

```sh
VITE_UPLOAD_PRESET=
```

Essa variável deve conter o endereço criado no Cloudinary para fazer o upload das imagens.

## Inicialização do Projeto

1. Clone o repositório do frontend:

   ```sh
   git clone https://github.com/pedropriori/MedSync-Application.git
   ```

2. Instale as dependências:

   ```sh
   cd medsync-frontend
   npm install
   ```

3. Crie o arquivo `.env.local` e configure a variável de ambiente conforme mencionado anteriormente.

4. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

O frontend estará disponível em `http://localhost:5173`.

## Tecnologias Utilizadas

- Vite
- React
- Tailwind CSS
- Cloudinary
- Entre Outros

## Contribuição

Sinta-se à vontade para fazer um fork do projeto, abrir issues e enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.
