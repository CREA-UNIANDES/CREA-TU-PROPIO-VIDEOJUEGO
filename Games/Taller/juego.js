/**
 * Archivo JavaScript personalizable del taller ¡CREA tu propio videojuego!
 * Autor: CREA Uniandes (crea@uniandes.edu.co)
 * Fecha de creación: 21/01/2025
 * Última modificación: 07/03/2025
 */

VELOCIDAD_PERSONAJE = 0; // Tarea 3: Cambiar la velocidad del personaje (ejemplo 20)

VELOCIDAD_CAIDA = 0; // Tarea 3: Cambiar la velocidad de caída de los objetos (ejemplo 3)

INTERVALO_CREACION = 0; // Tarea 3: Cambiar la frecuencia de aparición de objetos (ejemplo 1000)

// Tarea 5: Crea el número de vidas iniciales y máximas (VIDAS_INICIALES, VIDAS_TOTAL)


// Cada objeto debe tener: tipo, clase, puntos, y probabilidad
// La suma de todas las probabilidades debe ser menor o igual a 1
OBJETOS = [
    { 
        tipo: 'bot',          // Nombre del objeto
        clase: 'objeto-bot',  // Clase CSS para dar estilo
        puntos: 1,            // Puntos que da al recogerlo
        probabilidad: 0.25    // Probabilidad de que aparezca (entre 0 y 1)
    }
    // Tarea 4: Agrega 3 objetos que den puntos positivos

    // Tarea 8: Agrega 1 objeto que quite vidas
    // Ayuda: Los puntos negativos quitan vidas
   
    // Tarea 10: Agrega 1 objeto que devuelva vidas
    // Ayuda: ¿Debería dar puntos? ¿Podemos agregar otro atributo?

    // Tarea 12: Agrega 1 objeto que termine el juego
    // Ayuda: Recuerda lo que hicimos anteriormente (gameOver)
    
];

// Tarea 6: Completa la función para crear los corazones
function crearCorazones() {
    /*
    const contenedor = document.getElementById('hearts-container');
    
    contenedor.innerHTML = '';
    
    // Aquí crearemos tantos corazones como VIDAS INICIALES hayamos definido
    for (let i = 0; i < VIDAS; i++) { // Tarea 6: Reemplaza VIDAS por la variable creada
        const corazon = document.createElement('img');
        corazon.src = ''; // Tarea 6: Agrega la imagen del corazón rojo
        corazon.classList.add('heart');
        contenedor.appendChild(corazon);
    }
    */
}

// Tarea 14: Completa la función para reproducir sonidos
function reproducirSonido(tipo) {
    /*
    switch(tipo) {
        case 'punto':
            document.getElementById('').currentTime = 0; // Tarea 14: Introducir el sonido apropiado
            document.getElementById('').play(); // Tarea 14:
            break;
        case 'perdida':
            document.getElementById('').currentTime = 0; // Tarea 14:
            document.getElementById('').play(); // Tarea 14:
            break;
        case 'gameover':
            document.getElementById('').currentTime = 0; // Tarea 14:
            document.getElementById('').play(); // Tarea 14:
            break;
    }
    */
}

// Función para actualizar vidas visualmente, compatible con la usada en logica.js
function actualizarVidasVisualmente() {
    /*
    console.log("Actualizando vidas visualmente:", vidas);
    
    // Obtener el contenedor de corazones
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) {
        console.error("Error: Contenedor de corazones no encontrado");
        return;
    }
    
    // Obtener todas las imágenes de corazones
    const corazones = heartsContainer.querySelectorAll('.heart');
    
    console.log("Corazones encontrados:", corazones.length);
    
    // Si no hay corazones, crearlos de nuevo
    if (corazones.length === 0) {
        console.log("No hay corazones, creándolos de nuevo");
        crearCorazones();
        return;
    }
    
    // Actualizar cada corazón
    // Tarea 8: Completa la función
    for (let i = 0; i < corazones.length; i++) {
        if (i < vidas) {
            corazones[i].src = ''; // Tarea 8: Imagen para vida llena
        } else {
            corazones[i].src = ''; // Tarea 8: Imagen para vida vacía
        }
        
        // Asegurarse de que el corazón sea visible
        corazones[i].style.display = 'inline-block';
    }
    */
}

