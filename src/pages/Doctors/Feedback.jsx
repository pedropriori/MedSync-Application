import { AiFillStar } from 'react-icons/ai'
import avatar from '../../assets/images/avatar-icon.png'
import { formateDate } from '../../utils/formateDate'
import { useState } from 'react'
import FeedbackForm from './FeedbackForm'

const Feedback = () => {

  const [showFeedbackForm, setShowFeedbakcForm] = useState(false)

  return (
    <div>
      <div className='mb-[50px]'>
        <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>
          Todos os comentários (52)
        </h4>

        <div className='flex justify-between gap-10 mb-[30px]'>
          <div className='flex gap-3'>
            <figure className='w-10 h-10 rounded-full'>
              <img src={avatar} alt="avatar-icon" className='w-full'/>
            </figure>

            <div>
              <h5 className='text-[16px] leading-6 text-primaryBgColor font-bold'>
                José Andrade
              </h5>
              <p className='text-[14px] leading-6 text-textColor'>
                {formateDate('02-14-2024')}
              </p>
              <p className='text__para mt-3 font-medium text-[15px]'>
                Ótima pessoa e profissional, recomendo fortemente 👍
              </p>
            </div>
          </div>

          <div className='flex gap-1'>
            {[...Array(5).keys()].map((_,index) => 
              <AiFillStar key={index} color='#0067FF'/>
            )}
          </div>
        </div>
      </div>

      {!showFeedbackForm && 
      <div className='text-center'>
        <button className="btn" onClick={() => setShowFeedbakcForm(true)}>
          Dê seu feedback
        </button>
      </div>
      }

      {showFeedbackForm && <FeedbackForm />}
    </div>
  )
}

export default Feedback