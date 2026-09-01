let botoes = document.querySelectorAll('button')
let text = document.querySelector('#text')


botoes.forEach(botao => botao.addEventListener('click', clicar))
const padrao = 0
text.value = padrao
let conta = '0';

function clicar(event) {

    let botao = event.target.closest('button')
    let valor = botao.dataset.valor

    if (valor >= '0' && valor <= '9') {
        if(conta[0]==0){
            conta = ''
        }
        conta += valor
        
    }

    else if (valor === '+' || valor === '-' || valor === '*' || valor === '/') {
        if(conta[0]==0){
            conta = ''
        }
        conta += valor
    }

    else if (valor === 'AC') {
        text.value = padrao
        conta = '0'
        ajustarFonte()
        return
    }

    else if (valor === ','){
        let numeroAtual = conta.split(/[+\-*/]/).at(-1)
        if(!numeroAtual.includes(",")){
            conta += valor
        }
        
    }

    else if (valor === 'delete') {
        if(conta.length === 1){
            conta = '0'
        }
        else{
            conta = conta.slice(0, -1);
        }
        
    }

    else if (valor === '=') {
        let negativo = false

        if (conta[0] === '-') {
            negativo = true
            conta = conta.slice(1)
        }

        let listconta = conta.split('')

        let operadores = listconta.filter(function(letra, p) {
            return '+-*/'.includes(letra) &&
                listconta[p-1] != '+' &&
                listconta[p-1] != '-' &&
                listconta[p-1] != '*' &&
                listconta[p-1] != '/'
        })

        let cortes = []
        let numeroAtual = ''

        for (let i = 0; i < conta.length; i++) {

            if('0123456789'.includes(conta[i])){

                if(i+1 == conta.length){
                    numeroAtual += conta[i]
                    cortes.push(numeroAtual)
                    numeroAtual=''
                }   
                else{
                    numeroAtual += conta[i]
                }
            }   

            else if('+-*/'.includes(conta[i]) && '+-*/'.includes(conta[i-1])){
                numeroAtual += conta[i]
            }

            else if ('+-*/'.includes(conta[i])){
                cortes.push(numeroAtual)
                numeroAtual=''
            }
        }

        let numeros = cortes.map((numero)=>{
            return Number(numero)
        })

        if (negativo) {
            numeros[0] *= -1
        }

        let valorprimer;

        if(operadores.includes('*') || operadores.includes('/')){

            for (let i = 0; i < operadores.length; i++) {

                if (operadores[i] === '*') {
                    numeros.splice(i, 2, numeros[i] * numeros[i+1])
                    operadores.splice(i, 1)
                    i--
                }

                else if (operadores[i] === '/') {
                    numeros.splice(i, 2, numeros[i] / numeros[i+1])
                    operadores.splice(i, 1)
                    i--
                }

                else if(operadores[i] === '+' || operadores[i] === '-'){
                    valorprimer = numeros[i]
                }
            }

            valorprimer = numeros
        }

        else{
            valorprimer = numeros
        }

        operadores = operadores.filter((operador) => {
            return operador.includes('-') || operador.includes('+')
        })

        let valorfinal;

        if(operadores.includes('+') || operadores.includes('-')){

            for (let i = 0; i < operadores.length; i++) {

                if (operadores[i] === '+') {
                    numeros.splice(i, 2, numeros[i] + numeros[i+1])
                    operadores.splice(i, 1)
                    i--
                }

                else if (operadores[i] === '-') {
                    numeros.splice(i, 2, numeros[i] - numeros[i+1])
                    operadores.splice(i, 1)
                    i--
                }

                else{
                    return
                }
            }

            valorfinal = numeros
        }

        else{
            valorfinal = valorprimer
        }

        conta = String(numeros[0])
    }

    text.value = conta
    ajustarFonte()
}

function ajustarFonte() {
    let tamanho = 3.5

    if (conta.length > 8) {
        tamanho = 3
    }

    if (conta.length > 12) {
        tamanho = 2.5
    }

    if (conta.length > 16) {
        tamanho = 2
    }

    if (conta.length > 20) {
        tamanho = 1.7
    }

    text.style.fontSize = tamanho + 'em'
}