import { useState } from 'react';
import '../style.css';

const UsersForm = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });

  const { username, email, phone, role, password } = input;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (username === '' || email === '' || role === '' || password === '') {
      alert('Please fill in all the fields');
      return; // Stop form submission
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return; // Stop form submission
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return; // Stop form submission
    }

    if(username.length < 4){
      alert("User name must be at least 3 characters long");
      return;
    }

    const res = await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, phone, role, password }),
    });
    if (res) {
      alert('One Data inserted');
      setInput({
        username: '',
        email: '',
        phone: '',
        role: '',
        password: '',
      });
    }
  };

  return (
    <div className='main__content'>
      <div className='product'>
        <form>
          <div className='name'>
            <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
              placeholder='User Name'
              required
            />
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleChange}
              placeholder='User Email *'
              required
            />
            <input
              type='text'
              name='phone'
              value={phone}
              onChange={handleChange}
              placeholder='user phone*'
              required
            />
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              placeholder=' user password*'
              required
            />
            <select name='role' value={role} onChange={handleChange}>
              <option>Please Select the Role</option>
              <option value='SuperAdmin'>SuperAdmin</option>
              <option value='Admin'>Admin</option>
              <option value='Member'>Member</option>
            </select>
            <button type='submit' onClick={handleClick}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersForm;
