import heroImg01 from "../assets/images/hero-img01.png";
import heroImg04 from "../assets/images/hero-img04.png";
import heroImg05 from "../assets/images/hero-img05.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import featureImg from "../assets/images/feature-img01.png";
import faqImg from "../assets/images/faq-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      {/* ---- hero section ---- */}

      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* --- hero content --- */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[60px]">
                  Ajudamos nossos pacientes a terem uma vida mais longa e
                  saudável.
                </h1>
                <p className="text__para">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos,
                  pariatur dolor excepturi nihil rerum esse vel doloremque
                  perferendis ducimus ut animi? Earum dolore deserunt odio
                  aperiam?
                </p>

                <button className="btn">Solicite uma consulta</button>
              </div>

              {/* === hero counter === */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    10+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Anos de Experiência</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    24h
                  </h2>
                  <span className="w-[100px] h-2 bg-blue-700 rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Suporte ao Cliente</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Satisfação dos Pacientes</p>
                </div>
              </div>
            </div>

            {/* ==== hero content ==== */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={heroImg01} alt="" />
              </div>
              <div className="mt-[30px]">
                <img
                  className="w-full mb-[30px] rounded-lg"
                  src={heroImg04}
                  alt=""
                />
                <img className="w-full rounded-lg" src={heroImg05} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ---- hero section end ---- */}
      <section>
        <div className="container">
          <div className="lg:w-[570px] mx-auto">
            <h2 className="heading text-center">
              Fornecendo os melhores serviços para saúde
            </h2>
            <p className="text__para text-center">
              Cuidado para todos. Nosso sistema oferece cuidados de saúde
              especializados e incomparáveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className="mt-[20px]">
                <h2 className="text-[20px] leading-9 text-headingColor font-[700] text-center">
                  Encontre um Profissional
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Nosso sistema oferece cuidados de saúde especializados e
                  incomparáveis para todos.
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryBgColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className="mt-[20px]">
                <h2 className="text-[20px] leading-9 text-headingColor font-[700] text-center">
                  Encontre um Local
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Encontre um profissional por perto, se for de sua preferência.
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryBgColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className="mt-[20px]">
                <h2 className="text-[20px] leading-9 text-headingColor font-[700] text-center">
                  Agende uma Consulta
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  Nosso sistema oferece cuidados de saúde especializados e
                  incomparáveis para todos.
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryBgColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
      {/* ===== services section start ===== */}
      <section>
        <div className="container">
          <div className="lg:w-[570px] mx-auto">
            <h2 className="heading text-center">Nossos Serviços</h2>
            <p className="text__para text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>

          <ServiceList />
        </div>
      </section>
      {/* ===== services section end ===== */}

      {/* ===== feature section start ===== */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* === feature content === */}
            <div className="xl:w-670px">
              <h2 className="heading">
                Faça uma consulta virtual a<br /> qualquer momento.
              </h2>

              <ul className="pl-4">
                <li className="text__para">
                  1. Agende a consulta diretamente.
                </li>
                <li className="text__para">
                  2. Procure seu profissional aqui e entre em contato com seu
                  consultório.
                </li>
                <li className="text__para">
                  3. Use a ferramenta de agendamento on-line para selecionar um
                  horário de consulta.
                </li>
              </ul>
              <Link to="/">
                <button className="btn">Saiba Mais</button>
              </Link>
            </div>

            {/* === feature img === */}
            <div className="relative z-10 lg:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} alt="" className="w-3/4" />

              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[-10px] left-0 md:bottom-[10px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Seg, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      10:00
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className="w-[65px] lg:w-[80px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-sm">
                  Consulta
                </div>

                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Dr. Romildo
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== feature section end ===== */}

      {/* ==== start profissionais/doctors ==== */}
      <section>
        <div className="container">
          <div className="lg:w-[570px] mx-auto">
            <h2 className="heading text-center">
              Nossos excelentes profissionais
            </h2>
            <p className="text__para text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>

          <DoctorList />
        </div>
      </section>
      {/* ==== end profissionais/doctors ==== */}

      {/* ==== faq section ==== */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading py-[35px]">
                A maioria de nossos queridos clientes perguntam
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* ==== faq section end ==== */}

      {/* ==== testimonial ==== */}
      <section>
        <div className="container">
          <div className="lg:w-[570px] mx-auto">
            <h2 className="heading text-center">O que nosso clientes dizem</h2>
            <p className="text__para text-center">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
      {/* ==== testimonial end ==== */}
    </>
  );
};

export default Home;
