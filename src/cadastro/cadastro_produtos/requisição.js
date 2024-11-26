// app.js

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Capturar os dados do formulário
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor_prod = document.getElementById('valor_prod').value;

    // Criar um objeto com os dados
    const productData = {
        nome: nome,
        quantidade: parseInt(quantidade), // converter para número
        valor_prod: parseFloat(valor_prod) // converter para número
    };

    // Enviar os dados para a API usando Fetch API
    fetch('http://localhost:3333/cadastro/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        // Exibir a resposta da API
        const responseDiv = document.getElementById('response');
        if(data.erro) {
            responseDiv.innerHTML = `<p style="color:red;">Erro: ${data.erro}</p>`;
        } else {
            responseDiv.innerHTML = `<p style="color:green;">${data.msg}</p>`;
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
