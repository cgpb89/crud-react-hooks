import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function App() {

  const dataPaises = [
    { id: 1, nombre: "Filipinas", minutos: 241 },
    { id: 2, nombre: "Brasil", minutos: 225 },
    { id: 3, nombre: "Colombia", minutos: 216 },
    { id: 4, nombre: "Nigeria", minutos: 216 },
    { id: 5, nombre: "Argentina", minutos: 207 },
    { id: 6, nombre: "Indonesia", minutos: 195 },
    { id: 7, nombre: "Emiratos Árabes Unidos", minutos: 191 },
    { id: 8, nombre: "México", minutos: 190 },
    { id: 9, nombre: "Sudáfrica", minutos: 190 },
    { id: 10, nombre: "Egipto", minutos: 186 },
  ];

  const renderTable = (): React.ReactFragment => {
    return (
      <>
        {data.map((element, index) => {
          return (
            <tr key={`table-${index}`}>
              <td>{element.id}</td>
              <td>{element.nombre}</td>
              <td>{element.minutos}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarPais(element, 'Editar')}>Editar</button>{"    "}
                <button className="btn btn-danger" onClick={() => seleccionarPais(element, 'Eliminar')}>Eliminar</button>
              </td>
            </tr>
          )
        })}
      </>
    );
  }

  const [data, setData] = useState(dataPaises),
    [modalEditar, setModalEditar] = useState(false),
    [modalEliminar, setModalEliminar] = useState(false),
    [modalInsertar, setModalInsertar] = useState(false),
    [paisSeleccionado, setPaisSeleccionado] = useState({
      id: 0,
      nombre: '',
      minutos: 0
    });

  const seleccionarPais = (elemento: any, caso: any) => {
    setPaisSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true);
  }

  const handleChange = (evt: any) => {
    const { name, value } = evt.target;
    setPaisSeleccionado((prevState) => ({ ...prevState, [name]: value }));
  }

  const editar = () => {
    const dataNueva = data;
    dataNueva.map((pais) => {
      if (pais.id === paisSeleccionado.id) {
        pais.minutos = paisSeleccionado.minutos;
        pais.nombre = paisSeleccionado.nombre;
      }
    });

    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar = () => {
    setData(data.filter(pais => pais.id !== paisSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar = () => {
    setPaisSeleccionado(
      {
        id: 0,
        nombre: '',
        minutos: 0
      });
      setModalInsertar(true);
  }

  const insertar = () => {
    const valorInsertar = paisSeleccionado;
    valorInsertar.id = data[data.length-1].id+1;
    data.push(valorInsertar);
    setData(data);
    setModalInsertar(false);
  }

  return (
    <div className="App">
      <h2>Países en los que la gente pasa mas tiempo en redes sociales (2019)</h2>
      <br />
      <button className="btn btn-success" onClick={()=> abrirModalInsertar()}>Insertar</button>
      <br />
      <br />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Minutos (por día)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            renderTable()
          }
        </tbody>
      </table>
      {/* Modal */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar País</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={paisSeleccionado && paisSeleccionado.id} />
            <br />

            <label>País</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={paisSeleccionado && paisSeleccionado.nombre}
              onChange={handleChange} />
            <br />

            <label>Minutos</label>
            <input
              className="form-control"
              type="text"
              name="minutos"
              value={paisSeleccionado && paisSeleccionado.minutos}
              onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button className="btn btn-danger" onClick={() => { setModalEditar(false) }}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estas seguro qdue deseas eliminar el país {paisSeleccionado && paisSeleccionado.nombre}
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => eliminar()}>Sí</button>
          <button className="btn btn-secondary" onClick={() => setModalEliminar(false)}>No</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar País</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1} />
            <br />

            <label>País</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={paisSeleccionado ? paisSeleccionado.nombre : ''}
              onChange={handleChange} />
            <br />

            <label>Minutos</label>
            <input
              className="form-control"
              type="text"
              name="minutos"
              value={paisSeleccionado ? paisSeleccionado.minutos : ''}
              onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => insertar()}>
            Insertar
          </button>
          <button className="btn btn-danger" onClick={() => { setModalInsertar(false) }}>
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
