import './globals.css';
import './style.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Input, List } from 'antd';
import Header from '../../common/header/header.js';
import GuardarUsuario from '../IniciarSesion/UsuarioGuardado.js';

const { TextArea } = Input;

const Foro = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPreguntas();
  }, []);

  const fetchPreguntas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/preguntas');
      setPreguntas(response.data);
    } catch (error) {
      setError('Error fetching questions:', error);
    }
  };

  const handlePreguntaChange = (e) => {
    setNuevaPregunta(e.target.value);
  };

  const handleRegistrarPregunta = async () => {
    if (!nuevaPregunta) {
      return; // Evitar envío si no hay pregunta
    }
    try {
      const usuarioId = GuardarUsuario();
      if (!usuarioId) {
        console.error('Usuario no encontrado');
        return;
      }
      await axios.post('http://localhost:3001/api/preguntas', {
        ID_Usuario: usuarioId,
        Pregunta: nuevaPregunta
      });
      setNuevaPregunta('');
      fetchPreguntas();
    } catch (error) {
      setError('Error al registrar la pregunta:', error);
    }
  };

  const handleResponderPregunta = async (idPregunta, respuesta) => {
    try {
      const usuarioId = GuardarUsuario();
      if (!usuarioId) {
        console.error('Usuario no encontrado');
        return;
      }
      await axios.post('http://localhost:3001/api/respuestas', {
        ID_Pregunta: idPregunta,
        ID_Usuario: usuarioId,
        Respuesta: respuesta
      });
      fetchPreguntas();
    } catch (error) {
      setError('Error al responder la pregunta:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="venta-codigo">
        <div className="div">
          <div className="main">
            <div className="contenedor-foro">
              <div className="registro-pregunta">
                <TextArea
                  rows={4}
                  placeholder="Escribe tu pregunta"
                  value={nuevaPregunta}
                  onChange={handlePreguntaChange}
                />
                <Button type="primary" onClick={handleRegistrarPregunta}>
                  Registrar Pregunta
                </Button>
                {error && <p>{error}</p>}
              </div>
              <div className="preguntas-respuestas">
                <List
                  itemLayout="vertical"
                  dataSource={preguntas}
                  renderItem={(pregunta) => (
                    <List.Item key={pregunta.ID_Pregunta}>
                      <Card
                        title={`Pregunta por ${pregunta.Nombre} ${pregunta.Apellido}`}
                        extra={<small>{new Date(pregunta.FechaRegistro).toLocaleString()}</small>}
                      >
                        <p>{pregunta.Pregunta}</p>
                        <List
                          itemLayout="vertical"
                          dataSource={pregunta.respuestas}
                          renderItem={(respuesta) => (
                            <List.Item key={respuesta.ID_Respuesta}>
                              <div>
                                <strong>{`${respuesta.Nombre} ${respuesta.Apellido}`}</strong>
                                <p>{respuesta.Respuesta}</p>
                                <small>{new Date(respuesta.FechaRegistro).toLocaleString()}</small>
                              </div>
                            </List.Item>
                          )}
                        />
                        <TextArea
                          rows={2}
                          placeholder="Responde esta pregunta"
                          onPressEnter={(e) => {
                            handleResponderPregunta(pregunta.ID_Pregunta, e.target.value);
                            e.target.value = ''; // Clear input after submission
                          }}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foro;
