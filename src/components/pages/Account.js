import { AuthData } from "../../auth/AuthWrapper"

export const Account = () => {

     const { user } = AuthData();

     return (
          <div className="page">
               <h2>Welcome Back To Your Account</h2>
               <h2> {user.firstname}</h2    >
               <p>Username: {user.name}</p>
                <p>Member ID: {user.memberid}</p>

          </div>
     )
}

//    "userName": "uk",
//    "password": "362514",
//    "profileStatus": "ACTIVE    ",
//    "email": "luisedwardo@example.com",
//    "firstName": "upesh",
//    "lastName": "karki"