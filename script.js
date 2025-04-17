// Constante para conversão de anos terrestres para anos-luz em milhas
const ANO_LUZ_EM_MILHAS = 5879000000000; // 5.879 trilhões de milhas

/**
 * Função principal que converte idade em anos terrestres para anos-luz em milhas
 * @param {number} idadeAnosTerrestres - Idade em anos terrestres
 * @returns {number} - Idade convertida para anos-luz em milhas
 */
function idadeEmAnosLuz(idadeAnosTerrestres) {
    // Verifica se o valor de entrada é válido
    if (typeof idadeAnosTerrestres !== 'number' || isNaN(idadeAnosTerrestres) || idadeAnosTerrestres < 0) {
        throw new Error('Por favor, insira uma idade válida em anos terrestres.');
    }

    // Calcula a idade em anos-luz (milhas percorridas pela luz)
    const idadeEmMilhas = idadeAnosTerrestres * ANO_LUZ_EM_MILHAS;

    return idadeEmMilhas;
}

/**
 * Formata um número grande para facilitar a leitura
 * @param {number} num - Número a ser formatado
 * @returns {string} - Número formatado com separadores de milhares
 */
function formatarNumeroGrande(num) {
    return num.toLocaleString('pt-BR', {
        maximumFractionDigits: 2
    });
}

/**
 * Converte um número para sua representação por extenso em português
 * @param {number} num - Número a ser convertido
 * @returns {string} - Número por extenso
 */
function numeroPorExtenso(num) {
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const dez_a_dezenove = ['dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const dezenas = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

    if (num === 0) return 'zero';
    // Aumentando o limite para suportar trilhões
    if (num > 999999999999999) return 'número muito grande para ser escrito por extenso';

    function converteAteMilhao(num) {
        if (num < 10) return unidades[num];
        if (num < 20) return dez_a_dezenove[num - 10];
        if (num < 100) return dezenas[Math.floor(num / 10)] + (num % 10 !== 0 ? ' e ' + unidades[num % 10] : '');
        if (num < 1000) {
            if (num === 100) return 'cem';
            return centenas[Math.floor(num / 100)] + (num % 100 !== 0 ? ' e ' + converteAteMilhao(num % 100) : '');
        }
        if (num < 1000000) {
            const milhar = Math.floor(num / 1000);
            const resto = num % 1000;
            let extenso = (milhar === 1 ? 'mil' : converteAteMilhao(milhar) + ' mil');
            if (resto !== 0) extenso += ' e ' + converteAteMilhao(resto);
            return extenso;
        }
        return '';
    }

    let extenso = '';
    
    // Adicionando suporte para trilhões
    const trilhao = Math.floor(num / 1000000000000);
    const restoTrilhao = num % 1000000000000;

    if (trilhao > 0) {
        extenso += (trilhao === 1 ? 'um trilhão' : converteAteMilhao(trilhao) + ' trilhões');
        if (restoTrilhao > 0) extenso += ' e ';
    }

    const bilhao = Math.floor(restoTrilhao / 1000000000);
    const restoBilhao = restoTrilhao % 1000000000;

    if (bilhao > 0) {
        extenso += (bilhao === 1 ? 'um bilhão' : converteAteMilhao(bilhao) + ' bilhões');
        if (restoBilhao > 0) extenso += ' e ';
    }

    const milhao = Math.floor(restoBilhao / 1000000);
    const restoMilhao = restoBilhao % 1000000;

    if (milhao > 0) {
        extenso += (milhao === 1 ? 'um milhão' : converteAteMilhao(milhao) + ' milhões');
        if (restoMilhao > 0) extenso += ' e ';
    }

    if (restoMilhao > 0) {
        extenso += converteAteMilhao(restoMilhao);
    }

    // Adiciona "de" antes de "milhas" para valores grandes (milhões, bilhões ou trilhões)
    if (num >= 1000000) {
        return extenso + ' de milhas';
    } else {
        return extenso + ' milhas';
    }
}

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const inputIdade = document.getElementById('idade');
    const botaoCalcular = document.getElementById('calcular');
    const resultadoValor = document.getElementById('resultado-valor');
    const resultadoExtenso = document.getElementById('resultado-extenso');

    // Adiciona evento de clique ao botão calcular
    botaoCalcular.addEventListener('click', function () {
        try {
            // Obtém e valida a idade do input
            const idade = parseFloat(inputIdade.value);

            if (isNaN(idade) || idade < 0) {
                alert('Por favor, insira uma idade válida.');
                return;
            }

            // Calcula a idade em anos-luz
            const resultado = idadeEmAnosLuz(idade);

            // Exibe o resultado formatado
            resultadoValor.textContent = formatarNumeroGrande(resultado);
            resultadoExtenso.textContent = numeroPorExtenso(resultado);
        } catch (error) {
            // Trata possíveis erros
            alert(error.message);
            console.error(error);
        }
    });

    // Permite calcular também pressionando Enter no input
    inputIdade.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            botaoCalcular.click();
        }
    });
});