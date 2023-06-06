import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from './pages/Register'
import LoginPage from './pages/Signin'
import Navbar from './components/Navbar'
import Logout from "./pages/Logout"
import HouseChat from "./pages/HouseChat"

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/housechat" element={ <HouseChat /> } />
          <Route path="/signin" element={ <LoginPage /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/logout" element={ <Logout /> } />
        </Routes>
      </div>
    </>
  )
}

export default App