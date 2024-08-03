# Festival de música techHouse
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

Este proyecto es una página web ficticia para un festival de música en Mallorca. La web proporciona información sobre los artistas participantes, horarios, tipos de entradas, y una galería de imágenes del festival.


## Automatización con Gulp
El archivo `gulpfile.js` contiene tareas automatizadas para:

- **Compilar SASS a CSS minificado**:
    - Utiliza `gulp-sass` y `dart-sass` para compilar archivos SASS y generar sourcemaps.

- **Minificar JavaScript y CSS**:
    - Utiliza `gulp-terser` para minificar el archivo JavaScript principal.

- **Convertir imágenes a formatos webP y AVIF**:
    - Utiliza `sharp` para convertir imágenes a los formatos webP y AVIF, mejorando la carga de la página.

- **Observación de cambios**:
    - La tarea `dev` de Gulp observa cambios en archivos SASS, JavaScript e imágenes, ejecutando las tareas correspondientes automáticamente. Facilitando el desarrollo del proyecto en tiempo real. 
