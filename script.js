const formulario = document.getElementById("formularioPerfil");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contador = document.getElementById("contador");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const cargo = document.getElementById("cargo").value;
    const departamento = document.getElementById("departamento").value;
    const foto = document.getElementById("foto").value.trim();

    // Crear la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    // Crear imagen (foto o avatar de respaldo)
    let imagen;
    if (foto === "") {
        // No se indicó foto: avatar con las iniciales
        imagen = crearAvatar(nombre);
    } else {
        imagen = document.createElement("img");
        imagen.setAttribute("src", normalizarURL(foto));
        imagen.setAttribute("alt", "Foto de " + nombre);

        // Si la URL falla (rota o bloqueada), se muestra el avatar de respaldo
        imagen.addEventListener("error", function() {
            this.replaceWith(crearAvatar(nombre));
        });
    }

    // Crear nombre
    const titulo = document.createElement("h3");
    titulo.textContent = nombre;

    // Crear cargo
    const textoCargo = document.createElement("p");
    textoCargo.textContent = "Cargo: " + cargo;

    // Crear departamento
    const textoDepartamento = document.createElement("p");
    textoDepartamento.textContent = "Departamento: " + departamento;

    // Crear botón eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("boton-eliminar");

    // Agregar elementos a la tarjeta
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(textoCargo);
    tarjeta.appendChild(textoDepartamento);
    tarjeta.appendChild(botonEliminar);

    // Agregar tarjeta al contenedor
    contenedorTarjetas.appendChild(tarjeta);

    // Actualizar contador
    actualizarContador();

    // Destacar tarjeta al hacer clic
    tarjeta.addEventListener("click", function() {

        tarjeta.classList.toggle("destacada");

    });

    // Eliminar tarjeta
    botonEliminar.addEventListener("click", function(evento) {

        evento.stopPropagation();

        tarjeta.remove();

        actualizarContador();

    });

    // Limpiar formulario
    formulario.reset();

});


// Función para actualizar el contador
function actualizarContador() {

    const cantidadTarjetas = contenedorTarjetas.children.length;

    contador.textContent = cantidadTarjetas;

}


// Agrega "https://" automáticamente si la URL no tiene protocolo
function normalizarURL(url) {

    let resultado = url.trim();

    if (!/^https?:\/\//i.test(resultado)) {
        resultado = "https://" + resultado;
    }

    return resultado;

}


// Crea un avatar de respaldo con las iniciales del nombre (SVG local)
function crearAvatar(nombre) {

    const iniciales = obtenerIniciales(nombre);
    const img = document.createElement("img");
    img.setAttribute("alt", "Avatar de " + nombre);

    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
        '<rect width="120" height="120" fill="#4a6fa5"/>' +
        '<text x="50%" y="54%" fill="#fff" font-family="Arial, sans-serif" ' +
        'font-size="44" font-weight="bold" text-anchor="middle" dominant-baseline="middle">' +
        iniciales +
        '</text></svg>';

    img.setAttribute("src", "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg));

    return img;

}


// Obtiene las iniciales (hasta 2) a partir del nombre
function obtenerIniciales(nombre) {

    const partes = nombre.trim().split(" ");

    if (partes.length === 0 || (partes.length === 1 && partes[0] === "")) {
        return "?";
    }

    const primera = partes[0].charAt(0).toUpperCase();
    const segunda = partes.length > 1 ? partes[1].charAt(0).toUpperCase() : "";

    return primera + segunda;

}
