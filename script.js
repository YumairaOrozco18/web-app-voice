document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('startBtn');
  const resultDiv = document.getElementById('result');

  // Crear un nuevo objeto de reconocimiento de voz
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

  // Establecer opciones
  recognition.lang = 'es-ES'; // Idioma español
  recognition.continuous = false; // No continuar después de la pausa del hablante

  // Cuando se detecta un resultado
  recognition.onresult = function (event) {
    // Obtener el texto reconocido
    const transcript = event.results[0][0].transcript;

    // Mostrar el texto reconocido en el resultado
    resultDiv.innerHTML = `<p>Comando reconocido: <strong>${transcript}</strong></p>`;

    // Ejecutar la acción correspondiente al comando reconocido
    ejecutarComando(transcript);
  };

  // Manejador de clic del botón de inicio
  startBtn.addEventListener('click', function () {
    // Iniciar el reconocimiento de voz
    recognition.start();
  });

  // Función para ejecutar comandos según el texto reconocido
  function ejecutarComando(transcript) {
    // Convertir el texto reconocido a minúsculas para facilitar la comparación
    const comando = transcript.toLowerCase();

    // Abrir una nueva pestaña
    if (comando.includes('abrir nueva pestaña')) {
      window.open('', '_blank');
      almacenarOrden('Abrir nueva pestaña');
    }
    // Ir a una página específica
    else if (comando.includes('ir a')) {
      // Extraer la URL de la página
      const url = transcript.split('ir a')[1].trim();
      // Navegar a la URL
      window.location.href = url;
      almacenarOrden(`Ir a ${url}`);
    }
    // Modificar el tamaño de la ventana del navegador
    else if (comando.includes('modificar tamaño ventana')) {
      // Extraer el ancho y el alto de la ventana
      const dimensiones = transcript.split('modificar tamaño ventana')[1].trim().split('por');
      const ancho = parseInt(dimensiones[0].trim());
      const alto = parseInt(dimensiones[1].trim());
      // Modificar el tamaño de la ventana
      window.resizeTo(ancho, alto);
      almacenarOrden(`Modificar tamaño ventana ${ancho} por ${alto}`);
    }
    // Cerrar una pestaña
    else if (comando.includes('cerrar pestaña')) {
      window.close();
      almacenarOrden('Cerrar pestaña');
    }
    // Cerrar el navegador
    else if (comando.includes('cerrar navegador')) {
      window.open('', '_self').close();
      almacenarOrden('Cerrar navegador');
    }
    // Comando no reconocido
    else {
      alert('Comando no reconocido. Por favor, intenta de nuevo.');
    }
  }

  // Función para almacenar la orden en MockAPI.io
  function almacenarOrden(orden) {
    // URL de la API de MockAPI.io donde almacenar la orden
    const apiUrl = 'https://mockapi.io/api/<tu-id>/ordenes';

    // Datos de la orden a enviar
    const data = {
      orden: orden,
      timestamp: new Date().toISOString() // Marcar el tiempo de la orden
    };

    // Configuración de la solicitud POST
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    // Realizar la solicitud POST a la API
    fetch(apiUrl, options)
      .then(response => response.json())
      .then(data => console.log('Orden almacenada:', data))
      .catch(error => console.error('Error al almacenar la orden:', error));
  }
});
