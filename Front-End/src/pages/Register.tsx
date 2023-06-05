import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../contexts/UserProvider"
import { useNavigate } from "react-router-dom"


export default function Register() {
  const usernameField = useRef<HTMLInputElement>(null)
  const emailField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const base_api_url = import.meta.env.VITE_APP_BASE_API

  useEffect(()=>{
    if(user.token || localStorage.getItem('token')) {
        localStorage.setItem('token',JSON.stringify(user.token))
        localStorage.setItem('username',JSON.stringify(user.username))
        navigate('/');
      }
  },[user])
  
  async function handleRegisterForm(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const res = await fetch(`${base_api_url}/register-user`,{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: usernameField.current?.value,
        email: emailField.current?.value,
        password: passwordField.current?.value
      })
    })
    if(res.ok){
      const data = await res.json()
      console.log(data)
      navigate('/signin')
    }
  }
  
    return (
        <form onSubmit={handleRegisterForm}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" ref={usernameField} />
            </div><br />
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" ref={emailField} />  
            </div><br />
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" ref={passwordField} />  
            </div><br />
        <button type="submit">Register</button>
        </form>
        )
}