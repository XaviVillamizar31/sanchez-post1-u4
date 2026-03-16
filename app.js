// Estado central de la aplicación 
let tarjetas = [];
let idContador = 1;
// Genera un ID único para cada tarjeta 
const generarId = () => idContador++;
// Obtiene el valor de un campo de texto y lo limpia 
const leerCampo = (selector) => {
    const campo = document.querySelector(selector);
    const valor = campo.value.trim();
    campo.value = "";
    return valor;
};
// Referencia al contenedor de la galería 
const galeria = document.querySelector("#galeria");

function crearElementoTarjeta({ id, titulo, descripcion, categoria }) {
    // Crear el contenedor de la tarjeta 
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta", `categoria-${categoria}`);
    tarjeta.dataset.id = id;
    // Construir el contenido HTML de la tarjeta 
    tarjeta.innerHTML = ` 
<span class="badge">${categoria}</span> 
<h3>${titulo}</h3> 
<p>${descripcion}</p> 
<button class="btn-eliminar" data-id="${id}">Eliminar</button> 
`;
    return tarjeta;
}

function agregarTarjeta() {
    const titulo = leerCampo("#input-titulo");
    const descripcion = leerCampo("#input-descripcion");
    const categoria = document.querySelector("#select-categoria").value;
    // Validación básica: los campos son obligatorios 
    if (!titulo || !descripcion) {
        alert("El título y la descripción son obligatorios.");
        return;
    }
    // Crear objeto tarjeta y agregarlo al estado 
    const nuevaTarjeta = {
        id: generarId(), titulo, descripcion, categoria
    };
    tarjetas.push(nuevaTarjeta);
    // Crear el elemento DOM y añadirlo a la galería 
    const elemento = crearElementoTarjeta(nuevaTarjeta);
    galeria.appendChild(elemento);
}
// Registrar el evento del botón 
document.querySelector("#btn-agregar").addEventListener("click",
    agregarTarjeta);

// Delegación: un solo listener en la galería para todos los botones 
galeria.addEventListener("click", (e) => {
    // Verificar que el clic fue en un botón de eliminar 
    if (!e.target.matches(".btn-eliminar")) return;
    const idEliminar = Number(e.target.dataset.id);
    // Eliminar del estado 
    tarjetas = tarjetas.filter(t => t.id !== idEliminar);
    // Eliminar del DOM 
    const
        elementoTarjeta
            =
            galeria.querySelector(`[data
id="${idEliminar}"]`);
    if (elementoTarjeta) elementoTarjeta.remove();
});