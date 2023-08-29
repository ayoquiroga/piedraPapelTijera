// Declara variable nombre
let nombre
let rondas_terminadas = 0
let rondas_ganadas_COMPU = 0
let rondas_ganadas_JUGADOR = 0
const opciones = ["piedra", "papel", "tijera"]

// función para capturar el nombre ingresado
function cargar() {

    // Captura el valor del input con id="nombre" y lo asigna a la variable "nombre".
    nombre = document.getElementById("nombre").value

    // Verifica que nombre no esté vacío
    if (nombre == '' || !(isNaN(nombre))) {

        alert('Ingresa un nombre válido')

        // si nombre es string y no vacío entonces muestra los elementos del juego
    } else {

        document.getElementById("piedra").style.visibility = "visible"
        document.getElementById("papel").style.visibility = "visible"
        document.getElementById("tijera").style.visibility = "visible"
    }
    // retorna nombre
    return nombre;
}

// agrega un evento que se ejecuta cuando la página cargó siendo su estado 'DOMContentLoaded'
document.addEventListener("DOMContentLoaded", function () {

    //condición necesaria para que puedan agregarse los eventos
    if (nombre) {

        // maepa botones
        const piedra = document.getElementById('piedra')
        const papel = document.getElementById('papel')
        const tijera = document.getElementById('tijera')

        // agrega eventos "click" en los elementos con los ids detallados
        document.addEventListener("click", () => ronda(piedra))
        document.addEventListener("click", () => ronda(papel))
        document.addEventListener("click", () => ronda(tijera))
        document.addEventListener("click", () => resaltar(piedra))
        document.addEventListener("click", () => resaltar(papel))
        document.addEventListener("click", () => resaltar(tijera))
    }
})


// obtiene el valor de la imagen de la carta seleccionada
function ronda(jugada) {

    // declaracion de varialbes que se utilizarán
    let mensaje_resultado
    let jugada_pc

    // si las rondas efectivas son menores a 5 y alguno de los jugadores ganó 3 veces
    if (rondas_terminadas < 5 && rondas_ganadas_JUGADOR < 3 && rondas_ganadas_COMPU < 3) {

        // guardo en elemento el tag con id=resultado
        const elemento = document.getElementById("resultado")
   
        // asigna una jugada para PC
        jugada_pc = jugadaAleatoria()

        // determina un ganador
        let ganador = determinarGanador(jugada, jugada_pc)

        // si el ganador es jugador
        if (ganador == 'JUGADOR') {

            // retorno el mensaje "JUGADOR GANA LA RONDA"
            // mensaje_resultado = `${nombre} GANA LA RONDA: | usuario [ ${rondas_ganadas_JUGADOR+1} ] => ${jugada}  |  ${jugada_pc} <= [ ${rondas_ganadas_COMPU} ] PC |`
            mensaje_resultado = `${nombre} GANA LA RONDA`
            elemento.innerHTML = mensaje_resultado

            document.getElementById('usuario').innerText = 'Usuario [ '+ (rondas_ganadas_JUGADOR+1) +' ] => '+jugada
            document.getElementById('pc').innerText = jugada_pc +' <= [ '+rondas_ganadas_COMPU + ' ] PC' +
           
            // contabiliza la ronda para jugador
            rondas_ganadas_JUGADOR++

            // muestra el resultado por consola para JUGADOR
            console.log(`rondas jugador: ${rondas_ganadas_JUGADOR}`)

            // aumenta en escala el tamaño de los elementos elegidos según ganador y no ganador
            zoomerOut(jugada_pc)
            zoomerOutWin(jugada)

            // retorna el total de rondas ganadas
            return rondas_ganadas_JUGADOR

        } else if (ganador == 'COMPUTADORA') {

            // retorno el mensaje "COMPUTADORA GANA LA RONDA"
            mensaje_resultado = `COMPUTADORA GANA LA RONDA`
            elemento.innerHTML = mensaje_resultado

            document.getElementById('usuario').innerText = 'Usuario [ '+ rondas_ganadas_JUGADOR +' ] => '+jugada
            document.getElementById('pc').innerText =  jugada_pc+' <= [ '+(rondas_ganadas_COMPU+1) + ' ] PC'

            // contabiliza la ronda para PC
            rondas_ganadas_COMPU++

            // retorna el total de rondas ganadas para PC
            console.log(`rondas pc: ${rondas_ganadas_COMPU}`)

            // aumenta en escala el tamaño de los elementos elegidos según ganador y no ganador
            zoomerOutWin(jugada_pc)
            zoomerOut(jugada)
            
            // retorna el total de rondas ganadas
            return rondas_ganadas_COMPU

            // si hay empate
        } else if ('EMPATE') {
            
            // solo muestra el mensaje "HUBO EMPATE EN LA RONDA"
            mensaje_resultado = `HUBO EMPATE EN LA RONDA`
            elemento.innerHTML = mensaje_resultado
       
            document.getElementById('usuario').innerText = 'Usuario [ '+ rondas_ganadas_JUGADOR +' ] => '+jugada
            document.getElementById('pc').innerText =  jugada_pc+' <= [ '+rondas_ganadas_COMPU + ' ] PC'
       
        }

        // incrementa las rondas terminadas
        rondas_terminadas++

        // muestra la cantidad de rondas terminadas por consola
        console.log(`rondas terminadas: ${rondas_terminadas}`)

    } else {

        // Si el total de rondas de jugador es mayor
        if (rondas_ganadas_JUGADOR > rondas_ganadas_COMPU) {

            // muestra un mensaje de alerta
            alert(`¡GANO ${nombre}!`)

            // sino    
        } else {

            // muestra alerta que ganó PC
            alert('GANO COMPU')
        }

        // reinicia todas las variables para volver a empezar
        rondas_ganadas_COMPU = 0;
        rondas_ganadas_JUGADOR = 0;
        rondas_terminadas = 0;
        document.getElementById("resultado").innerHTML = 'RESULTADO'
    }

}

