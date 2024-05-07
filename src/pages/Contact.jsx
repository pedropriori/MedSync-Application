

const Contact = () => {
  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center'>
          Contate-nos
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text__para'>
          Teve algum problema técnico? Deseja enviar feedback sobre um recurso beta? Informe-nos.
        </p>
        <form action="#" className='space-y-8'>
          <div>
            <label htmlFor="email" className='form__label'>Seu Email</label>
            <input 
              type="email"
              id='email'
              placeholder='example@email.com'
              className='form__input mt-1'
            />
          </div>

          <div>
            <label htmlFor="subject" className='form__label'>Assunto</label>
            <input 
              type="text"
              id='subject'
              placeholder='Deixe-nos saber como podemos te ajudar'
              className='form__input mt-1'
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className='form__label'>Sua Mensagem</label>
            <textarea
              rows='6'
              type="text"
              id='message'
              placeholder='Faça um comentário...'
              className='form__input mt-1'
            />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            Enviar
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact