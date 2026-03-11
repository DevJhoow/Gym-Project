const calcularIMC = require("../assets/js/imc")

test("calcular IMC corretamente", () => {

const resultado = calcularIMC(80, 1.80)

expect(resultado).toBeCloseTo(24.69)

})