// funcion para agrandar un poco el elemento NO GANADOR
function zoomerOut(imagen) {

    const img_to_zoomout = document.getElementById(imagen)
    img_to_zoomout.style.animationName = 'zoomerOut'
    img_to_zoomout.style.animationDuration = '0.6s'

}

// funcion para agrandar bastante el elemento GANADOR
function zoomerOutWin(imagen) {

    const img_to_zoomout = document.getElementById(imagen)
    img_to_zoomout.style.animationName = 'zoomerOutWin'
    img_to_zoomout.style.animationDuration = '0.6s'

}

// obtiene el valor de la imagen de la carta seleccionada
function jugadaAleatoria() {

    let indice = Math.floor(Math.random() * 3)
    jugada_pc = opciones[indice];
    return jugada_pc

}

// función para reestablecer todos los contadores, resultado y nombre
function reiniciar() {

    rondas_ganadas_COMPU = 0;
    rondas_ganadas_JUGADOR = 0;
    rondas_terminadas = 0;

    // bloqueda los elementos para que ingresen el usuario primero
    document.getElementById("piedra").style.visibility = "hidden"
    document.getElementById("papel").style.visibility = "hidden"
    document.getElementById("tijera").style.visibility = "hidden"

    // resetea valaores
    document.getElementById("resultado").innerHTML = 'RESULTADO'
    document.getElementById("nombre").value = ''
    document.getElementById("usuario").innerHTML = 'Usuario'
    document.getElementById("pc").innerHTML = 'PC'

}

// función que determinarGanador aceptando como parámetros a jugada de usuario y jugadas de la computadora 
function determinarGanador(jugada_usuario, jugada_pc) {

    // Si las jugadas son iguales.. 
    if (jugada_pc == jugada_usuario) {
        // retorna EMPATE
        return 'EMPATE'

    // sino este condicional evalúa las reglas, con constantes, para saber si COMPUTADORA gana
    } else if (jugada_pc == opciones[0] && jugada_usuario == opciones[2] ||
        jugada_pc == opciones[2] && jugada_usuario == opciones[1] ||
        jugada_pc == opciones[1] && jugada_usuario == opciones[0]) {

        // retorna ganandor COMPUTADORA
        return 'COMPUTADORA'

    } else {

        // retorna ganador JUGADOR
        return 'JUGADOR'

    }
}