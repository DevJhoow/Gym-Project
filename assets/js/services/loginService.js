function login(email, senha, usuarios){

const usuario = usuarios.find(user =>
user.email === email && user.senha === senha
)

return !!usuario

}

module.exports = login