// import React, { useState, useEffect } from 'react';
// import './Login.css';
// import Swal from 'sweetalert2';
// import LoginForm from './LoginForm';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('loggedIn');
//     if (isLoggedIn === 'true') {
//       setLoggedIn(true);
//     }
//   }, []);  

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log(email + ' ' + password);
//     let data = await fetch('http://localhost:5000/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: email, password: password }),
//     });
//     data = await data.json();
//     if (data.valid === true) {
//       Swal.fire('SUCCESS', 'username and password', 'success');
//       setLoggedIn(true);
//       localStorage.setItem('loggedIn', 'true');
//       localStorage.setItem('userEmail', email); // Save the user's email in localStorage
//     } else {
//       Swal.fire('INVALID', 'username or password', 'error');
//     }
//     console.table(await data);
//   };
  
//   const handleLogout = () => {
//     setLoggedIn(false);
//     localStorage.removeItem('loggedIn');
//   };

//   return (
//     <div className="login-container">
//       {!loggedIn ? (
//         <div className="login-form">
//           <h2><center>Login Here</center></h2>
//           <br/>
//           <form>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button className="btn btn-dark" type="submit" onClick={handleLogin}>
//               Log In
//             </button>
//           </form>
//           <hr />
//           <div className="create-account">
//             <p>
//               Don't have an account? <a href="/">Sign up</a>
//             </p>
//           </div>
//         </div>
//       ) : (
//         <LoginForm handleLogout={handleLogout} userEmail={localStorage.getItem('userEmail')} />
//       )}
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from 'react';
import './Login.css';
import Swal from 'sweetalert2';
import LoginForm from './LoginForm';
import SignUp from './SignUp'; // Assuming SignUp component exists

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // State to control rendering of SignUp

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []);  

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email + ' ' + password);
    let data = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });
    data = await data.json();
    if (data.valid === true) {
      Swal.fire('SUCCESS', 'Logged in Successfully', 'success');
      setLoggedIn(true);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userEmail', email); // Save the user's email in localStorage
    } else {
      Swal.fire('INVALID', 'Invalid Credentials', 'error');
    }
    console.table(await data);
  };
  
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <div className="login-container">
      {!loggedIn && !showSignUp ? (
        <div className="login-form">
          <h2><center>Login Here</center></h2>
          <br/>
          <form>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-dark" type="submit" onClick={handleLogin}>
              Log In
            </button>
          </form>
          <hr />
          <div className="create-account">
            <p>
              Don't have an account? <span className="signup-link" onClick={handleSignUpClick}>Sign up</span>
            </p>
          </div>
        </div>
      ) : !loggedIn ? (
        <SignUp setLoggedIn={setLoggedIn} setShowSignUp={setShowSignUp}/>
      ) : (
        <LoginForm handleLogout={handleLogout} userEmail={localStorage.getItem('userEmail')} />
      )}
    </div>
  );
};

export default Login;
