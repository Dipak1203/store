import '../style.css'
import { NavLink } from "react-router-dom";

const CustomerForm = () => {
  return (
    <div className="product">
      <form>
        <div className='name'>
          <div className='name2'>
            <input type='text' placeholder='First Name*' required />
            <input type='text' placeholder='Last Name*' required />
          </div>
          <input type='email' placeholder='Email *' required />
          <input type='date' placeholder='Birth*' required />
          <input type='text' placeholder='Address *' required />
            <input type='text' placeholder='City*' required />
          <div className='name2'>
            <input type='text' placeholder='State*' required />
            <input type='number' placeholder='Zip code *' required />
          </div>
          <input type='file' />
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default CustomerForm