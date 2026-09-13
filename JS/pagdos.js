// --- Array de obras ---
const listaObras = [
  {
    titulo: "O Superman",
    anio: 1981,
    imagen: "../Img/OSuperman-5.jpg"
  },
  {
    titulo: "Big Science",
    anio: 1982,
    imagen: "../Img/big-4.jpg"
  },
  {
    titulo: "Four Talks",
    anio: 2021,
    imagen: "../Img/anderson-1.jpg"
  },
  {
    titulo: "Songs and Stories from Moby Dick",
    anio: 1977,
    imagen: "../Img/anderson-3.jpg"
  },
  {
    titulo: "Chalkroom",
    anio: 2017,
    imagen: "../Img/anderson-2.jpg"
  }
];

// --- Seleccion de elementos ---
const contenedorGaleria = document.getElementById("galeria-obras");
const botonCambiarDiseno = document.getElementById("btn-cambiar-diseno");

// --- Busca en el HTML los elementos, los guarda como variables y transforma en seguro ---
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/**
 * Dibuja las tarjetas de la galeria dentro del HTML.
 * Arma el HTML completo en un array y lo inserta una sola vez.
 */
function renderizarGaleria() {
    // Si la pagina actual no tiene la galeria, corta la funcion para no dar error.
  if (!contenedorGaleria) return;

  // Si la lista de obras esta vacia, muestra un mensaje explicativo y frena.
  if (listaObras.length === 0) {
    contenedorGaleria.innerHTML = "<p>No hay obras para mostrar por el momento.</p>";
    return;
  }

  // Convierte cada obra de la lista en una tarjeta de codigo HTML con su imagen y datos
  const tarjetasHTML = listaObras.map(function (obra) {
    return `
      <div class="tarjeta-obra">
        <img src="${escaparHTML(obra.imagen)}" alt="${escaparHTML(obra.titulo)}" loading="lazy">
        <h3 class="titulo-google-font">${escaparHTML(obra.titulo)}</h3>
        <p>Año: ${escaparHTML(String(obra.anio))}</p>
      </div>
    `;
  });

  // Une todas las tarjetas creadas y las inserta en la pantalla
  contenedorGaleria.innerHTML = tarjetasHTML.join("");
}

/**
 * Alterna el CSS para cambiar el tamaño/diseño de las fotos 
 * y sincroniza el estado accesible del boton (aria-pressed).
 */
function alternarDisenoGaleria() {
  if (!contenedorGaleria || !botonCambiarDiseno) return;

  const estaAmpliada = contenedorGaleria.classList.toggle("vista-ampliada");
  botonCambiarDiseno.setAttribute("aria-pressed", String(estaAmpliada));
}

// --- Activa boton para cambiar diseño ---
if (botonCambiarDiseno) {
  botonCambiarDiseno.addEventListener("click", alternarDisenoGaleria);
}

renderizarGaleria();