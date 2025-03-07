/**
 * Archivo JavaScript con las funciones más complejas del taller ¡CREA tu propio videojuego!
 * Los estudiantes no necesitan modificar este archivo.
 * Autor: CREA Uniandes (crea@uniandes.edu.co)
 * Fecha de creación: 21/01/2025
 * Última modificación: 07/03/2025
 */

// Variables globales del juego
let objetosEnJuego = []; // Lista de objetos activos en el juego
let gameArea = null;
let personaje = null;
let scoreDisplay = null;
let highScoreDisplay = null;
let heartsContainer = null;
let gameOverMessage = null;

// Variables de estado del juego
let score = 0;          // Puntuación actual
let highScore = 0;      // Mejor puntuación
let gameOver = false;   // Estado de fin de juego
let vidas = 3;          // Número de vidas
let intervaloCaida;     // Intervalo para mover objetos
let intervaloCreacion;  // Intervalo para crear objetos

// Sonidos
let pointSound;
let looseSound;
let gameOverSound;

// Constantes de juego
const ANCHO_JUEGO = 800;
const ALTO_JUEGO = 600;
const ANCHO_PERSONAJE = 110;
const ALTO_PERSONAJE = 150;

// Al principio de logica.js, después de declarar las variables globales:

// Variables globales que serán configuradas por juego.js con valores predeterminados
let VELOCIDAD_PERSONAJE = 10;  // Valor predeterminado, será sobrescrito por juego.js
let VELOCIDAD_CAIDA = 3;       // Valor predeterminado
let INTERVALO_CREACION = 1500; // Valor predeterminado
let VIDAS_INICIALES = 3;       // Valor predeterminado
let VIDAS_TOTAL = 5;             // Valor predeterminado
let OBJETOS = [{              // Objeto predeterminado, la lista será reemplazada desde juego.js
    tipo: 'default',
    clase: 'objeto-bueno',
    puntos: 1,
    probabilidad: 1
}];

// Al inicio del archivo
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente cargado");
    // Inicializar solo después de que el DOM esté completamente cargado
    inicializarJuegoLogica();
});

function inicializarJuegoLogica() {
    console.log("Inicializando juego desde logica.js");
    
    // Tratar de obtener referencias a elementos
    gameArea = document.getElementById('game-area');
    personaje = document.getElementById('character');
    scoreDisplay = document.getElementById('score');
    highScoreDisplay = document.getElementById('high-score');
    heartsContainer = document.getElementById('hearts-container');
    gameOverMessage = document.getElementById('game-over-message');
    
    // Verificar si los elementos existen
    if (!gameArea) {
        console.error("Error crítico: No se encontró el elemento 'game-area'");
        return;
    }
    
    if (!personaje) {
        console.error("Error crítico: No se encontró el elemento 'character'");
        return;
    }
    
    // Cargar el mejor puntaje desde localStorage
    highScore = localStorage.getItem('highScore') || 0;
    if (highScoreDisplay) {
        highScoreDisplay.textContent = "Mejor puntuación: " + highScore;
    }
    
    // Inicializar sonidos
    pointSound = document.getElementById('pointSound');
    looseSound = document.getElementById('looseSound');
    gameOverSound = document.getElementById('gameOverSound');
    
    // Indicar que la lógica está lista
    window.logicaLista = true;
    
    // Si juego.js ya está listo, iniciar el juego
    if (window.juegoListo && window.iniciarJuego) {
        console.log("Llamando a iniciarJuego desde logica.js");
        window.iniciarJuego();
    }
}

/**
 * Inicializa las referencias a elementos del DOM
 */
function inicializarReferencias() {
    // Utilizar querySelector para asegurarnos de que obtenemos los elementos correctos
    gameArea = document.getElementById('game-area');
    personaje = document.getElementById('character');
    scoreDisplay = document.getElementById('score');
    highScoreDisplay = document.getElementById('high-score');
    heartsContainer = document.getElementById('hearts-container');
    gameOverMessage = document.getElementById('game-over-message');
    
    // Inicializar sonidos
    pointSound = document.getElementById('pointSound');
    looseSound = document.getElementById('looseSound');
    gameOverSound = document.getElementById('gameOverSound');
    
    // Verificar que los elementos esenciales existen
    if (!gameArea) {
        console.error("Error: No se encontró el elemento 'game-area'");
        return false;
    }
    if (!personaje) {
        console.error("Error: No se encontró el elemento 'character'");
        return false;
    }
    if (!scoreDisplay) {
        console.error("Error: No se encontró el elemento 'score'");
        return false;
    }
    if (!highScoreDisplay) {
        console.error("Error: No se encontró el elemento 'high-score'");
        return false;
    }
    
    return true;
}

