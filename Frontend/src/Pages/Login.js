// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [registerName, setRegisterName] = useState('');
//   const [registerEmail, setRegisterEmail] = useState('');
//   const [registerPassword, setRegisterPassword] = useState('');
//   const [registerAge, setRegisterAge] = useState('');
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false);
//   const [registerError, setRegisterError] = useState('');
//   const [registerSuccess, setRegisterSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const response = await fetch('https://whiteboard-ftu8.onrender.com/user/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
      
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }
      
//       localStorage.setItem('token', data.token);
//       navigate('/canvasList');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setRegisterError('');
//     setRegisterSuccess('');
    
//     try {
//       const response = await fetch('https://whiteboard-ftu8.onrender.com/user/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           name: registerName,
//           email: registerEmail,
//           password: registerPassword,
//           age: registerAge
//         })
//       });
      
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }
      
//       setRegisterSuccess('Registration successful! You can now login.');
//       // Clear form fields after successful registration
//       setRegisterName('');
//       setRegisterEmail('');
//       setRegisterPassword('');
//       setRegisterAge('');
      
//       // Close modal after a delay
//       setTimeout(() => {
//         setShowRegisterModal(false);
//         setRegisterSuccess('');
//       }, 3000);
      
//     } catch (err) {
//       setRegisterError(err.message);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.loginContainer}>
//         <h2>Login</h2>
//         {error && <p style={styles.errorMessage}>{error}</p>}
//         <form onSubmit={handleLogin} style={styles.loginForm}>
//           <input 
//             type="email" 
//             placeholder="Email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//             style={styles.inputField}
//           />
//           <div style={styles.passwordContainer}>
//             <input 
//               type={showPassword ? 'text' : 'password'} 
//               placeholder="Password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//               style={styles.inputField}
//             />
//             <span 
//               onClick={() => setShowPassword(!showPassword)} 
//               style={styles.eyeIcon}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           <button type="submit" style={styles.loginButton}>Login</button>
//           <div style={styles.registerPrompt}>
//             <span>Don't have an account?</span>
//             <button 
//               type="button" 
//               onClick={() => setShowRegisterModal(true)}
//               style={styles.signUpButton}
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Registration Modal */}
//       {showRegisterModal && (
//         <div style={styles.modalBackdrop}>
//           <div style={styles.modalContent}>
//             <div style={styles.modalHeader}>
//               <h2>Create Account</h2>
//               <button 
//                 style={styles.closeButton} 
//                 onClick={() => setShowRegisterModal(false)}
//               >
//                 <FaTimes />
//               </button>
//             </div>
//             {registerError && <p style={styles.errorMessage}>{registerError}</p>}
//             {registerSuccess && <p style={styles.successMessage}>{registerSuccess}</p>}
//             <form onSubmit={handleRegister} style={styles.registerForm}>
//               <div style={styles.formGroup}>
//                 <label htmlFor="name">Name</label>
//                 <input 
//                   id="name"
//                   type="text" 
//                   placeholder="Enter your name" 
//                   value={registerName} 
//                   onChange={(e) => setRegisterName(e.target.value)} 
//                   style={styles.inputField}
//                 />
//               </div>
              
//               <div style={styles.formGroup}>
//                 <label htmlFor="email">Email <span style={styles.requiredStar}>*</span></label>
//                 <input 
//                   id="email"
//                   type="email" 
//                   placeholder="Enter your email" 
//                   value={registerEmail} 
//                   onChange={(e) => setRegisterEmail(e.target.value)} 
//                   required 
//                   style={styles.inputField}
//                 />
//               </div>
              
//               <div style={styles.formGroup}>
//                 <label htmlFor="password">Password <span style={styles.requiredStar}>*</span></label>
//                 <div style={styles.passwordContainer}>
//                   <input 
//                     id="password"
//                     type={showRegisterPassword ? 'text' : 'password'} 
//                     placeholder="Create a password" 
//                     value={registerPassword} 
//                     onChange={(e) => setRegisterPassword(e.target.value)} 
//                     required 
//                     style={styles.inputField}
//                   />
//                   <span 
//                     onClick={() => setShowRegisterPassword(!showRegisterPassword)} 
//                     style={styles.eyeIcon}
//                   >
//                     {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
//                   </span>
//                 </div>
//               </div>
              
