

const SidePanel = () => {
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text__para mt-0 font-semibold'>
          Preço da Consulta
        </p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          R$499,99
        </span>
      </div>

      <div className="mt-[30px]">
        <p className='text__para mt-0 font-semibold text-headingColor'>
          Horários Disponíveis:
        </p>
        <ul className='mt-3'>
          <li className='flex items-center justify-between mb-2'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Domingo
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Fechado
            </p>
          </li>

          <li className='flex items-center justify-between mb-2'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Segunda-Feira
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              8:00 - 18:00
            </p>
          </li>

          <li className='flex items-center justify-between mb-2'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Terça-Feira
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              8:00 - 18:00
            </p>
          </li>

          <li className='flex items-center justify-between mb-2'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Quarta-Feira
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              8:00 - 18:00
            </p>
          </li>

          <li className='flex items-center justify-between mb-2'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Quinta-Feira
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              8:00 - 18:00
            </p>
          </li>

          <li className='flex items-center justify-between mb-2'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Sexta-Feira
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              8:00 - 18:00
            </p>
          </li>

          <li className='flex items-center justify-between mb-2'>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Sábado
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              Fechado
            </p>
          </li>

        </ul>
      </div>

      <button className='btn px-2 w-full rounded-md'>
        Agendar Consulta
      </button>
    </div>
  )
}

export default SidePanel