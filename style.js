// Configuración del emprendimiento
const NOMBRE_EMPRENDIMIENTO = "Mi Emprendimiento";
const WHATSAPP_NUM = "5491112345678"; // tu número en formato internacional sin signos
const WHATSAPP_TEXT_GENERAL = "Hola, quiero más información sobre sus productos.";

// Función para renderizar productos desde JSON
async function renderProductos() {
  const cont = document.getElementById("listaProductos");
  cont.innerHTML = "<p>Cargando productos...</p>";

  try {
    const response = await fetch("productos.json");
    if (!response.ok) throw new Error("No se pudo cargar productos.json");
    const productos = await response.json();

    console.log("Productos cargados:", productos); // <-- log de prueba

    cont.innerHTML = ""; // limpiar mensaje de carga

    productos.forEach(p => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text fw-bold">${p.precio}</p>
            <a href="https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent("Quiero comprar: " + p.nombre)}"
               target="_blank"
               class="btn btn-success mt-auto">Comprar</a>
          </div>
        </div>
      `;

      cont.appendChild(card);
    });

  } catch (err) {
    cont.innerHTML = "<p class='text-danger'>Error al cargar productos.</p>";
    console.error("Error cargando productos.json:", err);
  }
}

// Navegación entre secciones Productos / Contacto
document.querySelectorAll("[data-view]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const view = link.dataset.view;

    document.getElementById("view-productos").classList.add("d-none");
    document.getElementById("view-contacto").classList.add("d-none");

    document.getElementById("view-" + view).classList.remove("d-none");

    document.querySelectorAll(".nav-link").forEach(nav => nav.classList.remove("active"));
    link.classList.add("active");
  });
});

// Configurar botones de contacto
document.getElementById("anio").textContent = new Date().getFullYear();
document.getElementById("whatsappBtn").href = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(WHATSAPP_TEXT_GENERAL)}`;
document.getElementById("emailLink").href = `mailto:tuemail@dominio.com?subject=Consulta ${encodeURIComponent(NOMBRE_EMPRENDIMIENTO)}`;

// Inicializar renderizado de productos
renderProductos();
