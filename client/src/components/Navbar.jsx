import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { NavLink } from 'react-router-dom'
import { useState,useContext } from 'react'
import { ShopContext } from '../context/Shopcontext.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/Authcontext.jsx'
import { TriangleAlert } from 'lucide-react';
import Sidebar from './Sidebar.jsx'


const Navbar = () => {
   
  let navi = useNavigate()
  const [open, setOpen] = useState(true)
  const { setSearchBarStatus, setSearch, setToggleStatus,getCartCount,toggleStatus } = useContext(ShopContext)
  const {setToken, token} = useContext(AuthContext)

  let logout = () => {
    navi('/login')
    setToken('')
    localStorage.removeItem('token')
    setSearch('')
    toast.success('Logout successfully')
  }

  let serchIconWhenClick = () => {
    navi('/collection')
    setSearchBarStatus(true)

  }

  
  
  return (
    <div className='flex items-center justify-between py-6 font-medium border-b-2'>
      {/* <img src={assets.logoo} alt="logo" className='w-32' /> */}
      <p onClick={() => navi('/')} className='text-indigo-600 mynerve-regular cursor-pointer'>Zaycommerce </p>
      {/* <ul className='sm:flex gap-5 text-sm text-gray-700 hidden'>
        <NavLink to={'/'} className='flex items-center gap-1 flex-col '>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={'/collection'} className='flex items-center gap-1 flex-col '>
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={'/about'} className='flex items-center gap-1 flex-col '>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={'/contact'} className='flex items-center gap-1 flex-col '>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

      </ul> */}
      

      <div className='flex items-center gap-6 '>
        {/* search */}
        {/* <img src={assets.search_icon} onClick={serchIconWhenClick} className='w-5 cursor-pointer' /> */}

        {/* profile */}
        <div className="group relative z-50">
          <img className="w-5 cursor-pointer" onClick={() => token ? null : navi('/login')} src={assets.profile_icon} alt="" />
          <div className="group-hover:block absolute dropdown-menu right-0 pt-5 hidden">
            {token &&
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md" >
                {/* Dropdown content here */}
                <p className='hover:text-black cursor-pointer' onClick={()=>navi('/profile')} > My profile</p>
                <p className='hover:text-black cursor-pointer' onClick={()=>navi('/orders')}> orders</p>
                <p className='hover:text-black cursor-pointer' onClick={logout} > logout</p>
              </div>
            }
          </div>
        </div>

        {/* cart */}

        
{
  localStorage.getItem('order') ? (
    
    <NavLink to={`/verify-payment/${localStorage.getItem('order')}`} className='text-md flex items-center gap-1'>
      <div className='text-xs text-yellow-500'>
        <TriangleAlert size={20} color="green" absoluteStrokeWidth />
      </div>  
      <p className='text-green-500 text-xs font-bold'>Verify</p>
    </NavLink>
  ) : (
    <NavLink to={'/cart'} className='relative'>
      <img src={assets.cart_icon} className='w-5 cursor-pointer' />
      <div className="absolute -top-1 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{getCartCount()}</div>
    </NavLink>
  )
}
        <img onClick={() => setToggleStatus(true)} src={assets.menu_icon} className='w-5 cursor-pointer' /> 

      </div>

       {toggleStatus? <Sidebar/> : null}

      {/* <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white text-gray-700 font-medium  duration-300 transition-all
             ${open ? 'w-0' : 'w-full'} sm:hidden`}>
        <div className='flex flex-col ok'>

          <div className='flex items-center text-gray-600 gap-3 p-3'
            onClick={() => setOpen(true)}>
            <img src={assets.dropdown_icon}
              alt="drob-icon"
              className='w-2 rotate-180' />
            <p>BACK</p>
          </div>


          <NavLink to={'/'} onClick={() => setOpen(true)} className='py-2 pl-6 border'>
            <p>HOME</p>
          </NavLink>

          <NavLink to={'/collection'} onClick={() => setOpen(true)} className='py-2 pl-6 border'>
            <p>COLLECTION</p>

          </NavLink>

          <NavLink to={'/about'} onClick={() => setOpen(true)} className='py-2 pl-6 border'>
            <p>ABOUT</p>

          </NavLink>

          <NavLink to={'/contact'} onClick={() => setOpen(true)} className='py-2 pl-6 border'>
            <p>CONTACT</p>

          </NavLink>

        </div>
      </div> */}


    </div>
  )
}

export default Navbar
