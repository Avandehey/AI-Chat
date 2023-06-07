import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';

const base_api_url = import.meta.env.VITE_APP_BASE_API

export default function LoginPage() {
  const usernameField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(user.token || localStorage.getItem('token')) {
        localStorage.setItem('token',JSON.stringify(user.token))
        localStorage.setItem('username',JSON.stringify(user.username))
        navigate('/');
      }
  },[user])
  
  async function handleLoginForm(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const res = await fetch(`${base_api_url}/verify-user`,{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: usernameField.current?.value,
        password: passwordField.current?.value
      })
    })
    if(res.ok){
      const data = await res.json()
      setUser({
        loggedIn:true, 
        username:String(usernameField.current?.value),
        token:data[0]['user_token']
      })
    }
  }
  
  return (
    <div>
    <h2>Login Page</h2>
    <form onSubmit={handleLoginForm}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameField} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordField} />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
    );
}
