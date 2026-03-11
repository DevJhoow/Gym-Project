// ===============================
// CONTROLE DE TELAS
// ===============================

function mostrarTela(tela) {

    const logado = localStorage.getItem("usuarioLogado")

    if (!logado && tela !== "login") {
        alert("Faça login primeiro")
        tela = "login"
    }

    const cards = document.querySelector(".cards-home")
    if (cards) {
        cards.style.display = "none"
    }

    const telas = ["imc", "perfil", "dieta", "treinos", "login"]

    telas.forEach(function (id) {

        const elemento = document.getElementById(id)

        if (elemento) {
            elemento.style.display = "none"
        }

    })

    const telaAtual = document.getElementById(tela)

    if (telaAtual) {
        telaAtual.style.display = "block"
    }

    if (tela === "perfil") {
        carregarPerfil()
    }

}


// ===============================
// IMC - INTERFACE
// ===============================

function calcularIMCInterface() {

    const peso = parseFloat(document.getElementById("peso").value)
    const altura = parseFloat(document.getElementById("altura").value)

    if (!peso || !altura) {

        document.getElementById("resultado").innerText =
            "Preencha peso e altura."

        return
    }

    const imc = calcularIMC(peso, altura)

    document.getElementById("resultado").innerText =
        "Seu IMC é: " + imc.toFixed(2)

}


// ===============================
// VOLTAR PARA HOME
// ===============================

function voltarHome() {

    const cards = document.querySelector(".cards-home")

    if (cards) {
        cards.style.display = "block"
    }

    const telas = ["imc", "perfil", "dieta", "treinos", "login"]

    telas.forEach(function (id) {

        const elemento = document.getElementById(id)

        if (elemento) {
            elemento.style.display = "none"
        }

    })

}


// ===============================
// MOSTRAR SISTEMA LOGADO
// ===============================

function mostrarSistema() {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"))

    if (!usuario) return

    const nome = document.getElementById("usuarioNome")

    if (nome) {
        nome.innerText = "Olá " + usuario.nome
    }

    const btnLogin = document.getElementById("btnLogin")
    const btnSair = document.getElementById("btnSair")

    if (btnLogin) btnLogin.style.display = "none"
    if (btnSair) btnSair.style.display = "block"

    const cards = document.querySelector(".cards-home")

    if (cards) {
        cards.style.display = "block"
    }

    const loginTela = document.getElementById("login")

    if (loginTela) {
        loginTela.style.display = "none"
    }

}


// ===============================
// LOGOUT
// ===============================

function sair() {

    localStorage.removeItem("usuarioLogado")

    const nome = document.getElementById("usuarioNome")
    if (nome) nome.innerText = ""

    const btnLogin = document.getElementById("btnLogin")
    const btnSair = document.getElementById("btnSair")

    if (btnLogin) btnLogin.style.display = "block"
    if (btnSair) btnSair.style.display = "none"

    const email = document.getElementById("loginEmail")
    const senha = document.getElementById("loginSenha")

    if (email) email.value = ""
    if (senha) senha.value = ""

    const msg = document.getElementById("msgLogin")
    if (msg) msg.style.display = "none"

    mostrarTela("login")

}


// ===============================
// EXECUTA AO ABRIR O SITE
// ===============================

window.onload = function () {

    const usuario = localStorage.getItem("usuarioLogado")

    if (usuario) {
        mostrarSistema()
    } else {
        mostrarTela("login")
    }

}