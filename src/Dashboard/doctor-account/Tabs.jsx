/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import useGetProfile from "../../hooks/useFetchData";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const [showMenu, setShowMenu] = useState(false); // Estado para controlar a exibição do menu
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const { data } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  const handleDeleteAccount = async () => {
    const doctorId = data._id;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      dispatch({ type: "LOGOUT" });
      toast.success("Conta deletada com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(
        "Ocorreu um erro ao excluir a conta. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div>
      <span className="lg:hidden" onClick={() => setShowMenu(!showMenu)}>
        {" "}
        {/* Adiciona um evento onClick para alternar a exibição do menu */}
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div
        className={`lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md ${
          showMenu ? "block" : "hidden"
        }`}
      >
        {" "}
        {/* Adiciona a classe 'block' ou 'hidden' com base no estado showMenu */}
        {/* Overview button */}
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryBgColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Geral
        </button>
        {/* Appointments button */}
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryBgColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Consultas
        </button>
        {/* Address Tab */}
        <button
          onClick={() => setTab("address")}
          className={`${
            tab === "address"
              ? "bg-indigo-100 text-primaryBgColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Endereço
        </button>
        {/* Settings button */}
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryBgColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Perfil
        </button>
        {/* Schudule Tab */}
        <button
          onClick={() => setTab("schudules")}
          className={`${
            tab === "schudules"
              ? "bg-indigo-100 text-primaryBgColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Agenda
        </button>
        <div className="mt-[100px] w-full">
          <button
            className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
            onClick={handleLogout}
          >
            Sair
          </button>
          <button
            className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
            onClick={() => setShowConfirm(true)}
          >
            Excluir conta
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md">
            <h2 className="text-lg font-semibold mb-4">
              Tem certeza que deseja excluir sua conta?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 p-2 rounded-md mr-4"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white p-2 rounded-md"
                onClick={handleDeleteAccount}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabs;
