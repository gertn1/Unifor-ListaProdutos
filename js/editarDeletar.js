
const apiUrl = 'https://parseapi.back4app.com/classes/Product';
const headers = {
    'X-Parse-Application-Id': 'juHvXqfJSaSIt8E832WOk28wqMG9u9fNyX2gbnGl',
    'X-Parse-REST-API-Key': 'yu2c2hdmOOB3MleckoeGhskqy1lxoZz5lWjWK1fM',
};
const masterKey = 'YOUR_MASTER_KEY'; // Substitua pelo seu Master Key

// Variáveis para o formulário de edição
const editProductForm = document.getElementById('editProductForm');
const editProductId = document.getElementById('editProductId');
const editName = document.getElementById('editName');
const editDescription = document.getElementById('editDescription');
const editPrice = document.getElementById('editPrice');
const editMarca = document.getElementById('editMarca');
const editStock = document.getElementById('editStock');

function listProducts() {
    fetch(apiUrl, {
        headers: headers,
    })
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        data.results.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `Nome: ${product.name}, Descrição: ${product.description}, Preço: ${
                typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : 'Preço indisponível'
            }`;

            
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editProduct(product));

            // Botão para excluir
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '  Excluir';
            deleteButton.addEventListener('click', () => deleteProduct(product.objectId));

            li.appendChild(editButton);
            li.appendChild(deleteButton);

            productList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar a lista de produtos:', error);
    });
}

function editProduct(product) {
    editProductId.value = product.objectId;
    editName.value = product.name;
    editDescription.value = product.description;
    editPrice.value = typeof product.price === 'number' ? product.price.toFixed(2) : '';
    editMarca.value = product.marca;
    editStock.value = product.stock;

    // Exibe o formulário de edição e oculta o botão "Editar" na lista
    editProductForm.style.display = 'block';
}

function deleteProduct(productId) {
    if (confirm('Tem certeza de que deseja excluir este produto?')) {
        fetch(`${apiUrl}/${productId}`, {
            method: 'DELETE',
            headers: {
                ...headers,
                'X-Parse-Master-Key': masterKey,
            },
        })
        .then(response => {
            if (response.status === 200) {
                console.log(`Produto com ID ${productId} excluído com sucesso.`);
                listProducts(); // Atualizar a lista após a exclusão
            } else {
                console.error(`Erro ao excluir o produto com ID ${productId}:`, response.status);
            }
        })
        .catch(error => {
            console.error(`Erro ao excluir o produto com ID ${productId}:`, error);
        });
    }
}

editProductForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const productId = editProductId.value;

    const editedProduct = {
        name: editName.value,
        description: editDescription.value,
        price: parseFloat(editPrice.value),
        marca: editMarca.value,
        stock: parseInt(editStock.value),
    };

    // Realiza a atualização do produto
    fetch(`${apiUrl}/${productId}`, {
        method: 'PUT', // Utiliza PUT para atualização
        headers: {
            ...headers,
            'X-Parse-Master-Key': masterKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
    })
    .then(response => {
        if (response.status === 200) {
            console.log(`Produto com ID ${productId} atualizado com sucesso.`);
            listProducts(); // Atualizar a lista após a edição
            editProductForm.style.display = 'none'; // Oculta o formulário de edição
        } else {
            console.error(`Erro ao atualizar o produto com ID ${productId}:`, response.status);
        }
    })
    .catch(error => {
        console.error(`Erro ao atualizar o produto com ID ${productId}:`, error);
    });
});

window.onload = listProducts;