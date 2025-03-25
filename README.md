<h1 align="center">
<img src="https://github.com/CREA-UNIANDES/CREA-TU-PROPIO-VIDEOJUEGO/blob/main/Docs/Banner.png" alt="Banner" style="width:100%;"/>
  ¡CREA tu Propio Videojuego!
</h1>

<p align="center">
  <a href="#descripción">Descripción</a> &#xa0; | &#xa0; 
  <a href="#objetivos-de-aprendizaje">Objetivos</a> &#xa0; | &#xa0;
  <a href="#lo-que-crearás">Lo que crearás</a> &#xa0; | &#xa0;
  <a href="#estructura-del-proyecto">Estructura</a> &#xa0; | &#xa0;
  <a href="#preparación">Preparación</a> &#xa0; | &#xa0;
  <a href="#guía-paso-a-paso">Guía paso a paso</a> &#xa0; | &#xa0;
  <a href="#recursos-adicionales">Recursos</a>
</p>

## Descripción

Este taller te llevará en un emocionante viaje por los fundamentos de la programación web mientras creas tu propio videojuego. Aprenderás sobre HTML, CSS y JavaScript, los tres pilares esenciales para construir páginas y aplicaciones web. A través de actividades prácticas y guiadas, desarrollarás un juego de recolección donde un personaje capturará objetos que caen desde la parte superior de la pantalla.

El taller forma parte de las iniciativas educativas de la Universidad de los Andes a través del laboratorio CREA, diseñado para fomentar la creatividad y el pensamiento STEAM en jóvenes.

## Objetivos de Aprendizaje

- Comprender la estructura básica de una página web (HTML)
- Crear estilos visuales para tus proyectos (CSS)
- Implementar interactividad y lógica de juego (JavaScript)
- Desarrollar habilidades de solución de problemas
- Estimular la creatividad a través del diseño de juegos
- Entender los conceptos fundamentales de la programación

## Lo que crearás

Durante este taller, desarrollarás un juego tipo "collector" donde un personaje se mueve horizontalmente para recoger objetos que caen desde la parte superior de la pantalla. Podrás personalizar el juego con tus propias imágenes, sonidos y mecánicas.

Puedes crear diferentes versiones temáticas como:

### CREA Collector 🧩
|Una versión con la mascota de Uniandes recogiendo elementos que podemos encontrar en el laboratorio CREA.|
|:-:|
| <img src="https://github.com/CREA-UNIANDES/CREA-TU-PROPIO-VIDEOJUEGO/blob/main/Docs/EjemploCREA.gif" width="560"> |

### Mario Collector 🍄
|Recolecta monedas, hongos y estrellas mientras evitas obstáculos del mundo de Mario.|
|:-:|
| <img src="https://github.com/CREA-UNIANDES/CREA-TU-PROPIO-VIDEOJUEGO/blob/main/Docs/EjemploMario.gif" width="560"> |

### Minecraft Collector 💎
|Recoge minerales, bloques y herramientas en un entorno inspirado en Minecraft.|
|:-:|
| <img src="https://github.com/CREA-UNIANDES/CREA-TU-PROPIO-VIDEOJUEGO/blob/main/Docs/EjemploMinecraft.gif" width="560"> |

### Tu propia creación 😲
|¡Personaliza completamente el juego con tus propias ideas y diseños!|
|:-:|
| <img src="https://github.com/CREA-UNIANDES/CREA-TU-PROPIO-VIDEOJUEGO/blob/main/Docs/EjemploPersonalizado.gif" width="560"> |


## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
CREA-TU-PROPIO-VIDEOJUEGO/
│
├── Assets/                    # Imágenes y audios para usar en el taller
│
├── Games/
│   ├── Otros juegos/         # Ejemplos de juegos terminados para inspiración
│   ├── Taller/               # Esqueleto del taller con tareas a completar
│   │   ├── juego.html        # Estructura del juego (HTML)
│   │   ├── juego.css         # Estilos del juego (CSS)
│   │   ├── juego.js          # Lógica personalizable del juego (JavaScript)
│   │   └── logica.js         # Lógica base del juego (no modificar)
│   │
│   └── Solución/             # Archivos con la solución completa
│
└── Docs/                     # Documentos y recursos adicionales
    └── CREA tu propio videojuego.pdf      # Presentación con instrucciones del taller
