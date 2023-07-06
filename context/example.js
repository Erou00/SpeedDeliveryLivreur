import react, { useState } from "react"


const AuthContext = react.createContext({});
 
const AuthContextProvider = ({children}) => {
    const [authUser,setUser] = useState(null)
    return <AuthContext.Provider>
                 {children}
            </AuthContext.Provider>
 
}

export default AuthContextProvider