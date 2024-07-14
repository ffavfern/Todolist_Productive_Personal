import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await axios.post('http://localhost:5000/api/auth/register', { username, password });
     navigate('/login');
   } catch (err) {
     console.error('Registration error', err);
   }
 };

 return (
   <div>
     <h1 className="text-3xl font-bold mb-6">Register</h1>
     <form onSubmit={handleSubmit}>
       <div className="form-control mb-4">
         <label className="label">
           <span className="label-text">Username</span>
         </label>
         <input
           type="text"
           className="input input-bordered"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
         />
       </div>
       <div className="form-control mb-4">
         <label className="label">
           <span className="label-text">Password</span>
         </label>
         <input
           type="password"
           className="input input-bordered"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
       </div>
       <button type="submit" className="btn btn-primary">Register</button>
     </form>
   </div>
 );
};

export default Register;
