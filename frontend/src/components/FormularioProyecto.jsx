import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"

const FormularioProyecto = () => {

    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cliente, setCliente] = useState('')

    const params = useParams()
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos()

    useEffect(() => {
        if (params.id) {
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
            setCliente(proyecto.cliente)
        }
    },[params])

    const handleSubmit = async e => {
        e.preventDefault()

        if ([nombre, descripcion, fechaEntrega, cliente].includes('')) {
            mostrarAlerta({
				msg:'Todos los campos son obligatorios',
				error: true
			})
            return
        }

        // Pasar los datos hacia el provider
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente})
        setId(null)
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
    }

  return (
    <form onSubmit={handleSubmit} className="bg-white py-10 px-5 md:w-3/4 lg:w-3/5 rounded-lg shadow items">  
        { alerta.msg && <Alerta alerta={alerta}/> }
        <div className="mb-5">
            <label 
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold text-sm"
            >Nombre del Proyecto</label>
            <input 
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                type="text"
                id="nombre" 
                placeholder="Nombre del proyecto"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label 
                htmlFor="descripcion"
                className="text-gray-700 uppercase font-bold text-sm"
            >Descripción</label>
            <textarea
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                id="descripcion" 
                placeholder="Descripción del proyecto..."
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            ></textarea> 
        </div>
        <div className="mb-5">
            <label 
                htmlFor="fecha-entrega"
                className="text-gray-700 uppercase font-bold text-sm"
            >Fecha de Entrega</label>
            <input 
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                type="date"
                id="fecha-entrega" 
                value={fechaEntrega}
                onChange={e => setFechaEntrega(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label 
                htmlFor="cliente"
                className="text-gray-700 uppercase font-bold text-sm"
            >Nombre del Cliente</label>
            <input 
                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                type="text"
                id="cliente" 
                placeholder="Nombre del cliente"
                value={cliente}
                onChange={e => setCliente(e.target.value)}
            />
        </div>
        <input 
            className="bg-sky-600 hover:bg-sky-700 transition-colors w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer"
            type="submit" 
            value={id ? "Actualizar proyecto" : "Crear proyecto"} 
        />
    </form>
  )
}

export default FormularioProyecto