//               <div style={styles.formGroup}>
//                 <label htmlFor="age">Age</label>
//                 <input 
//                   id="age"
//                   type="number" 
//                   placeholder="Enter your age" 
//                   value={registerAge} 
//                   onChange={(e) => setRegisterAge(e.target.value)} 
//                   min="1"
//                   max="120"
//                   style={styles.inputField}
//                 />
//               </div>
              
//               <button type="submit" style={styles.registerButton}>Create Account</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh'
//   },
//   loginContainer: {
//     width: '300px',
//     margin: '50px auto',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     backgroundColor: 'white'
//   },
//   loginForm: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px'
//   },
//   inputField: {
//     padding: '10px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     width: '100%'
//   },
//   passwordContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     position: 'relative'
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: '10px',
//     cursor: 'pointer'
//   },
//   loginButton: {
//     padding: '10px',
//     border: 'none',
//     borderRadius: '5px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//     fontWeight: 'bold'
//   },
//   errorMessage: {
//     color: 'red',
//     margin: '10px 0'
//   },
//   successMessage: {
//     color: 'green',
//     margin: '10px 0'
//   },
//   registerPrompt: {
//     marginTop: '15px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: '10px'
//   },
//   signUpButton: {
//     backgroundColor: 'transparent',
//     border: 'none',
//     color: '#007bff',
//     cursor: 'pointer',
//     fontWeight: 'bold',
//     padding: '5px',
//     textDecoration: 'underline'
//   },
//   modalBackdrop: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     padding: '20px',
//     width: '90%',
//     maxWidth: '400px',
//     maxHeight: '90vh',
//     overflow: 'auto',
//     position: 'relative',
//     boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)'
//   },
//   modalHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '15px',
//     borderBottom: '1px solid #eee',
//     paddingBottom: '10px'
//   },
//   closeButton: {
//     backgroundColor: 'transparent',
//     border: 'none',
//     fontSize: '20px',
//     cursor: 'pointer',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '5px',
//     borderRadius: '50%',
//     width: '30px',
//     height: '30px',
//     transition: 'background-color 0.2s',
//     hover: {
//       backgroundColor: '#f0f0f0'
//     }
//   },
//   registerForm: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px'
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     textAlign: 'left',
//     gap: '5px'
//   },
//   requiredStar: {
//     color: 'red'
//   },
//   registerButton: {
//     padding: '12px',
//     border: 'none',
//     borderRadius: '5px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     cursor: 'pointer',
//     marginTop: '10px',
//     fontWeight: 'bold',
//     transition: 'background-color 0.3s'
//   }
// };

// export default Login;




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, X, Palette, Users, Zap, Sparkles } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerAge, setRegisterAge] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('https://whiteboard-ftu8.onrender.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      navigate('/canvasList');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');
    
    try {
      const response = await fetch('https://whiteboard-ftu8.onrender.com/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          age: registerAge
        })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setRegisterSuccess('Registration successful! You can now login.');
      // Clear form fields after successful registration
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterAge('');
      
      // Close modal after a delay
      setTimeout(() => {
        setShowRegisterModal(false);
        setRegisterSuccess('');
      }, 3000);
      
    } catch (err) {
      setRegisterError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-100 to-pink-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            WhiteBoard
          </h1>
          <p className="text-gray-600 text-lg">Create, collaborate, and bring ideas to life</p>
        </div>

        {/* Features showcase */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Collaborate</p>
          </div>
          <div className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
            <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Fast & Easy</p>
          </div>
          <div className="text-center p-3 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
            <Sparkles className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-xs text-gray-600">Creative</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your whiteboards</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setShowRegisterModal(true)}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-auto shadow-2xl border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-600 mt-1">Join the creative community</p>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {registerError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium text-center">{registerError}</p>
              </div>
            )}

            {registerSuccess && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-600 text-sm font-medium text-center">{registerSuccess}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showRegisterPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  value={registerAge}
                  onChange={(e) => setRegisterAge(e.target.value)}
                  min="1"
                  max="120"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 mt-6"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;