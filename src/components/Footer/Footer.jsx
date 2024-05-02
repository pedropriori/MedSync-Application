// import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { RiLinkedinFill } from 'react-icons/ri'
import { AiFillGithub, AiOutlineInstagram } from 'react-icons/ai'

const socialLinks = [
  {
    path: 'https://github.com/pedropriori',
    icon: <AiFillGithub className='group-hover:text-white w-4 h-5' />
  },
  {
    path: 'https://www.instagram.com/pedropriorii/',
    icon: <AiOutlineInstagram className='group-hover:text-white w-4 h-5' />
  },
  {
    path: 'https://www.linkedin.com/in/pedropriori/',
    icon: <RiLinkedinFill className='group-hover:text-white w-4 h-5' />
  },
]

const quickLinks01 = [
  {
    path: "/home",
    display: "Início",
  },
  {
    path: "/",
    display: "Sobre Nós",
  },
  {
    path: "/",
    display: "Serviços",
  },
  {
    path: "/",
    display: "Blog",
  },
]

const quickLinks02 = [
  {
    path: "/find-a-professional",
    display: "Encontre um Profissional",
  },
  {
    path: "/",
    display: "Solicite uma Consulta",
  },
  {
    path: "/",
    display: "Encontre um Local",
  },
  {
    path: "/",
    display: "Opiniões",
  },
]

const quickLinks03 = [
  {
    path: "/",
    display: "Doação",
  },
  {
    path: "/contact",
    display: "Contate-nos",
  },
]

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className='pb-16 pt-10'>
      <div className='container'>
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />
            <p className='text-[14px] leading-7 font-[400] text-textColor mt-4 pl-2'>Copyright ©️ {year} developed by Pedro Priori all right reserved.</p>

            <div className='flex items-center gap-3 mt-4'>
              {socialLinks.map((link, index) => (
                <Link 
                  to={link.path}
                  key={index}
                  className='w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryBgColor hover:border-none'
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className='text-[18px] leading-30px font-[700] mb-6 text-headingColor'>
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link
                    to={item.path}
                    className='text-[14px] leading-7 font-[400] text-textColor'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[18px] leading-30px font-[700] mb-6 text-headingColor'>
              Eu quero:
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link
                    to={item.path}
                    className='text-[14px] leading-7 font-[400] text-textColor'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className='text-[18px] leading-30px font-[700] mb-6 text-headingColor'>
              Suporte
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className='mb-4'>
                  <Link
                    to={item.path}
                    className='text-[14px] leading-7 font-[400] text-textColor'
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer