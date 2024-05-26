export const useViaCep = () => {
  const getAddress = async (cep) => {
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    console.log(resp.data);

    return {
      logradouro: resp.data.logradouro,
      cep: cep,
      bairro: resp.data.bairro,
      estado: resp.data.uf,
    };
  };

  return { getAddress };
};
