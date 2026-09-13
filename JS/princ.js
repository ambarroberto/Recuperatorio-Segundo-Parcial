// --- Lista de datos curiosos ---
const listaDatosCuriosos = [
  "Laurie Anderson fue una de las primeras artistas en combinar performance, música experimental y tecnología en la escena del arte contemporáneo.",
  "Su tema 'O Superman' se convirtió en un éxito inesperado en 1981 y llegó al segundo puesto en los rankings del Reino Unido.",
  "Diseñó su propio violín eléctrico que le permitía tocar sonidos digitales y activar efectos con sensores.",
  "Ha colaborado con artistas como Lou Reed, con quien estuvo casada hasta su fallecimiento en 2013.",
  "En 2002 fue nombrada la primera artista residente de la NASA, desarrollando obras inspiradas en la exploración espacial.",
  "Su instalación de realidad virtual Chalkroom recibió el premio a mejor experiencia inmersiva en el Festival de Cine de Venecia en 2017.",
  "Utiliza su propia voz alterada digitalmente como herramienta narrativa y estética en muchas de sus obras.",
  "Ha creado instalaciones multimedia que combinan texto, imagen y sonido en entornos sensoriales de gran escala.",
  "Su obra cruza permanentemente los límites entre arte, ciencia, política y poesía.",
  "Sigue siendo una figura activa e influyente en el arte digital y ha experimentado con inteligencia artificial en proyectos recientes."
];

// --- Seleccion del elemento dom ---
const elementoTextoDato = document.getElementById("texto-dato-curioso");
const botonNuevoDato = document.getElementById("btn-nuevo-dato");

// Variable para no repetir el mismo dato de forma consecutiva
let ultimoIndice = -1;

/**
 * Selecciona un dato curioso al azar y actualiza el HTML evitando repeticiones inmediatas.
 * Si la lista tiene un solo elemento, lo muestra directamente (evita loop).
 */
function mostrarDatoCuriosoAleatorio() {
  if (!elementoTextoDato) return;

  if (listaDatosCuriosos.length === 0) {
    elementoTextoDato.textContent = "No hay datos curiosos disponibles por el momento.";
    return;
  }

  let nuevoIndice;

  if (listaDatosCuriosos.length === 1) {
    nuevoIndice = 0;
  } else {
    // Genera un numero hasta que sea distinto al ultimo mostrado
    do {
      nuevoIndice = Math.floor(Math.random() * listaDatosCuriosos.length);
    } while (nuevoIndice === ultimoIndice);
  }

  // Guarda el numero seleccionado
  ultimoIndice = nuevoIndice;

  // Modifica el contenido de texto en la pantalla
  elementoTextoDato.textContent = listaDatosCuriosos[nuevoIndice];
}

// --- Asignacion de eventos ---
// Se valida que el botón exista antes de escuchar el evento,
// por si este script se reutiliza en una página sin este elemento.
if (botonNuevoDato) {
  botonNuevoDato.addEventListener("click", mostrarDatoCuriosoAleatorio);
}