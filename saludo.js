function saludarEnEspanol() {
    return "Hola!";
  }
  
  function saludarEnIngles() {
    return "Hello!";
  }
  
  // Exportamos las funciones para que estén disponibles en otros archivos
  module.exports = {
    saludarEnEspanol,
    saludarEnIngles
  };