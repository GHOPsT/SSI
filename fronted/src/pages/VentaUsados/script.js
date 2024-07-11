window.onload = function() {
    // Obtenemos el contenedor de la opción "Usado"
    var usadoContainer = document.querySelector('.text-wrapper-14');
    // Agregamos un evento de clic al contenedor
    usadoContainer.addEventListener('click', function() {
      // Redirigimos al usuario a la página deseada
      window.location.href = '/VentaNuevos/index.html';
    });
  };