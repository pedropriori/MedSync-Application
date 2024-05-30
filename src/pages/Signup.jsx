import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import Pica from "pica";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { cepMask } from "@/utils/CepMask";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, "Insira um nome válido")
    .required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
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
  role: Yup.string().required("Role é obrigatório"),
});

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pica = Pica();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
    address: {
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
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

      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFieldValue("photo", data.url);
    } catch (error) {
      console.error("Error resizing or uploading the image:", error);
    }
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
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
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="sign-up"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Crie uma <span className="text-primaryBgColor">conta 💙</span>
            </h3>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="mb-6">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Nome completo"
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
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
                      placeholder="exemplo@email.com"
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="mb-6">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Informe sua senha"
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="mb-6">
                    <Field
                      type="text"
                      name="address.cep"
                      placeholder="CEP"
                      onBlur={(e) => onBlurCep(e, setFieldValue)}
                      onChange={(e) => handleCepChange(e, setFieldValue)}
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
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
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
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
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
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
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
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
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
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
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
                    />
                    <ErrorMessage
                      name="address.cidade"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="mb-6">
                    <Field
                      type="text"
                      name="address.estado"
                      placeholder="Estado"
                      className="w-full pr-4 px-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryBgColor text-[17.5px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-[16px] cursor-pointer"
                    />
                    <ErrorMessage
                      name="address.estado"
                      component="div"
                      className="text-red-600"
                    />
                  </div>

                  <div className="mb-5 flex items-center justify-between">
                    <div className="mb-6">
                      Gênero:
                      <Field
                        as="select"
                        name="gender"
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Gênero
                        </option>
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                        <option value="other">Outro</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div className="mb-6">
                      Você é:
                      <Field
                        as="select"
                        name="role"
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none cursor-pointer"
                      >
                        <option value="patient">Paciente</option>
                        <option value="doctor">Profissional</option>
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>

                  {/* <div className="mb-6">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={(event) =>
                        handleFileInputChange(event, setFieldValue)
                      }
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    {previewURL && (
                      <img
                        src={previewURL}
                        alt="Preview"
                        className="mt-2 h-40 w-40 object-cover"
                      />
                    )}
                  </div> */}
                  <div className="mb-5 flex items-center gap-3">
                    {selectedFile && (
                      <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryBgColor flex items-center justify-center">
                        <img
                          src={previewURL}
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
                    bg-blue-800 text-white font-semibold rounded-lg truncate cursor-pointer"
                      >
                        Escolher foto
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primaryBgColor py-3 text-white font-bold rounded-lg hover:bg-secondaryBgColor transition duration-300"
                  >
                    {loading ? (
                      <HashLoader color="#fff" size={20} />
                    ) : (
                      "Registrar"
                    )}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="text-[17px] mt-4 text-headingColor font-[400]">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primaryBgColor hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
