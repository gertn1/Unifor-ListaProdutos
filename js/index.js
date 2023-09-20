
        const apiUrl = 'https://parseapi.back4app.com/classes/Product';
        const headers = {
            'X-Parse-Application-Id': 'juHvXqfJSaSIt8E832WOk28wqMG9u9fNyX2gbnGl',
            'X-Parse-REST-API-Key': 'yu2c2hdmOOB3MleckoeGhskqy1lxoZz5lWjWK1fM',
        };

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
                        parseFloat(product.price).toFixed(2) // Converter preço para número
                    }, Marca: ${product.marca}, Estoque: ${
                        parseInt(product.stock) // Converter estoque para número
                    }`;

                    productList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar a lista de produtos:', error);
            });
        }

        window.onload = listProducts;
    


