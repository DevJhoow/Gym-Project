const login = require("../assets/js/services/loginService")

test("login com dados corretos", () => {

    const usuarios = [
        { email: "teste@email.com", senha: "123" }
    ]

    const resultado = login("teste@email.com", "123", usuarios)

    expect(resultado).toBe(true)

})