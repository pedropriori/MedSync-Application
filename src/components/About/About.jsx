import React from "react";
import aboutImg from "../../assets/images/me-about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* ==== about image ==== */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="" className="rounded-md" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          {/* ==== about content ====*/}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Orgulho de ser um dos melhores do país</h2>
            <p className="text__para">
              Somos uma plataforma de saúde inovadora. Prezamos a grande conexão
              entre as pessoas, conectando profissionais com outros
              profissionais para dar o melhor atendimento aos pacientes "Lorem
              ipsum dolor sit amet, consectetur.
            </p>

            <p className="text__para mt-[30px]">
              Nosso melhor é algo pelo qual nos esforçamos todos os dias,
              cuidando de nossos pacientes e não olhando para o que realizamos,
              mas principalmente para o que podemos fazer amanhã. Proporcionando
              o melhor!
            </p>

            <Link to="/">
              <button className="btn">Saiba mais</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