/**
 * Configura los controles del personaje
 * @param {number} velocidad - La velocidad de movimiento del personaje
 */
function configurarControles(velocidad) {
    document.addEventListener('keydown', function(event) {
        // Verificar que el personaje existe
        if (!personaje) {
            console.error("Error: Personaje no encontrado");
            return;
        }
        
        // Si el juego terminó, reiniciar con cualquier flecha
        if (gameOver && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            reiniciarJuego();
            return;
        }
        
        // Obtener posición actual del personaje de manera más robusta
        let posX;
        // Si el personaje ya tiene estilo left definido, usarlo
        if (personaje.style.left) {
            posX = parseInt(personaje.style.left);
        } 
        // Si no, obtener el valor computado
        else {
            const computedStyle = window.getComputedStyle(personaje);
            posX = parseInt(computedStyle.left);
        }
        
        // Si no se pudo obtener un valor válido, usar el valor predeterminado
        if (isNaN(posX)) {
            posX = 350;
        }
        
        // Ancho del área de juego y del personaje
        const anchoJuego = gameArea.offsetWidth;
        const anchoPersonaje = personaje.offsetWidth;
        
        // Mover a la izquierda o derecha según la tecla presionada
        if (event.key === 'ArrowLeft') {
            posX = Math.max(0, posX - velocidad);
        } else if (event.key === 'ArrowRight') {
            posX = Math.min(anchoJuego - anchoPersonaje, posX + velocidad);
        }
        
        // Establecer la nueva posición
        personaje.style.left = posX + 'px';
    });
}

/**
 * Crea un nuevo objeto que cae
 * @param {Array} tiposObjetos - Lista de definiciones de objetos
 * @param {number} velocidadCaida - Qué tan rápido caen los objetos
 */
function crearObjeto(tiposObjetos, velocidadCaida) {
    // Si el juego ha terminado o gameArea no existe, no crear más objetos
    if (gameOver || !gameArea) {
        console.error("No se puede crear objeto: juego terminado o área de juego no disponible");
        return;
    }
    
    // Seleccionar un objeto aleatorio según su probabilidad
    let objetoAleatorio = seleccionarObjetoAleatorio(tiposObjetos);
    
    // Crear el elemento HTML del objeto
    let nuevoObjeto = document.createElement('div');
    nuevoObjeto.className = 'objeto-cayendo ' + objetoAleatorio.clase;
    
    // Posicionar el objeto en una ubicación aleatoria en la parte superior
    let posicionX = Math.random() * (ANCHO_JUEGO - 50); // 50 es el ancho promedio de los objetos
    nuevoObjeto.style.left = posicionX + 'px';
    nuevoObjeto.style.top = '0px';
    
    // Guardar información importante en el objeto
    nuevoObjeto.dataset.tipo = objetoAleatorio.tipo;
    nuevoObjeto.dataset.puntos = objetoAleatorio.puntos;
    
    // Añadir propiedades especiales como vidaExtra y gameOver
    if (objetoAleatorio.vidaExtra) {
        nuevoObjeto.dataset.vidaExtra = "true";
        console.log("Creando objeto con vidaExtra=true:", objetoAleatorio.tipo);
    }
    if (objetoAleatorio.gameOver) {
        nuevoObjeto.dataset.gameOver = "true";
    }
    
    // Añadir el objeto al área de juego - Verificar que gameArea existe
    if (gameArea) {
        gameArea.appendChild(nuevoObjeto);
        // Añadir el objeto a la lista de objetos en juego
        objetosEnJuego.push(nuevoObjeto);
        // Iniciar animación de caída
        animarCaida(nuevoObjeto, velocidadCaida);
    } else {
        console.error("No se puede añadir objeto: área de juego no disponible");
    }

    console.log("Objeto creado:", {
        tipo: objetoAleatorio.tipo,
        clase: objetoAleatorio.clase,
        puntos: objetoAleatorio.puntos,
        vidaExtra: objetoAleatorio.vidaExtra,
        gameOver: objetoAleatorio.gameOver,
        dataset: nuevoObjeto.dataset
    });
}

/**
 * Selecciona un objeto aleatorio según su probabilidad
 * @param {Array} tiposObjetos - Lista de definiciones de objetos
 * @returns {Object} El objeto seleccionado
 */
