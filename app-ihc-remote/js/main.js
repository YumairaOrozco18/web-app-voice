// Función para obtener el último registro de la base de datos de MockAPI
function obtenerUltimaOrden() {
    fetch('https://661384ea53b0d5d80f678f83.mockapi.io/comandos')
        .then(response => response.json())
        .then(data => {
            // Ordenar los datos por fecha descendente para obtener la última orden
            const ultimaOrden = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
            
            // Mostrar el texto de la última orden en la sección correspondiente del HTML
            const lastOrderText = document.getElementById('lastOrderText');
            lastOrderText.textContent = ultimaOrden ? ultimaOrden.orderText : 'No hay órdenes disponibles';
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Llamar a la función obtenerUltimaOrden cada 2 segundos
setInterval(obtenerUltimaOrden, 2000);
