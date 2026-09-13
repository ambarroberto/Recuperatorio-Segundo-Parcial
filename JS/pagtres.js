let totalObrasACargar = 0;
let msPorMB = 0;
let costoMensualPorMB = 0;

let obrasRegistradas = []; // Array que guarda los objetos de cada obra
let contadorObras = 0;

// Configuracion inicial
const formConfig = document.getElementById("form-configuracion");
const fieldsetConfig = document.getElementById("fieldset-configuracion");
const inputCantObras = document.getElementById("cant-obras");
const inputTiempoTransf = document.getElementById("tiempo-transf");
const inputCostoMB = document.getElementById("costo-mb");
const btnIniciar = document.getElementById("btn-iniciar");
const errorConfiguracion = document.getElementById("error-configuracion");

// Carga de obras
const formObra = document.getElementById("form-obra");
const fieldsetObra = document.getElementById("fieldset-obra");
const spanNumObraActual = document.getElementById("num-obra-actual");
const spanNumObraTotal = document.getElementById("num-obra-total");
const inputNombreObra = document.getElementById("nombre-obra");
const inputDuracionObra = document.getElementById("duracion-obra");
const inputPesoObra = document.getElementById("peso-obra");
const btnGuardarObra = document.getElementById("btn-guardar-obra");
const errorObra = document.getElementById("error-obra");
const exitoCarga = document.getElementById("exito-carga");

// Boton para calcular y reiniciar
const btnCalcular = document.getElementById("btn-calcular");
const btnReiniciar = document.getElementById("btn-reiniciar");

// Espacios para mostrar resultados en la pantalla
const resDuracionTotal = document.getElementById("res-duracion-total");
const resDuracionPromedio = document.getElementById("res-duracion-promedio");
const resMayorObra = document.getElementById("res-mayor-obra");
const resTiempoDescarga = document.getElementById("res-tiempo-descarga");
const resPresupuestoAnual = document.getElementById("res-presupuesto-anual");

// Muestra un mensaje (de error o de exito) dentro del elemento indicado.
function mostrarMensaje(elemento, texto) {
  elemento.textContent = texto;
  elemento.hidden = false;
}

// Oculta y limpia un mensaje de error o exito.
function ocultarMensaje(elemento) {
  elemento.textContent = "";
  elemento.hidden = true;
}

// 1- Guardar configuracion inicial
formConfig.addEventListener("submit", function (e) {
  e.preventDefault();
  ocultarMensaje(errorConfiguracion);

  const cant = parseInt(inputCantObras.value, 10);
  const transf = parseFloat(inputTiempoTransf.value);
  const costo = parseFloat(inputCostoMB.value);

  // Revisa que los tres campos tengan numeros validos y mayores a cero
  if (
    isNaN(cant) || cant <= 0 ||
    isNaN(transf) || transf <= 0 ||
    isNaN(costo) || costo <= 0
  ) {
    mostrarMensaje(errorConfiguracion, "Por favor ingrese valores numericos mayores a cero en los tres campos.");
    return;
  }

  // Guardar en el estado global
  totalObrasACargar = cant;
  msPorMB = transf;
  costoMensualPorMB = costo;

  // Deshabilitar Paso 1 completo para que no cambie mientras se cargan las obras
  fieldsetConfig.disabled = true;

  // Habilitar Paso 2 para comenzar la carga
  fieldsetObra.disabled = false;
  spanNumObraTotal.textContent = totalObrasACargar;

  // Mueve el cursor al primer campo del siguiente paso, para que el flujo
  // sea comodo tambien con teclado o lector de pantalla.
  inputNombreObra.focus();
});

