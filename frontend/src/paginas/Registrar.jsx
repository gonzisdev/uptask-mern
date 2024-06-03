import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios"

const Registrar = () => {

	const [nombre, setNombre] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repetirPassword, setRepetirPassword] = useState('')
	const [alerta, setAlerta] = useState({})

	const handleSubmit = async e =>{
		e.preventDefault()

		if([nombre, email, password, repetirPassword].includes('')){
			setAlerta({
				msg:'Todos los campos son obligatorios',
				error: true
			})
			setTimeout(() => {
				setAlerta({})
			}, 3000)
			return
		}

		if (password !== repetirPassword) {
			setAlerta({
				msg:'Las contraseñas no son iguales',
				error: true
			})
			setTimeout(() => {
				setAlerta({})
			}, 3000)
			return
		}

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
		setAlerta({})

		// Crear el usuario en la API
		try {
			const { data } = await clienteAxios.post('/usuarios', {nombre, email, password})
			
			setAlerta({
				msg: data.msg,
				error: false
			})
			setTimeout(() => {
				setAlerta({})
			}, 3000)

			setNombre('')
			setEmail('')
			setPassword('')
			setRepetirPassword('')

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
				Crea tu cuenta y administra tus <span className="text-slate-700">proyectos</span>
			</h1>

			{ msg && <Alerta alerta={alerta}/> }

			<form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
        		<div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="nombre"
					>
						Nombre
					</label>
					<input
						id="nombre"
						type="text"
						placeholder="Tu nombre"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
						onChange={(e)=>setNombre(e.target.value)}
						value={nombre}
					/>
				</div>
        		<div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="email"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Tu email"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
						onChange={(e)=>setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="password"
					>
						Contraseña
					</label>
					<input
						id="password"
						type="password"
						placeholder="Tu contraseña"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
						onChange={(e)=>setPassword(e.target.value)}
						value={password}
					/>
				</div>
       			 <div className="my-5">
					<label
						className="uppercase text-gray-600 block text-xl font-bold"
						htmlFor="password2"
					>
						Repetir Contraseña
					</label>
					<input
						id="password2"
						type="password"
						placeholder="Repite tu contraseña"
						className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
						onChange={(e)=>setRepetirPassword(e.target.value)}
						value={repetirPassword}
					/>
				</div>
				<input
					type="submit"
					value="Crear Cuenta"
					className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
				/>
			</form>

			<nav className="lg:flex lg:justify-between">
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm"
					to="/"
				>
					¿Ya tienes una cuenta? Inicia sesión
				</Link>
				<Link
					className="block text-center my-5 text-slate-500 uppercase text-sm"
					to="/olvide-password"
				>
					Olvidé mi contraseña
				</Link>
			</nav>
		</>
	);
};

export default Registrar;
