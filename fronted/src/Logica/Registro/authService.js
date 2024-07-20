import GuardarUsuario from './UsuarioGuardado'; // Importa correctamente el default export
import { GuardarRol } from './UsuarioRole';

export const iniciarSesion = async (ID_Usuario, Contrasenia) => {
  try {
    const response = await fetch('http://localhost:3001/iniciar-sesion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ID_Usuario, Contrasenia }),
    });
    const data = await response.json();
    if (data.ID_Usuario) {
      GuardarUsuario(data.ID_Usuario); 
      GuardarRol(data.role); // Asegúrate de que GuardarRol esté exportado correctamente
      return { success: true, role: data.role };
    } else {
      return { success: false, message: 'Nombre de usuario o contraseña incorrectos' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error en la solicitud' };
  }
};
