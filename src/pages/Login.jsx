import { useState } from "react"
import { Link } from "react-router-dom"


const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Olá, <span className="text-primaryBgColor"> Bem-Vindo </span> de Volta 🩵
        </h3>

        <form className="py-4 md:py-0">
          <div className="mb-5">
            <input 
              type="email"
              placeholder="Informe seu e-mail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-1 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor 
                        text-[18px] leading-5 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input 
              type="password"
              placeholder="Informe sua senha"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-1 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor 
                        text-[18px] leading-5 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mt-7">
            <button type="submit" className="w-full bg-primaryBgColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              Login
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Não possui uma conta? <Link to="/register" className="text-primaryBgColor font-medium ml-1">Registre-se</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login