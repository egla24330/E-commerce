import React, { createContext, useState,useEffect} from 'react';

export const AdminContext = createContext();

export const AdminProvider = (props) => {
    let backendurl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const [token, setToken] = localStorage.getItem('admintoken')? useState(localStorage.getItem('admintoken')):useState(''); 

    useEffect(() => {
        localStorage.setItem('admintoken', token);  
    }, [token]);

    
    
    const value ={
        backendurl: backendurl,
        token: token,
        setToken

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};


