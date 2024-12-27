import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";

export const Login = () => {

     const navigate = useNavigate();
     const { login } = AuthData();

     // useReducer to manage form data (username and password)
     const [ formData, setFormData ] = useReducer(
          (formData, newItem) => ({ ...formData, ...newItem }),
          { userName: "", password: "" }
     );

     const [ errorMessage, setErrorMessage ] = useState(null);

     // Function to handle login when the button is clicked
     const doLogin = async () => {
          try {
               // Call the login function from AuthWrapper
               await login(formData.userName, formData.password);
               navigate("/account");  // Navigate to account page after successful login
          } catch (error) {
               setErrorMessage(error.message);  // Set the error message to display
          }
     };

     return (
          <div className="page">
               <h2>Login page</h2>
               <div className="inputs">
                    <div className="input">
                         <input
                              value={formData.userName}
                              onChange={(e) => setFormData({ userName: e.target.value })}
                              type="text"
                         />
                    </div>
                    <div className="input">
                         <input
                              value={formData.password}
                              onChange={(e) => setFormData({ password: e.target.value })}
                              type="password"
                         />
                    </div>
                    <div className="button">
                         <button onClick={doLogin}>Log in</button>
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
               </div>
          </div>
     );
};
