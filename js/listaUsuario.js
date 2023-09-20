
// Initialize Parse
Parse.initialize("juHvXqfJSaSIt8E832WOk28wqMG9u9fNyX2gbnGl", "m7c2Wl9Yw0MA2mRBMaWYzA0fYP3vS5I9cyGqR1Wg"); // PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";

// Função para listar usuários
async function listUsers() {
    try {
        const query = new Parse.Query(Parse.User);
        const users = await query.find();

        // Limpar a lista existente
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        // Iterar pelos resultados e adicionar à lista
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Username: ${user.get("username")}, Email: ${user.get("email")}`;
            
            // Botão Excluir
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deleteUser(user));

            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    } catch (error) {
        alert(`Erro ao listar usuários: ${error.message}`);
    }
}

// Função para excluir um usuário
async function deleteUser(user) {
    try {
        if (confirm(`Tem certeza de que deseja excluir o usuário ${user.get("username")}?`)) {
            await user.destroy();
            listUsers(); // Atualiza a lista após a exclusão
        }
    } catch (error) {
        alert(`Erro ao excluir o usuário: ${error.message}`);
    }
}

// Chamar a função para listar os usuários quando a página carregar
window.addEventListener('load', listUsers);
