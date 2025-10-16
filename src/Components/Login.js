// // AuthModal.js
// import React, { useState, useTransition } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";

// const AuthModal = ({ setOpen, onSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     password_confirm: "",
//   });
//   const [toast, setToast] = useState({ message: "", type: "" });
//   const [loading, setLoading] = useState(false);
//   const [isPending, startTransition] = useTransition(); 


//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // AuthModal.js के अंदर

// const showToast = (message, type) => {
//     // ✅ State Update को startTransition में लपेटें
//     startTransition(() => {
//         setToast({ message, type });
//     });
    
//     // Toast को छिपाने का timeout
//     setTimeout(() => {
//         startTransition(() => {
//             setToast({ message: "", type: "" });
//         });
//     }, 3000);
// };

//  // ===== LOGIN =====
// const handleLogin = async () => {
//   if (!formData.email || !formData.password) return;
//   setLoading(true);

//   try {
//     const res = await axios.post(
//       "http://91.108.105.41:8000/api/auth/login/",
//       { email: formData.email, password: formData.password }
//     );
//       console.log("Login Success Data (res.data):", res.data);
//     console.log("Customer Object:", res.data.customer);

//     console.log("Login response:", res.data);

//     const token = res.data.tokens?.access; // ✅ access token inside tokens object
//     if (!token) throw new Error("No token received from server");

//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(res.data.customer)); // customer object

//     showToast("Login Successful!", "success");
//     setTimeout(() => {
//       setOpen(false);
//       onSuccess && onSuccess(res.data.customer);
//     }, 500);
//   } catch (err) {
//     console.error("Login error:", err.response?.data || err.message);
//     const msg =
//       err.response?.data?.detail ||
//       Object.values(err.response?.data || {}).flat().join(" ") ||
//       err.message ||
//       "Login failed";
//     showToast(msg, "error");
//   } finally {
//     setLoading(false);
//   }
// };


//   // ===== SIGNUP =====
//   const handleSignup = async () => {
//   const { first_name, last_name, email, password, password_confirm } = formData;
//   if (!first_name || !last_name || !email || !password || !password_confirm) return;

//   setLoading(true);

//   try {
//     // 1️⃣ Register user
//     await axios.post("http://91.108.105.41:8000/api/auth/register/", {
//       first_name,
//       last_name,
//       email,
//       password,
//       password_confirm,
//     });

//     // 2️⃣ Automatically log them in
//     const loginRes = await axios.post("http://91.108.105.41:8000/api/auth/login/", {
//       email,
//       password,
//     });

//     const token = loginRes.data.tokens?.access;
//     if (!token) throw new Error("No token received after signup");

//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(loginRes.data.customer));

//     showToast("Signup Successful!", "success");
//     setTimeout(() => {
//       setOpen(false);
//       onSuccess && onSuccess(loginRes.data.customer);
//     }, 500);
//   } catch (err) {
//     console.error("Signup error:", err.response?.data || err.message);
//     const data = err.response?.data;
//     const msg = data
//       ? Object.values(data).flat().join(" ")
//       : err.message || "Signup failed";
//     showToast(msg, "error");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 relative"
//         >
//           <button
//             onClick={() => setOpen(false)}
//             className="absolute top-3 right-3 text-gray-800 hover:text-gray-500 text-2xl font-bold"
//           >
//             ✕
//           </button>

//           {toast.message && (
//             <motion.div
//               initial={{ opacity: 0, y: -30 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -30 }}
//               className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center space-x-2 ${
//                 toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
//               }`}
//             >
//               {toast.type === "success" ? "✅" : "❌"} {toast.message}
//             </motion.div>
//           )}

//           <h2 className="text-2xl font-bold text-center mb-6">
//             {isLogin ? "Welcome Back" : "Create Account"}
//           </h2>

//           {isLogin ? (
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleLogin();
//               }}
//               className="space-y-4"
//             >
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-black text-white py-2 rounded-xl"
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//               <p className="text-center text-xs text-gray-700">
//                 Don’t have an account?{" "}
//                 <span
//                   onClick={() => setIsLogin(false)}
//                   className="text-black font-semibold cursor-pointer hover:underline"
//                 >
//                   Sign Up
//                 </span>
//               </p>
//             </form>
//           ) : (
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSignup();
//               }}
//               className="space-y-4"
//             >
//               <input
//                 type="text"
//                 name="first_name"
//                 placeholder="First Name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl"
//               />
//               <input
//                 type="text"
//                 name="last_name"
//                 placeholder="Last Name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl"
//               />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl"
//               />
//               <input
//                 type="password"
//                 name="password_confirm"
//                 placeholder="Confirm Password"
//                 value={formData.password_confirm}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-black text-white py-2 rounded-xl"
//               >
//                 {loading ? "Signing up..." : "Sign Up"}
//               </button>
//               <p className="text-center text-xs text-gray-700">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => setIsLogin(true)}
//                   className="text-black font-semibold cursor-pointer hover:underline"
//                 >
//                   Login
//                 </span>
//               </p>
//             </form>
//           )}
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default AuthModal;




