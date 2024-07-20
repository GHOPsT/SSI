const GuardarUsuario = (() => {
  let usuarioId; // Variable para almacenar el usuario_id

  return (usuario) => {
    if (usuario !== undefined) {
      usuarioId = usuario; // Almacena el usuario_id
    }
    return usuarioId; // Retorna el usuario_id
  };
})();

export default GuardarUsuario;