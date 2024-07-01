/* eslint-disable react/prop-types */
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { BASE_URL, token } from "./../../../config";
import { toast } from "react-toastify";
import Pica from "pica";
import InputMask from "react-input-mask";
import { NumericFormat } from "react-number-format";

const Profile = ({ doctorData }) => {
  const initialValues = {
    name: doctorData?.name || "",
    email: doctorData?.email || "",
    phone: doctorData?.phone || "",
    gender: doctorData?.gender || "",
    specialization: doctorData?.specialization || "",
    ticketPrice: doctorData?.ticketPrice || "",
    about: doctorData?.about || "",
    bio: doctorData?.bio || "",
    isAvailableForTelemedicine: doctorData?.isAvailableForTelemedicine || false,
    qualifications: doctorData?.qualifications?.map((qualification) => ({
      startingDate: qualification.startingDate || "",
      endingDate: qualification.endingDate || "",
      degree: qualification.degree || "",
      university: qualification.university || "",
    })) || [
      {
        startingDate: "",
        endingDate: "",
        degree: "",
        university: "",
      },
    ],
    experiences: doctorData?.experiences?.map((experience) => ({
      startingDate: experience.startingDate || "",
      endingDate: experience.endingDate || "",
      position: experience.position || "",
      place: experience.place || "",
    })) || [
      {
        startingDate: "",
        endingDate: "",
        position: "",
        place: "",
      },
    ],
    weekDayTimeSlots: doctorData?.weekDayTimeSlots?.map((timeSlot) => ({
      day: timeSlot.day || "",
      startingTime: timeSlot.startingTime || "",
      endingTime: timeSlot.endingTime || "",
    })) || [
      {
        day: "",
        startingTime: "",
        endingTime: "",
      },
    ],
  };

  const pica = Pica();

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

  const today = new Date();
  const minDate = new Date(1900, 0, 1);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Insira um nome válido")
      .max(150, "O nome pode ter no máximo 150 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras")
      .required("Nome é obrigatório"),
    phone: Yup.string().required("Telefone é obrigatório"),
    bio: Yup.string().min(5).required("Biografia é obrigatória"),
    gender: Yup.string().required("Gênero é obrigatório"),
    specialization: Yup.string().required("Especialização é obrigatória"),
    ticketPrice: Yup.string().min(2).required("Preço é obrigatório"),
    about: Yup.string().required("Sobre é obrigatório"),
    isAvailableForTelemedicine: Yup.boolean(),
    qualifications: Yup.array().of(
      Yup.object().shape({
        startingDate: Yup.date()
          .min(minDate, "Data inválida")
          .max(today, "Data inválida")
          .required("Data de início é obrigatória"),
        endingDate: Yup.date()
          .min(
            Yup.ref("startingDate"),
            "A data de término deve ser posterior à data de início"
          )
          .max(
            new Date(2040, 0, 1),
            "A data de término deve ser real e não muito distante no futuro"
          )
          .required("Data de término é obrigatória"),
        degree: Yup.string().required("Graduação é obrigatória"),
        university: Yup.string().required("Universidade é obrigatória"),
      })
    ),
    experiences: Yup.array().of(
      Yup.object().shape({
        startingDate: Yup.date()
          .min(minDate, "Data inválida")
          .max(today, "Data inválida")
          .required("Data de início é obrigatória"),
        endingDate: Yup.date()
          .min(
            Yup.ref("startingDate"),
            "A data de término deve ser posterior à data de início"
          )
          .max(today, "A data de término não pode ser futura")
          .required("Data de término é obrigatória"),
        position: Yup.string().required("Cargo é obrigatório"),
        place: Yup.string().required("Lugar é obrigatório"),
      })
    ),
    weekDayTimeSlots: Yup.array().of(
      Yup.object().shape({
        day: Yup.string(),
        startingTime: Yup.string(),
        endingTime: Yup.string(),
      })
    ),
  });

  const handleFileInputChange = async (event, setFieldValue) => {
    const file = event.target.files[0];

    try {
      const resizedFile = await resizeImage(file);
      const data = await uploadImageToCloudinary(resizedFile);

      setFieldValue("photo", data?.url);
    } catch (error) {
      console.error("Error resizing or uploading the image:", error);
    }
  };

  const updateProfileHandler = async (values) => {
    const formattedValues = {
      ...values,
      phone: String(values.phone).replace(/\D/g, ""),
      ticketPrice: parseFloat(values.ticketPrice),
    };

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedValues),
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

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Informações do Perfil
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={updateProfileHandler}
        // onSubmit={(values) => {
        //   console.log("Form values on submit:", values);
        //   updateProfileHandler(values);
        // }}
        enableReinitialize
      >
        {({ values, handleBlur, setFieldValue }) => (
          <Form>
            <div className="mb-5">
              <p className="form__label">Nome*</p>
              <Field
                type="text"
                name="name"
                placeholder="Nome Completo"
                className="form__input"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <p className="form__label">Email*</p>
              <Field
                type="email"
                name="email"
                placeholder="email@example.com"
                className="form__input"
                readOnly
                aria-readonly
                disabled
              />
            </div>
            <div className="mb-5">
              <p className="form__label">Telefone*</p>
              <InputMask
                mask="(99) 9 9999-9999"
                value={values.phone}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  setFieldValue("phone", rawValue);
                }}
                onBlur={handleBlur}
              >
                {() => (
                  <Field
                    type="text"
                    name="phone"
                    placeholder="(00) 0 0000-0000"
                    className="form__input"
                  />
                )}
              </InputMask>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5">
              <p className="form__label">Bio*</p>
              <Field
                type="text"
                name="bio"
                placeholder="Biografia"
                className="form__input"
                maxLength={100}
              />
              <ErrorMessage
                name="bio"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <div className="grid grid-cols-4 gap-5 mb-[30px]">
                <div>
                  <p className="form__label">Gênero*</p>
                  <Field
                    as="select"
                    name="gender"
                    className="form__input py-3.5"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outros">Outros</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <p className="form__label">Especialização*</p>
                  <Field
                    as="select"
                    name="specialization"
                    className="form__input py-3.5"
                  >
                    <option value="">Selecione</option>
                    <option value="Cardiologista">Cardiologista</option>
                    <option value="Dermatologista">Dermatologista</option>
                    <option value="Endocrinologista">Endocrinologista</option>
                    <option value="Psicólogo">Psicólogo</option>
                    <option value="Developer">Developer</option>
                    <option value="Outros">Outro</option>
                  </Field>
                  <ErrorMessage
                    name="specialization"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <p className="form__label">Preço*</p>
                  <NumericFormat
                    value={values.ticketPrice}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    placeholder="Preço da consulta"
                    prefix="R$ "
                    onValueChange={(val) => {
                      // console.log("Formatted ticketPrice:", val);
                      setFieldValue("ticketPrice", val.value);
                    }}
                    customInput={Field}
                    name="ticketPrice"
                    className="form__input"
                  />
                  <ErrorMessage
                    name="ticketPrice"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-5">
                  <p className="form__label">Telemedicina*</p>
                  <Field
                    as="select"
                    name="isAvailableForTelemedicine"
                    className="form__input py-3.5"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </Field>
                  <ErrorMessage
                    name="isAvailableForTelemedicine"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <p className="form__label">Qualificações*</p>
              <FieldArray name="qualifications">
                {({ push, remove }) => (
                  <>
                    {values.qualifications.length > 0 &&
                      values.qualifications.map((qualification, index) => (
                        <div key={index} className="mb-4">
                          <div className="grid grid-cols-2 gap-5">
                            <div>
                              <p className="form__label">Data de Início*</p>
                              <Field
                                type="date"
                                name={`qualifications[${index}].startingDate`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`qualifications[${index}].startingDate`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Data de Término*</p>
                              <Field
                                type="date"
                                name={`qualifications[${index}].endingDate`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`qualifications[${index}].endingDate`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Graduação*</p>
                              <Field
                                type="text"
                                name={`qualifications[${index}].degree`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`qualifications[${index}].degree`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Universidade*</p>
                              <Field
                                type="text"
                                name={`qualifications[${index}].university`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`qualifications[${index}].university`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div className="flex items-center">
                              <button
                                type="button"
                                className="text-red-500"
                                onClick={() => remove(index)}
                              >
                                <AiOutlineDelete size={24} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="text-blue-500 text-[17px]"
                      onClick={() =>
                        push({
                          startingDate: "",
                          endingDate: "",
                          degree: "",
                          university: "",
                        })
                      }
                    >
                      + Adicionar Qualificação
                    </button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className="mb-5">
              <p className="form__label">Experiências*</p>
              <FieldArray name="experiences">
                {({ push, remove }) => (
                  <>
                    {values.experiences.length > 0 &&
                      values.experiences.map((experience, index) => (
                        <div key={index} className="mb-4">
                          <div className="grid grid-cols-2 gap-5">
                            <div>
                              <p className="form__label">Data de Início*</p>
                              <Field
                                type="date"
                                name={`experiences[${index}].startingDate`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`experiences[${index}].startingDate`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Data de Término*</p>
                              <Field
                                type="date"
                                name={`experiences[${index}].endingDate`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`experiences[${index}].endingDate`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Cargo*</p>
                              <Field
                                type="text"
                                name={`experiences[${index}].position`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`experiences[${index}].position`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Lugar*</p>
                              <Field
                                type="text"
                                name={`experiences[${index}].place`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`experiences[${index}].place`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div className="flex items-center">
                              <button
                                type="button"
                                className="text-red-500"
                                onClick={() => remove(index)}
                              >
                                <AiOutlineDelete size={24} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="text-blue-500 text-[17px]"
                      onClick={() =>
                        push({
                          startingDate: "",
                          endingDate: "",
                          position: "",
                          place: "",
                        })
                      }
                    >
                      + Adicionar Experiência
                    </button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className="mb-5">
              <p className="form__label">Horários Disponíveis*</p>
              <FieldArray name="weekDayTimeSlots">
                {({ push, remove }) => (
                  <>
                    {values.weekDayTimeSlots.length > 0 &&
                      values.weekDayTimeSlots.map((timeSlot, index) => (
                        <div key={index} className="mb-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            <div>
                              <p className="form__label">Dia*</p>
                              <Field
                                as="select"
                                name={`weekDayTimeSlots[${index}].day`}
                                className="form__input"
                              >
                                <option value={null}>Dia</option>
                                <option value="Domingo">Domingo</option>
                                <option value="Segunda-Feira">
                                  Segunda-Feira
                                </option>
                                <option value="Terça-Feira">Terça-Feira</option>
                                <option value="Quarta-Feira">
                                  Quarta-Feira
                                </option>
                                <option value="Quinta-Feira">
                                  Quinta-Feira
                                </option>
                                <option value="Sexta-Feira">Sexta-Feira</option>
                                <option value="Sábado">Sábado</option>
                              </Field>
                              <ErrorMessage
                                name={`weekDayTimeSlots[${index}].day`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Hora de Início*</p>
                              <Field
                                type="time"
                                name={`weekDayTimeSlots[${index}].startingTime`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`weekDayTimeSlots[${index}].startingTime`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div>
                              <p className="form__label">Hora de Término*</p>
                              <Field
                                type="time"
                                name={`weekDayTimeSlots[${index}].endingTime`}
                                className="form__input"
                              />
                              <ErrorMessage
                                name={`weekDayTimeSlots[${index}].endingTime`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                            <div className="flex items-center">
                              <button
                                type="button"
                                className="text-red-500"
                                onClick={() => remove(index)}
                              >
                                <AiOutlineDelete size={24} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="text-blue-500 text-[17px]"
                      onClick={() =>
                        push({ day: "", startingTime: "", endingTime: "" })
                      }
                    >
                      + Adicionar Horário
                    </button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className="mb-5">
              <p className="form__label">Sobre*</p>
              <Field
                component="textarea"
                rows={5}
                type="text"
                name="about"
                placeholder="Escreva sobre você"
                className="form__input"
                maxLength={1000}
              />
              <ErrorMessage
                name="about"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5">
              <p className="form__label text-headingColor">Atualizar Foto</p>
              <input
                type="file"
                name="photo"
                onChange={(event) =>
                  handleFileInputChange(event, setFieldValue)
                }
                className="form__input"
              />
            </div>

            <button
              type="submit"
              // disabled={!isSubmitting}
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Atualizar Perfil
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