function seleccionarObjetoAleatorio(tiposObjetos) {
    // Calcular la suma total de probabilidades
    let sumaProbabilidad = 0;
    for (let i = 0; i < tiposObjetos.length; i++) {
        sumaProbabilidad += tiposObjetos[i].probabilidad;
    }
    
    // Generar un número aleatorio entre 0 y la suma total
    let aleatorio = Math.random() * sumaProbabilidad;
    let acumulado = 0;
    
    // Encontrar el objeto correspondiente
    for (let i = 0; i < tiposObjetos.length; i++) {
        acumulado += tiposObjetos[i].probabilidad;
        if (aleatorio <= acumulado) {
            return tiposObjetos[i];
        }
    }
    
    // Por defecto, devolver el primer objeto
    return tiposObjetos[0];
}

/**
 * Anima la caída de un objeto
 * @param {HTMLElement} objeto - El objeto DOM que cae
 * @param {number} velocidad - Velocidad de caída
 */
function animarCaida(objeto, velocidad) {
    let posY = 0;
    let intervaloCaidaObjeto = setInterval(function() {
        // Si el juego terminó o el objeto ya no está en el DOM, detener la animación
        if (gameOver || !objeto.parentNode) {
            clearInterval(intervaloCaidaObjeto);
            return;
        }
        
        // Mover el objeto hacia abajo
        posY += velocidad;
        objeto.style.top = posY + 'px';
        
        // Verificar colisión con el personaje
        if (detectarColision(objeto, personaje)) {
            // Usar la función handleColision disponible
            // Esto nos permitirá usar la versión personalizada desde juego.js si está disponible
            window.handleColision(objeto);
            
            if (gameArea && objeto.parentNode) {
                gameArea.removeChild(objeto);
            }
            clearInterval(intervaloCaidaObjeto);
            
            // Eliminar objeto de la lista
            const index = objetosEnJuego.indexOf(objeto);
            if (index > -1) {
                objetosEnJuego.splice(index, 1);
            }
            return;
        }
        
        // Si el objeto llegó al fondo, eliminarlo
        if (posY > ALTO_JUEGO) {
            if (gameArea && objeto.parentNode) {
                gameArea.removeChild(objeto);
            }
            clearInterval(intervaloCaidaObjeto);
            
            // Eliminar objeto de la lista
            const index = objetosEnJuego.indexOf(objeto);
            if (index > -1) {
                objetosEnJuego.splice(index, 1);
            }
        }
    }, 30); // 30ms es aproximadamente 33fps
}

/**
 * Detecta colisión entre dos elementos
 * @param {HTMLElement} elem1 - Primer elemento
 * @param {HTMLElement} elem2 - Segundo elemento
 * @returns {boolean} true si hay colisión, false si no
 */
function detectarColision(elem1, elem2) {
    // Verificar que ambos elementos existen
    if (!elem1 || !elem2) {
        console.error("Error: No se puede detectar colisión, elementos no definidos");
        return false;
    }
    
    try {
        const rect1 = elem1.getBoundingClientRect();
        const rect2 = elem2.getBoundingClientRect();
        
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    } catch (e) {
        console.error("Error al detectar colisión:", e);
        return false;
    }
}

/**
 * Versión predeterminada del manejador de colisiones.
 * Esta función se exporta al ámbito global para que pueda ser sobrescrita por juego.js
 * @param {HTMLElement} objeto - El objeto con el que colisionó
 */
window.handleColision = function(objeto) {
    // Verificar si es un objeto de Game Over instantáneo
    if (objeto.dataset.gameOver === "true") {
        if (gameOverSound) gameOverSound.play();
        vidas = 0;
        actualizarVidasVisualmente();
        finalizarJuego();
        return;
    }
    
    // Verificar si es un objeto que da vida extra
    if (objeto.dataset.vidaExtra === "true") {
        if (pointSound) pointSound.play();
        vidas = Math.min(vidas + 1, VIDAS_TOTAL);
        actualizarVidasVisualmente();
        return;
    }
    
    // Sumar puntos para los objetos buenos
    const puntos = parseInt(objeto.dataset.puntos);
    
    // Si el objeto da puntos negativos, quitar vida
    if (puntos < 0) {
        if (looseSound) looseSound.play();
        vidas--;
        actualizarVidasVisualmente();
        
        // Verificar si se acabaron las vidas
        if (vidas <= 0) {
            finalizarJuego();
        }
    } else if (puntos > 0) {
        // Si el objeto da puntos positivos, aumentar score
        if (pointSound) pointSound.play();
        score += puntos;
        scoreDisplay.textContent = score;
        
        // Actualizar mejor puntuación si es necesario
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = "Mejor puntuación: " + highScore;
            localStorage.setItem('highScore', highScore);
        }
    }
};

