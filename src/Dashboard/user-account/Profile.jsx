/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import Pica from "pica";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cepMask } from "@/utils/CepMask";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, "Insira um nome válido")
    .max(150, "O nome pode ter no máximo 150 caracteres")
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras")
    .required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  address: Yup.object({
    cep: Yup.string().trim().required("CEP é obrigatório").max(9),
    logradouro: Yup.string().required("Logradouro é obrigatório"),
    numero: Yup.string().required("Número é obrigatório"),
    complemento: Yup.string(),
    bairro: Yup.string().required("Bairro é obrigatório"),
    cidade: Yup.string().required("Cidade é obrigatória"),
    estado: Yup.string().required("Estado é obrigatório"),
  }),
  gender: Yup.string().required("Gênero é obrigatório"),
  role: Yup.string(),
});

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pica = Pica();

  const initialValues = {
    name: user.name,
    email: user.email,
    photo: user.photo,
    gender: user.gender,
    address: {
      cep: user.address.cep,
      logradouro: user.address.logradouro,
      numero: user.address.numero,
      complemento: user.address.complemento,
      bairro: user.address.bairro,
      cidade: user.address.cidade,
      estado: user.address.estado,
    },
  };

  const handleFileInputChange = async (event, setFieldValue) => {
    const file = event.target.files[0];

    const resizeImage = async (file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 640;

      await pica.resize(img, canvas);
      const blob = await pica.toBlob(canvas, "image/jpeg", 0.9);

      return new File([blob], file.name, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
    };

    try {
      const resizedFile = await resizeImage(file);

      const data = await uploadImageToCloudinary(resizedFile);

      setSelectedFile(data.url);
      setFieldValue("photo", data.url);
    } catch (error) {
      console.error("Error resizing or uploading the image:", error);
    }
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }

    setSubmitting(false);
  };

  const onBlurCep = async (e, setFieldValue) => {
    const { value } = e.target;

    const cep = value?.replace(/[^0-9]/g, "");

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue("address.logradouro", data.logradouro);
        setFieldValue("address.bairro", data.bairro);
        setFieldValue("address.cidade", data.localidade);
        setFieldValue("address.estado", data.uf);
      });
  };

  const handleCepChange = (e, setFieldValue) => {
    const maskedValue = cepMask(e.target.value);
    setFieldValue("address.cep", maskedValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="mb-6 mt-8">
            <h2 className="text-center text-xl font-semibold mb-2 leading-7 text-headingColor">
              Informações do Usuário
            </h2>
            <Field
              type="text"
              name="name"
              placeholder="Nome completo"
              className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mb-6">
            <Field
              type="email"
              name="email"
              aria-readonly
              readOnly
              className="w-full pr-4 px-2 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600"
            />
          </div>

          {/* <div className="mb-6">
            <Field
              type="password"
              name="password"
              placeholder="Informe sua senha"
              className="w-full pr-4 px-2 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600"
            />
          </div> */}

          <div className="mb-5 flex items-center justify-between">
            <label className="text-headingColor font-bold text-[16px] leading-7">
              Gênero:
              <Field
                as="select"
                name="gender"
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value={null}>Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </Field>
            </label>
          </div>

          <div className="mb-5 flex items-center gap-3">
            {initialValues.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryBgColor flex items-center justify-center">
                <img
                  src={initialValues.photo}
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
                onChange={(event) =>
                  handleFileInputChange(event, setFieldValue)
                }
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />

              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden 
                    bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                {selectedFile ? selectedFile.name : "Escolher Foto"}
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-center text-xl font-semibold mb-2 leading-7 text-headingColor">
              Endereço
            </h2>
            <Field
              type="text"
              name="address.cep"
              placeholder="CEP"
              onBlur={(e) => onBlurCep(e, setFieldValue)}
              onChange={(e) => handleCepChange(e, setFieldValue)}
              className="w-full pr-4 px-2 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="address.cep"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mb-6">
            <Field
              type="text"
              name="address.logradouro"
              placeholder="Logradouro"
              className="w-full pr-4 px-2 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="address.logradouro"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mb-6">
            <Field
              type="text"
              name="address.numero"
              placeholder="Número"
              className="w-full pr-4 px-2 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="address.numero"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mb-6">
            <Field
              type="text"
              name="address.complemento"
              placeholder="Complemento"
              className="w-full pr-4 px-2 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="address.complemento"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mb-6">
            <Field
              type="text"
              name="address.bairro"
              placeholder="Bairro"
              className="w-full pr-4 px-2 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="address.bairro"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mb-6">
            <Field
              type="text"
              name="address.cidade"
              placeholder="Cidade"
              className="w-full pr-4 px-3 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            />
            <ErrorMessage
              name="address.cidade"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mb-6">
            <Field
              component="select"
              name="address.estado"
              className="w-52 pr-4 px-1 py-3 border-b border-solid
                      border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor
                      text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
            >
              <option value={null}>Selecione o Estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
              <option value="DF">Distrito Federal</option>
            </Field>
            <ErrorMessage
              name="address.estado"
              component="div"
              className="text-red-600"
            />
          </div>

          <div className="mt-7">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primaryBgColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Salvar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
