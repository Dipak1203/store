import '../style.css'
import { NavLink } from "react-router-dom";
import { Container } from 'react-bootstrap';
const CustomerForm = () => {
  return (
    <div className="product">
      <Container fluid className="mb-5 py-3 shadow-lg">
          <div className="d-flex justify-content-between align-items-center cursor-pointer ">
            <h5>ADMIN</h5>
            <img src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png" className="image_avatar" />
          </div>
      </Container>
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