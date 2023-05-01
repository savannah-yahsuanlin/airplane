import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { register } from '../store'
import {withRouter} from 'react-router-dom'


const Signup = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const signup = async(ev) => {
		ev.preventDefault()
		const _signup = {username, password}
		try {
			await dispatch(register(_signup))
		} catch(ex)  {
			console.log(ex)
		}
	}
	return (
		<form onSubmit={ signup }>
			<input placeholder='username' value={username} onChange={ev => setUsername(ev.target.value)} />
			<input placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
			<button>Sign Up</button>
		</form>
	)
}

export default withRouter(Signup)