/**
 * Actualiza la visualización de vidas visualmente
 */
function actualizarVidasVisualmente() {
    console.log("Actualizando vidas visualmente:", vidas);
    
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
        if (typeof crearCorazones === 'function') {
            crearCorazones();
            return;
        }
    }
    
    // Actualizar cada corazón
    for (let i = 0; i < corazones.length; i++) {
        if (i < vidas) {
            corazones[i].src = '../../Assets/Taller/Uniandes_Heart.png';
        } else {
            corazones[i].src = '../../Assets/Taller/Uniandes_NoHeart.png';
        }
        
        // Asegurarse de que el corazón sea visible
        corazones[i].style.display = 'inline-block';
    }
}

/**
 * Función auxiliar para mantener compatibilidad con el código antiguo
 */
function actualizarVidas() {
    actualizarVidasVisualmente();
}

/**
 * Finaliza el juego
 */
function finalizarJuego() {
    gameOver = true;
    gameOverMessage.classList.remove('hidden');
    
    // Detener los intervalos de creación y caída
    clearInterval(intervaloCaida);
    clearInterval(intervaloCreacion);
    
    // Actualizar texto de puntuación final si no está en el HTML
    const puntuacionFinal = gameOverMessage.querySelector('p');
    if (puntuacionFinal) {
        puntuacionFinal.textContent = `Puntuación final: ${score}. Pulsa cualquier flecha para volver a jugar`;
    }
    
    // Guardar mejor puntaje
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = "Mejor puntuación: " + highScore;
    }
}

/**
 * Reinicia el juego
 */
function reiniciarJuego() {
    console.log("Reiniciando juego");
    
    // Limpiar objetos existentes
    while (objetosEnJuego.length > 0) {
        if (objetosEnJuego[0].parentNode) {
            gameArea.removeChild(objetosEnJuego[0]);
        }
        objetosEnJuego.shift();
    }
    
    // Reiniciar variables
    score = 0;
    gameOver = false;
    if (scoreDisplay) {
        scoreDisplay.textContent = score;
    }
    if (gameOverMessage) {
        gameOverMessage.classList.add('hidden');
    }
    
    // Reiniciar vidas
    vidas = VIDAS_INICIALES;
    
    // Actualizar los corazones
    actualizarVidasVisualmente();
    
    // Reiniciar posición del personaje
    if (personaje) {
        personaje.style.left = "350px";
    }
    
    // Iniciar el juego de nuevo
    iniciarIntervalos();
}

/**
 * Inicia los intervalos para la creación y movimiento de objetos
 */
function iniciarIntervalos() {
    console.log("Iniciando intervalos con:", {
        OBJETOS: OBJETOS,
        VELOCIDAD_CAIDA: VELOCIDAD_CAIDA,
        INTERVALO_CREACION: INTERVALO_CREACION
    });
    
    // Limpiar intervalos existentes
    if (intervaloCaida) clearInterval(intervaloCaida);
    if (intervaloCreacion) clearInterval(intervaloCreacion);
    
    // Verificar que gameArea existe
    if (!gameArea) {
        console.error("No se pueden iniciar intervalos: área de juego no disponible");
        return;
    }
    
    // Configurar nuevo intervalo para crear objetos
    intervaloCreacion = setInterval(function() {
        if (OBJETOS && OBJETOS.length > 0) {
            try {
                crearObjeto(OBJETOS, VELOCIDAD_CAIDA);
            } catch (e) {
                console.error("Error al crear objeto:", e);
                clearInterval(intervaloCreacion);
            }
        } else {
            console.error("No hay objetos definidos para crear");
            clearInterval(intervaloCreacion);
        }
    }, INTERVALO_CREACION);
}

// Variable para indicar que la lógica está lista
window.logicaLista = true;

// Inicializar el juego cuando la ventana cargue
window.addEventListener('load', function() {
    // Cargar el mejor puntaje desde localStorage
    highScore = localStorage.getItem('highScore') || 0;
    if (highScoreDisplay) {
        highScoreDisplay.textContent = "Mejor puntuación: " + highScore;
    }
    
    // Inicializar referencias a elementos DOM
    if (!inicializarReferencias()) {
        console.error("No se pudieron inicializar las referencias necesarias.");
        return;
    }
    
    // Las funciones iniciarJuego() y configurarControles() se llamarán desde juego.js
    // después de que se definan las variables de configuración
    
    // Si juego.js ya ha iniciado, ejecutar la función de inicio
    if (window.juegoListo) {
        // Esta función debe ser definida en juego.js
        window.iniciarJuego && window.iniciarJuego();
    }
});