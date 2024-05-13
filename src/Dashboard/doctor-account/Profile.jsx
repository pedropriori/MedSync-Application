import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [
      { startingDate: "", endingDate: "", degree: "", university: "" },
    ],
    experiences: [
      { startingDate: "", endingDate: "", position: "", place: "" },
    ],
    timeSlots: [{ day: "", startingTime: "", endingTime: "" }],
    about: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {};

  const updateProfileHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Informações do Perfil
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label">Nome*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nome Completo"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="email@example.com"
            className="form__input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Telefone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(00) 0 0000-0000"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Biografia"
            className="form__input"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gênero*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="others">Outros</option>
              </select>
            </div>
            <div>
              <p className="form__label">Especialização*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Selecione</option>
                <option value="cardiologist">Cardiologista</option>
                <option value="dermatologist">Dermatologista</option>
                <option value="endocrinologist">Endocrinologista</option>
                <option value="psychologist">Psicólogo</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div>
              <p className="form__label">Preço*</p>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                value={formData.ticketPrice}
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label">Qualificações*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                {/* === date ==== */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Data de Início</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Data de Término</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                    />
                  </div>
                </div>
                {/* === degree === */}
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Graduação*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form__input"
                    />
                  </div>
                  {/* === university === */}
                  <div>
                    <p className="form__label">Universidade*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form__input"
                    />
                  </div>
                </div>

                <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
            Adicionar Qualificação
          </button>
        </div>
        {/* === experiences qualification === */}
        <div className="mb-5">
          <p className="form__label">Experiencias*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                {/* === date ==== */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Data de Início</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                    />
                  </div>
                  <div>
                    <p className="form__label">Data de Término</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                    />
                  </div>
                </div>
                {/* === position === */}
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Cargo*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form__input"
                    />
                  </div>
                  {/* === place === */}
                  <div>
                    <p className="form__label">Lugar*</p>
                    <input
                      type="text"
                      name="place"
                      value={item.place}
                      className="form__input"
                    />
                  </div>
                </div>

                <button className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
            Adicionar Experiência
          </button>
          {/* === Time Slots === */}
          <div className="mb-5 pt-5">
            <p className="form__label">Horários*</p>
            {formData.timeSlots?.map((item, index) => (
              <div key={index}>
                <div>
                  {/* === date ==== */}
                  <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                    <div>
                      <p className="form__label">Dia</p>
                      <select
                        name="day"
                        value={item.day}
                        className="form__input py-3.5"
                      >
                        <option value="">Selecione</option>
                        <option value="sunday">Domingo</option>
                        <option value="monday">Segunda-Feira</option>
                        <option value="tuesday">Terça-Feira</option>
                        <option value="wednesday">Quarta-Feira</option>
                        <option value="thursday">Quinta-Feira</option>
                        <option value="friday">Sexta-Feira</option>
                        <option value="saturday">Sábado</option>
                      </select>
                    </div>
                    <div>
                      <p className="form__label">Hora de Início</p>
                      <input
                        type="time"
                        name="startingTime"
                        value={item.startingTime}
                        className="form__input"
                      />
                    </div>
                    <div>
                      <p className="form__label">Hora de Término</p>
                      <input
                        type="time"
                        name="endingTime"
                        value={item.endingTime}
                        className="form__input"
                      />
                    </div>
                    <div className="flex items-center">
                      <button className="bg-red-600 p-2 rounded-full text-white text-[18px] cursor-pointer mt-6">
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">
              Adicionar Horário
            </button>
          </div>
        </div>
        {/* === About === */}
        <div className="mb-5">
          <p className="form__label">Sobre*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Escreva sobre você"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryBgColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="avatar"
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden 
                    bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Escolher foto
            </label>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryBgColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Atualizar Perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
