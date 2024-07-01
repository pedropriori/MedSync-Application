import { Link } from "react-router-dom";

const CheckoutCancelled = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-red-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12 0C5.371 0 0 5.371 0 12s5.371 12 12 12 12-5.371 12-12S18.629 0 12 0zm5.657 16.657a1 1 0 01-1.414 1.414L12 13.414l-4.243 4.243a1 1 0 01-1.414-1.414L10.586 12 6.343 7.757a1 1 0 011.414-1.414L12 10.586l4.243-4.243a1 1 0 011.414 1.414L13.414 12l4.243 4.243z"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Pagamento Cancelado!
          </h3>
          <p className="text-gray-500 my-2">
            Você cancelou seu pagamento. Nenhuma cobrança foi realizada.
          </p>
          <p> Tente novamente mais tarde. </p>
          <div className="py-10 text-center">
            <Link
              to="/home"
              className="px-12 bg-primaryBgColor text-white font-semibold py-3"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancelled;
