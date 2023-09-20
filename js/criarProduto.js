
        document.getElementById('createProductForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const apiUrl = 'https://parseapi.back4app.com/classes/Product';
            const headers = {
                'X-Parse-Application-Id': 'juHvXqfJSaSIt8E832WOk28wqMG9u9fNyX2gbnGl',
                'X-Parse-REST-API-Key': 'yu2c2hdmOOB3MleckoeGhskqy1lxoZz5lWjWK1fM',
                'Content-Type': 'application/json'
            };

            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value; // Agora tratado como uma string
            const marca = document.getElementById('marca').value;
            const stock = parseInt(document.getElementById('stock').value);

            const newProductData = {
                name: name,
                description: description,
                price: price, // Deve ser uma string
                marca: marca,
                stock: stock
            };

            fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(newProductData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Produto criado com sucesso. Objeto retornado:', data);
                alert('Produto criado com sucesso!');
                // Limpar o formulário após o sucesso, se necessário
                document.getElementById('createProductForm').reset();
            })
            .catch(error => {
                console.error('Erro ao criar o produto:', error);
                alert('Erro ao criar o produto. Verifique o console para mais informações.');
            });
        });
   