import ProyectosContext from "../context/ProyectosProvider"
import { useContext } from "react"

const useProyectos = () =>{
    return useContext(ProyectosContext)
}

export default useProyectos