// AuthModal.js
import React, { useState, useTransition } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const AuthModal = ({ setOpen, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  
  // ✅ useTransition hook: State Updates को कम-प्राथमिकता देने के लिए
  const [isPending, startTransition] = useTransition(); 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const showToast = (message, type) => {
    // Note: Toast state update छोटा है, इसे startTransition में लपेटने की आवश्यकता नहीं है, 
    // लेकिन हम इसे केवल मुख्य State Updates पर केंद्रित रखेंगे।
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000); 
  };

  // ===== LOGIN =====
  const handleLogin = async () => {
    if (!formData.email || !formData.password) return;
    setLoading(true);

    try {
      const res = await axios.post(
        "http://91.108.105.41:8000/api/auth/login/",
        { email: formData.email, password: formData.password }
      );

      const token = res.data.tokens?.access;
      if (!token) throw new Error("No token received from server");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data.customer));

      showToast("Login Successful!", "success");
      
      // 🚨 FIX: setTimeout हटाया गया। State Update अब तुरंत startTransition में होता है।
      // यह React को बताता है कि मोडल बंद करना (setOpen) और parent state (onSuccess) अपडेट करना 
      // पृष्ठभूमि का काम है, जो Concurrent Mode को बाधित नहीं करेगा।
      startTransition(() => {
          setOpen(false);
          onSuccess && onSuccess(res.data.customer);
      });

    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      const msg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).flat().join(" ") ||
        err.message ||
        "Login failed";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };


  // ===== SIGNUP =====
  const handleSignup = async () => {
    const { first_name, last_name, email, password, password_confirm } = formData;
    if (!first_name || !last_name || !email || !password || !password_confirm) return;

    setLoading(true);

    try {
      // 1️⃣ Register user
      await axios.post("http://91.108.105.41:8000/api/auth/register/", {
        first_name,
        last_name,
        email,
        password,
        password_confirm,
      });

      // 2️⃣ Automatically log them in
      const loginRes = await axios.post("http://91.108.105.41:8000/api/auth/login/", {
        email,
        password,
      });

      const token = loginRes.data.tokens?.access;
      if (!token) throw new Error("No token received after signup");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.customer));

      showToast("Signup Successful!", "success");
      
      // 🚨 FIX: setTimeout हटाया गया। State Update अब तुरंत startTransition में होता है।
      startTransition(() => {
          setOpen(false);
          onSuccess && onSuccess(loginRes.data.customer);
      });

    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      const data = err.response?.data;
      const msg = data
        ? Object.values(data).flat().join(" ")
        : err.message || "Signup failed";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl w-[400px] max-w-[90%] p-8 relative ${
            isPending ? "opacity-70" : "" 
          }`} 
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-800 hover:text-gray-500 text-2xl font-bold"
          >
            ✕
          </button>

          {/* Toast Renders Here */}
          {toast.message && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center space-x-2 ${
                toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
            >
              {toast.type === "success" ? "✅" : "❌"} {toast.message}
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {/* ... Login Form ... */}
          {/* ... Signup Form ... */}

          {/* Login Form */}
          {isLogin ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4"
            >
              {/* ... input fields ... */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <button
                type="submit"
                disabled={loading || isPending}
                className="w-full bg-black text-white py-2 rounded-xl"
              >
                {loading || isPending ? "Processing..." : "Login"}
              </button>
              <p className="text-center text-xs text-gray-700">
                Don’t have an account?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-black font-semibold cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </p>
            </form>
          ) : (
            /* Signup Form */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
              className="space-y-4"
            >
                {/* ... input fields ... */}
                <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <input
                type="password"
                name="password_confirm"
                placeholder="Confirm Password"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <button
                type="submit"
                disabled={loading || isPending}
                className="w-full bg-black text-white py-2 rounded-xl"
              >
                {loading || isPending ? "Processing..." : "Sign Up"}
              </button>
              <p className="text-center text-xs text-gray-700">
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-black font-semibold cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
