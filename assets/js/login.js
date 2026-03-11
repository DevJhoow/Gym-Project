function entrar() {

const email = document.getElementById("loginEmail").value
const senha = document.getElementById("loginSenha").value

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

const usuarioEncontrado = usuarios.find(user =>
user.email === email && user.senha === senha
)

if (!usuarioEncontrado) {

document.getElementById("msgLogin").innerText =
"Email ou senha incorretos."

return
}

localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado))

mostrarSistema()

}

function cadastrar() {

    const nome = document.getElementById("cadNome").value
    const email = document.getElementById("cadEmail").value
    const senha = document.getElementById("cadSenha").value

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

    const usuarioExistente = usuarios.find(user => user.email === email)

    if (usuarioExistente) {

        alert("Esse email já está cadastrado.")
        return

    }

    const novoUsuario = {
        nome,
        email,
        senha
    }

    usuarios.push(novoUsuario)

    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    // MOSTRAR MENSAGEM VERDE
    const msg = document.getElementById("msgCadastro")

    msg.style.display = "block"
    msg.innerText = "Conta criada com sucesso!"

    // esperar 2 segundos
    setTimeout(function () {

        // fechar modal
        const modal = bootstrap.Modal.getInstance(
            document.getElementById("modalCadastro")
        )

        modal.hide()

        // abrir login
        mostrarTela("login")

        // limpar campos
        document.getElementById("cadNome").value = ""
        document.getElementById("cadEmail").value = ""
        document.getElementById("cadSenha").value = ""

        // esconder mensagem novamente
        msg.style.display = "none"

    }, 2000)

}



function salvarPerfil() {

    const nome = document.getElementById("perfilNome").value
    const idade = document.getElementById("perfilIdade").value
    const peso = document.getElementById("perfilPeso").value
    const objetivo = document.getElementById("perfilObjetivo").value

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))

    const perfil = {
        nome,
        idade,
        peso,
        objetivo
    }

    localStorage.setItem("perfil_" + usuario.email, JSON.stringify(perfil))

    alert("Perfil salvo com sucesso!")

}

function carregarPerfil() {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))

    const perfil = JSON.parse(
        localStorage.getItem("perfil_" + usuario.email)
    )

    if (!perfil) return

    document.getElementById("perfilNome").value = perfil.nome
    document.getElementById("perfilIdade").value = perfil.idade
    document.getElementById("perfilPeso").value = perfil.peso
    document.getElementById("perfilObjetivo").value = perfil.objetivo

}

module.exports = login