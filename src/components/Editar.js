import React from 'react';
import { Link } from "react-router-dom";

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados: false,  // Creamos un estado para una variable
            empleado: []
        }
    }

    cambioValor = (e) => {
        const state = this.state.empleado;
        state[e.target.name] = e.target.value;
        this.setState({ empleado: state });
    }

    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");
        const { id, nombre, correo } = this.state.empleado;
        console.log(id);
        console.log(nombre);
        console.log(correo);

        var datosEnviar = { id: id, nombre: nombre, correo: correo }

        fetch("http://localhost:8090/empleados/?actualizar=1", {
            method: 'POST',
            body: JSON.stringify(datosEnviar)  //  convierte un objeto o valor JavaScript en una cadena JSON
        })
            .then(respuesta => respuesta.json())   // pedimos información en formato json
            .then((datosRespuesta) => {  // se reciben los datos de la API
                console.log(datosRespuesta);
                this.props.history.push("/");
            })
            .catch(console.log)
    }

    componentDidMount() {
        console.log(this.props.match.params.id);

        fetch("http://localhost:8090/empleados/?consultar=" + this.props.match.params.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.setState({
                    datosCargados: true,
                    empleado: datosRespuesta[0]
                }) // Se cambian los valores de las variables
            })
            .catch(console.log)
    }

    render() {
        const { datosCargados, empleado } = this.state

        if (!datosCargados) {
            return (<div>Cargando...</div>);  // Si no hay datos
        } else {
            return (
                <div className="card">
                    <div className="card-header">
                        Editar
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.enviarDatos}>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Clave:</label>
                                <input type="text" readOnly className="form-control" value={empleado.id} name="id" id="id" aria-describedby="helpId" placeholder="" />
                                <small id="helpId" className="form-text text-muted">Clave</small>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Nombre</label>
                                <input type="text" name="nombre" onChange={this.cambioValor} id="nombre" value={empleado.nombre} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Digite nombre</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Correo</label>
                                <input type="email" name="correo" onChange={this.cambioValor} id="correo" value={empleado.correo} className="form-control" placeholder="" aria-describedby="helpId" />
                                <small id="helpId" className="text-muted">Digite correo</small>
                            </div>

                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-primary" to={"/crear"}>Actuaizar empleado</button>
                                <Link type="button" className="btn btn-danger" to={"/"}>Cancelar</Link>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-muted">
                        Footer
                    </div>
                </div>

            );
        }
    }
}

export default Editar;