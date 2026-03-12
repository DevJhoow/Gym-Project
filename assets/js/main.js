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

async function testarAPI() {

    const resposta = await fetch(
        "https://exercisedb.p.rapidapi.com/exercises?limit=3",
        {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "2eaf0cd17cmsh3cdc141c92eb5f5p196f26jsna65d754b84ff",
                "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
            }
        }
    )

    const dados = await resposta.json()

    const resultado = document.getElementById("exercicios")

    resultado.innerHTML = ""

    dados.forEach(exercicio => {

        resultado.innerHTML += `
           <div class="card-exercicio">

    <img src="${exercicio.gifUrl}" class="gif-exercicio">

        <div class="info-exercicio">

            <h6>${exercicio.name}</h6>

            <p>
                <i class="bi bi-bullseye"></i>
                ${exercicio.target}
            </p>

            <p>
                <i class="bi bi-tools"></i>
                ${exercicio.equipment}
            </p>

        </div>
        `

    })

}