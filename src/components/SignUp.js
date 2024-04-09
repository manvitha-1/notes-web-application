// // import React from "react";
// // const SignUp = () => {
// //     return (
// //         <div>
// //             welcome to signup page
// //         </div>
// //     );
// // }
// // export default SignUp;


// const SignUp = ({ handleLoginClick }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle sign-up submission
//     console.log("Name:", name);
//     console.log("Email:", email);
//     console.log("Password:", password);
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-form">
//         <h2>
//           <center>Sign Up Here</center>
//         </h2>
//         <br />
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className="btn btn-dark" type="submit">
//             Sign Up
//           </button>
//         </form>
//         <hr />
//         <div className="login-link">
//           <p>
//             Already have an account?{" "}
//             <span onClick={handleLoginClick}>Log in</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// import React, { useState } from "react";
// import "./SignUp.css"; // Import the CSS file for sign-up form styling
// import Swal from 'sweetalert2';
// import Login from "./Login.js";

// const SignUp = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         // Send a POST request to the backend API endpoint for sign-up
//         const response = await fetch("http://localhost:5000/api/signup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ email, password })
//         });
//         const data = await response.json();
//         if (response.ok) {
//             Swal.fire('SUCCESS', 'Account created succefully', 'success');
//           console.log("User created successfully");
//           handleLoginClick(); // Navigate to login page
//         } else {
//           // If sign-up fails, display an error message
//           console.error("Failed to create user:", data.message);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     const handleLoginClick = () => {
//         <Login/>
//     }
//     return (
//       <div className="signup-container">
//         <div className="signup-form">
//           <h2>
//             <center>Sign Up Here</center>
//           </h2>
//           <br />
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button className="btn btn-dark" type="submit">
//               Sign Up
//             </button>
//           </form>
//           <hr />
//           <div className="login-link">
//             <p>
//               Already have an account?{" "}
//               <span onClick={handleLoginClick}>Log in</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default SignUp;

import "./SignUp.css"; 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; 
import Swal from 'sweetalert2';

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            Swal.fire('SUCCESS', 'Account created successfully', 'success');
            console.log("User created successfully");
            props.setLoggedIn(false);
            props.setShowSignUp(false);
        } else {
          Swal.fire('INVALID', 'User already exists', 'error');
          console.error("Failed to create user:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <div className="signup-container">
        <div className="signup-form">
          <h2>
            <center>Sign Up Here</center>
          </h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-dark" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

export default SignUp;
