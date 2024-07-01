import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { cepMask } from "@/utils/CepMask";
import { useState } from "react";
import { BASE_URL, token } from "./../../../config";
import { toast } from "react-toastify";

const Address = ({ doctorData }) => {
    const validationSchema = Yup.object({
        address: Yup.object({
            cep: Yup.string().trim().required("CEP é obrigatório").max(9, "CEP Inválido").min(8, "CEP Inválido"),
            logradouro: Yup.string().required("Logradouro é obrigatório"),
            numero: Yup.string().required("Número é obrigatório"),
            complemento: Yup.string(),
            bairro: Yup.string().required("Bairro é obrigatório"),
            cidade: Yup.string().required("Cidade é obrigatória"),
            estado: Yup.string().required("Estado é obrigatório"),
          }),
    })

    const [loading, setLoading] = useState(false);

    const initialValues = {
        address: {
            cep: doctorData?.address.cep,
            logradouro: doctorData?.address.logradouro,
            numero: doctorData?.address.numero,
            complemento: doctorData?.address.complemento,
            bairro: doctorData?.address.bairro,
            cidade: doctorData?.address.cidade,
            estado: doctorData?.address.estado,
          },
    }

    const updateProfileHandler = async (values) => {
        try {
          const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          });
    
          const result = await res.json();
          if (!res.ok) {
            throw Error(result.message);
          }
    
          toast.success(result.message);
        } catch (err) {
          toast.error(err.message);
        }
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
        onSubmit={updateProfileHandler}
        enableReinitialize
        >
            {({ setFieldValue }) => (
                <Form>
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

              <button
              type="submit"
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Atualizar Endereço
            </button>
              </Form>
            )}
        </Formik>
    )
}

export default Address