// Inicialización temprana para asegurar que las variables están correctas
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando estado del juego en juego.js");
    
    // Asegurarse de que vidas está inicializado correctamente
    vidas = VIDAS_INICIALES;
    console.log("Vidas inicializadas:", vidas);
});

// Esta función inicia el juego cuando la página carga
window.addEventListener('load', function() {
    // Indicar que juego.js está listo
    window.juegoListo = true;
    
    // Sobrescribir la función handleColision para usar nuestros propios sonidos
    window.handleColision = function(objeto) {
        // Registrar estado inicial
        const vidasAntes = vidas;
        console.log("Antes de colisión - Vidas:", vidas, "Objeto:", objeto.dataset);
        console.log("Puntos en objeto:", objeto.dataset.puntos, "Tipo:", typeof objeto.dataset.puntos);
        
        // Verificar si es un objeto de Game Over instantáneo
        if (objeto.dataset.gameOver === "true") {
            reproducirSonido('gameover');
            vidas = 0;
            actualizarVidasVisualmente();
            finalizarJuego();
            console.log("Game Over instantáneo - Vidas:", vidas);
            return;
        }
        
        // Verificar si es un objeto que da vida extra
        if (objeto.dataset.vidaExtra === "true") {
            console.log("Objeto de vida extra recogido");
            reproducirSonido('punto');
            vidas = Math.min(vidas + 1, VIDAS_TOTAL);
            actualizarVidasVisualmente();
            console.log("Después de vida extra - Vidas:", vidas);
            return;
        }
        
        // Sumar puntos para los objetos buenos
        const puntos = parseInt(objeto.dataset.puntos);
        console.log("Puntos convertidos a número:", puntos);
        
        // Si el objeto da puntos negativos, quitar vidas según valor absoluto
        if (puntos < 0) {
            console.log("Objeto con puntos negativos: " + puntos);
            reproducirSonido('perdida');
            
            // Quitar el número de vidas igual al valor absoluto de los puntos
            const vidasPerdidas = Math.abs(puntos);
            console.log("Vidas a perder:", vidasPerdidas);
            
            vidas = Math.max(0, vidas - vidasPerdidas);
            console.log("Nuevas vidas después de perder " + vidasPerdidas + ": " + vidas);
            
            actualizarVidasVisualmente();
            
            // Verificar si se acabaron las vidas
            if (vidas <= 0) {
                console.log("Sin vidas, finalizando juego");
                reproducirSonido('gameover');
                finalizarJuego();
            }
            
            console.log("Después de objeto negativo - Vidas:", vidas);
        } else if (puntos > 0) {
            // Si el objeto da puntos positivos, aumentar score
            console.log("Objeto con puntos positivos: " + puntos);
            reproducirSonido('punto');
            score += puntos;
            if (scoreDisplay) {
                scoreDisplay.textContent = score;
            }
            
            // Actualizar mejor puntuación si es necesario
            if (score > highScore) {
                highScore = score;
                if (highScoreDisplay) {
                    highScoreDisplay.textContent = "Mejor puntuación: " + highScore;
                }
                localStorage.setItem('highScore', highScore);
            }
            
            console.log("Después de objeto bueno - Score:", score);
        }
        
        console.log("Final de handleColision - Vidas:", vidas);
    };
    
    // Función para iniciar el juego, accesible desde logica.js
    window.iniciarJuego = function() {
        console.log("Iniciando juego desde juego.js");
        
        // Asegurarse de que vidas esté correctamente inicializado antes de empezar
        vidas = VIDAS_INICIALES;
        console.log("Vidas al iniciar juego:", vidas);
        
        // Crear los corazones para las vidas
        crearCorazones();
        
        // Configurar los controles del personaje
        if (typeof configurarControles === 'function') {
            configurarControles(VELOCIDAD_PERSONAJE);
        } else {
            console.error("Error: función configurarControles no encontrada");
        }
        
        // Iniciar el juego
        if (typeof iniciarIntervalos === 'function') {
            iniciarIntervalos();
        } else {
            console.error("Error: función iniciarIntervalos no encontrada");
        }
    };
    
    // Si logica.js ya está listo, iniciar el juego
    if (window.logicaLista) {
        console.log("logica.js está listo, iniciando juego");
        window.iniciarJuego();
    } else {
        console.log("Esperando a que logica.js esté listo");
    }
});





