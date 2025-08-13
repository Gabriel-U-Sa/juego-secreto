let numeroSecreto = 0;
let intentos = 0;
let numerosSorteados = [];
let numeroMaximo = 10;
let maximoIntentos = Math.floor((numeroMaximo/5))+1;
//console.log(maximoIntentos);

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento () {
    let numeroDeUsuaro = parseInt(document.getElementById('valorUsuario').value);
    //console.log (intentos);
    if (numeroDeUsuaro === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? "intento" : "intentos"}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        //El usuario no acerto
        if (numeroDeUsuaro > numeroSecreto){
            asignarTextoElemento ('p','El número secreto es menor');
        }else{
            asignarTextoElemento ('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    if (intentos > maximoIntentos) {
        asignarTextoElemento ('p',`Llegaste al número maximo de ${maximoIntentos} intentos.`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intentoUsuario').setAttribute('disabled','true');
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
    
}

function condicionesIniciales (){
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function intentarDeNuevo(){
    //Limpia la caja, reinicia contador, generar nuevo numero, indicar mensaje inicio e intervalo
    limpiarCaja();
    condicionesIniciales();
    //Deshabilitar botón nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled','true');
    document.getElementById('intentoUsuario').removeAttribute('disabled');
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    
    console.log(numeroGenerado);
    console.log(numerosSorteados);
    //Si ya sorteamos todos los números
    if(numerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles')
    }else {
        //Si el número generado esta en la lista 
        if (numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

condicionesIniciales();