```

### Archivos Principales

Los archivos con los que trabajarás principalmente son:

- **juego.html**: Define la estructura de la página web y los elementos del juego.
- **juego.css**: Controla la apariencia visual del juego (colores, tamaños, posiciones).
- **juego.js**: Contiene la lógica personalizable del juego que modificarás durante el taller.
- **logica.js**: Implementa la lógica base del juego (no se modifica durante el taller).

#### Funcionalidad de cada archivo:

**juego.html**
- Define la estructura del documento
- Incorpora los elementos visuales del juego (área de juego, personaje, vidas)
- Conecta con los archivos CSS y JavaScript
- Integra los sonidos del juego

**juego.css**
- Define el estilo visual de todos los elementos
- Configura fondos, colores y dimensiones
- Establece la apariencia de los objetos que caen
- Personaliza los indicadores de vida y puntuación

**juego.js**
- Contiene variables personalizables (velocidad, vidas, frecuencia)
- Define los tipos de objetos que aparecen en el juego
- Implementa la lógica para ganar/perder vidas
- Gestiona los efectos de sonido

**logica.js**
- Controla el motor principal del juego
- Gestiona los eventos de teclado para mover el personaje
- Implementa la detección de colisiones
- Administra el sistema de puntuación

## Preparación

Para comenzar este taller, necesitarás:

1. Un navegador web moderno (Chrome, Firefox, Edge)
2. Un editor de código como Visual Studio Code (recomendado)
3. Descargar el archivo `CREA-TU-PROPIO-VIDEOJUEGO.zip` en el siguiente [enlace](https://drive.google.com/drive/folders/1dilZXLVhG1pahZuqgVnTltLlmt1KhF7B?usp=sharing)

Sigue estos pasos para configurar tu entorno:

1. Descomprime el archivo ZIP en una ubicación de fácil acceso
2. Abre Visual Studio Code
3. Selecciona "Abrir carpeta" y navega hasta la carpeta descomprimida
4. Navega hasta la carpeta `Games/Taller`

## Guía Paso a Paso

El taller está estructurado en tareas progresivas que te guiarán a través del proceso de creación del juego:

### Parte 1: Configuración inicial
- **Tarea 1**: Personalizar el título y encabezado del juego
- **Tarea 2**: Cambiar las imágenes de fondo y del personaje
- **Tarea 3**: Conectar los archivos JavaScript y configurar velocidades

### Parte 2: Objetos y mecánicas
- **Tarea 4**: Crear objetos que den puntos positivos
- **Tarea 5**: Configurar el sistema de vidas
- **Tarea 6**: Implementar los corazones para visualizar vidas

### Parte 3: Interacción y eventos
- **Tarea 8**: Añadir objetos que quiten vidas
- **Tarea 10**: Actualizar la visualización de vidas
- **Tarea 11**: Crear objetos que restauren vidas
- **Tarea 13**: Implementar objetos que provoquen Game Over

### Parte 4: Sonidos y toques finales
- **Tarea 15**: Añadir efectos de sonido
- Personalización final y pruebas


## Créditos

Este taller ha sido desarrollado por el equipo de CREA de la Universidad de los Andes, bajo la supervisión de:

- <a href="https://www.linkedin.com/in/julián-27-mora/" target="_blank">Julián Camilo Mora Valbuena</a>

## Enlaces

- <a href="https://forms.office.com/pages/responsepage.aspx?id=fAS9-kj_KkmLu4-YufucypGRd9hBUhFEhkomsdF4eXZUNU5WR1lZTDVINjM0RzE3Nkk2UlBHQ1BXTi4u&origin=QRCode&qrcodeorigin=presentation&route=shorturl" target="_blank">Encuesta</a>
- <a href="https://drive.google.com/drive/mobile/folders/1dilZXLVhG1pahZuqgVnTltLlmt1KhF7B?usp=sharing" target="_blank">Drive</a>
---

<p align="center">
  <img src="https://github.com/CREA-UNIANDES/CREA-TU-PROPIO-VIDEOJUEGO/blob/main/Docs/CREA.png" alt="Logo Universidad de los Andes" height="300"/>
</p>
