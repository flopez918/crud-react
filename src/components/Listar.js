import React from 'react';
import { Link } from "react-router-dom";

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,  // Creamos un estado para una variable
            empleados: []
        }
    }

    borrarRegistros = (id) => {
        console.log(id);
        fetch("http://localhost:8090/empleados/?borrar=" + id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.cargarDatos();
            })
            .catch(console.log)
    }

    cargarDatos() {
        fetch("http://localhost:8090/empleados/")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.setState({ datosCargados: true, empleados: datosRespuesta }) // Se cambian los valores de las variables
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarDatos();
    }

    state = {}
    render() {
        const { datosCargados, empleados } = this.state

        if (!datosCargados) {
            return (<div>Cargando...</div>);  // Si no hay datos
        } else {
            return (
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-success" to={"/crear"}>Agregar Empleado</Link>
                    </div>
                    <div className="card-body">
                        <h3>Lista de empleados</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID </th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleados.map(
                                    (empleado) => (
                                        <tr key={empleado.id}>
                                            <td scope="row">{empleado.id}</td>
                                            <td>{empleado.nombre}</td>
                                            <td>{empleado.correo}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning" to={"/editar/" + empleado.id}>Editar</Link>
                                                    <button type="button" className="btn btn-danger" onClick={(() => this.borrarRegistros(empleado.id))}>Borrar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer text-muted">
                        Footer
                    </div>
                </div >


            );
        }
    }
}

export default Listar;