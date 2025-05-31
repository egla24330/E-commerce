import { createContext, useState, useEffect } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
  } from 'firebase/auth';

  import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData,setUserData] =useState({})
    const [token,setToken] =useState('')

   /* const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const { displayName, email, photoURL, uid } = await result.user;
            setUserData({ displayName, email, photoURL, uid })

        } catch (error) {
            console.error("Error signing in with Google:", error.message);
        }
    };
*/
   /* const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };*/


    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            //getCart(token ? token : localStorage.getItem('token'))

        }

    }, [])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    
    return (
        <AuthContext.Provider value={{user,userData,token,setToken}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;