/** Este fichero es lo mismo que '"sass": "sass --watch src/scss:build/css"' del json.package **/

import path from 'path';
import fs from 'fs';
import {glob} from 'glob';          // Dependencia para convertir imágenes a webP

// Modificar la ruta de las dependencias de gulp e importar la función de watch. series; ejecuta 1 tarea y luego otra:
import {src, dest, watch, series} from 'gulp';

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass); // Compilo Sass, utilizando las dependencias de gulpSass

import terser from 'gulp-terser';   // Dependencia para minificar el JS
import sharp from 'sharp';          // Dependencia para imágenes

// Función del JS
export function js(done) {
    src('src/js/app.js')
        .pipe(terser())
        .pipe(dest('build/js'))
    done();
}

/* Compilar SASS: */
export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true})    // Ubico el archivo
        .pipe(sass({
            outputStyle: 'compressed'            // Minificando el CSS
        }).on('error', sass.logError))           // Busca este pipe, ejecutando la función. También está escuchando
        .pipe(dest('build/css', {sourcemaps: true}))       // Lo manda a este destino. sourcemap para que al inspeccionar me diga fichero
    done();
}

// Código nodeJs. Dependencia 'Sharp' para la calidad de las imágenes:
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

// Código de nodeJs, para convertir las imágenes a webP (tb a jpeg):
export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

/* Activar el 'watch' en Gulp */
export function dev() {
    //watch('src/scss/app.scss', css)     // Observa el archivo y cuando hay cambios, ejecuta la función css
    watch('src/scss/**/*.scss', css)     // Para que busque todas las carpetas y archivos
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{png,jpg', imagenes)
}

// Para realizar todas las tareas del fichero:
export default series(crop, js, css, imagenes, dev);