// --- 2: Guardar cada obra secuencialmente ---
formObra.addEventListener("submit", function (e) {
  e.preventDefault();
  ocultarMensaje(errorObra);
  ocultarMensaje(exitoCarga);

  const nombre = inputNombreObra.value.trim();
  const duracion = parseFloat(inputDuracionObra.value);
  const peso = parseFloat(inputPesoObra.value);

  // Valida que el nombre no este vacio y los numeros sean mayores a cero
  if (nombre === "" || isNaN(duracion) || duracion <= 0 || isNaN(peso) || peso <= 0) {
    mostrarMensaje(errorObra, "Todos los datos de la obra deben ser válidos y mayores a cero.");
    return;
  }

  // Agregar la obra registrada al array
  obrasRegistradas.push({
    nombre: nombre,
    duracion: duracion,
    peso: peso
  });

  contadorObras++;
  formObra.reset();

  // Controlar si ya esta cargada o no
  if (contadorObras < totalObrasACargar) {
    spanNumObraActual.textContent = contadorObras + 1;
    inputNombreObra.focus();
  } else {
    // Al alcanzar el total, se bloquea la carga de mas obras y habilita boton de calcular
    fieldsetObra.disabled = true;
    btnCalcular.disabled = false;
    mostrarMensaje(exitoCarga, "Carga de obras finalizada. Ya puede calcular los resultados.");
    btnCalcular.focus();
  }
});

// 3- Calcula y muestra resultados
btnCalcular.addEventListener("click", function () {
  if (obrasRegistradas.length === 0) {
    return; // Guarda de seguridad: no deberia poder llegar aca sin obras cargadas
  }

  let duracionTotal = 0;
  let pesoTotal = 0;
  let obraMayor = obrasRegistradas[0];

  // Recorrido para acumular duraciones, pesos y encontrar la obra mas larga
  for (let i = 0; i < obrasRegistradas.length; i++) {
    const obraActual = obrasRegistradas[i];
    duracionTotal += obraActual.duracion;
    pesoTotal += obraActual.peso;

    if (obraActual.duracion > obraMayor.duracion) {
      obraMayor = obraActual;
    }
  }

  // Calculos requeridos
  const duracionPromedio = duracionTotal / obrasRegistradas.length;
  const tiempoDescargaMayorObra = obraMayor.peso * msPorMB;
  const presupuestoAnual = pesoTotal * costoMensualPorMB * 12;

  // Redondea los resultados en pantalla con formato decimal
  resDuracionTotal.textContent = duracionTotal.toFixed(2);
  resDuracionPromedio.textContent = duracionPromedio.toFixed(2);
  resMayorObra.textContent = `${obraMayor.nombre} (${obraMayor.duracion} min)`;
  resTiempoDescarga.textContent = tiempoDescargaMayorObra.toFixed(2);
  resPresupuestoAnual.textContent = presupuestoAnual.toFixed(2);

  // Deshabilitar boton de calculo y habilita boton de reinicio
  btnCalcular.disabled = true;
  btnReiniciar.disabled = false;
  btnReiniciar.focus();
});

// 4- Reiniciar sistema
btnReiniciar.addEventListener("click", function () {
  // Resetear estado global
  totalObrasACargar = 0;
  msPorMB = 0;
  costoMensualPorMB = 0;
  obrasRegistradas = [];
  contadorObras = 0;

  // Resetear formularios
  formConfig.reset();
  formObra.reset();

  // Limpiar mensajes
  ocultarMensaje(errorConfiguracion);
  ocultarMensaje(errorObra);
  ocultarMensaje(exitoCarga);

  // Habilitar Paso 1 y deshabilitar los demas
  fieldsetConfig.disabled = false;
  fieldsetObra.disabled = true;

  spanNumObraActual.textContent = "1";
  spanNumObraTotal.textContent = "-";

  btnCalcular.disabled = true;
  btnReiniciar.disabled = true;

  // Limpiar textos de resultado
  resDuracionTotal.textContent = "-";
  resDuracionPromedio.textContent = "-";
  resMayorObra.textContent = "-";
  resTiempoDescarga.textContent = "-";
  resPresupuestoAnual.textContent = "-";

  inputCantObras.focus();
});