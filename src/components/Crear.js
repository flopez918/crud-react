import React from 'react';
import { Link } from "react-router-dom";

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            correo: ""
        }
    }
    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
    }
    enviarDatos = (e) => {
        e.preventDefault();
        console.log("Formulario enviado...");
        const { nombre, correo } = this.state;
        console.log(nombre);
        console.log(correo);

        var datosEnviar = { nombre: nombre, correo: correo }

        fetch("http://localhost:8090/empleados/?insertar=1", {
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

    render() {

        const { nombre, correo } = this.state;

        return (
            <div className="card">
                <div className="card-header">
                    Crear Empleado
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Nombre</label>
                            <input type="text" name="nombre" onChange={this.cambioValor} id="nombre" value={nombre} className="form-control" placeholder="" aria-describedby="helpId" />
                            <small id="helpId" className="text-muted">Digite nombre</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Correo</label>
                            <input type="email" name="correo" onChange={this.cambioValor} id="correo" value={correo} className="form-control" placeholder="" aria-describedby="helpId" />
                            <small id="helpId" className="text-muted">Digite correo</small>
                        </div>

                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-primary" to={"/crear"}>Agregar empleado</button>
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

export default Crear;