import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

	const [password, setPassword] = useState('')
	const [tokenValido, setTokenValido] = useState(false)
	const [alerta, setAlerta] = useState({})
	const [passwordModificado, setPasswordModificado] = useState(false)

	const params = useParams()
	const { token } = params

	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clienteAxios(`/usuarios/olvide-password/${token}`)
				setTokenValido(true)
			} catch (error) {
				setAlerta({
					msg: error.response.data.msg,
					error: true
				})
			}
		}
		comprobarToken()
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		if (password.length < 6) {
			setAlerta({
				msg:'La contraseña debe contener como mínimo 6 caracteres',
				error: true
			})
			setTimeout(() => {
				setAlerta({})
			}, 3000)
			return
		}

		try {
			const url = `/usuarios/olvide-password/${token}`
			const { data } = await clienteAxios.post(url, {password})

			setAlerta({
				msg: data.msg,
				error: false
			})
			setTimeout(() => {
				setAlerta({})
			}, 3000)
			setPasswordModificado(true)
		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true
			})
			setTimeout(() => {
				setAlerta({})
			}, 3000)
		}
	}

	const { msg } = alerta

	return (
		<>
			<h1 className="text-sky-600 font-black text-6xl capitalize">
				Reestablece tu contraseña y no pierdas acceso a tus <span className="text-slate-700">proyectos</span>
			</h1>

			{msg && <Alerta alerta={alerta} />}

			{ tokenValido && (
				<form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold"
							htmlFor="password"
						>
							Nueva Contraseña
						</label>
						<input
							id="password"
							type="password"
							placeholder="Introduce tu nueva contraseña"
							className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<input
						type="submit"
						value="Guardar cambios"
						className="bg-sky-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-700 transition-colors"
					/>
				</form>
			)}

			{passwordModificado && (
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm"
					to="/"
				>
					Inicia sesión
				</Link>
			)}
		</>
	)
};

export default NuevoPassword;
