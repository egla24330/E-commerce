import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from "react";
import { useContext } from 'react';
import { ShopContext } from './context/Shopcontext'
import AuthContext from './context/Authcontext';

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const PlaceOrder = lazy(() => import("./pages/Placeorder"));
const Orders = lazy(() => import("./pages/Orders"));
const Navbar = lazy(() => import("./components/Navbar"));
const Pagenotfound = lazy(() => import("./pages/Pagenotfound"));
const Footer = lazy(() => import("./components/Footer"));
const VerifyPayment = lazy(() => import("./pages/VerifyPayment"));
const CategoryListPage = lazy(() => import("./components/CategoryListPage"));
const Sidebar =lazy(()=>import("./components/Sidebar"))
const ProductList = lazy(() => import("./components/ProductList"));
const Category = lazy(() => import("./components/Category"));
import { ToastContainer, toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';
const ProductPage = lazy(() => import("./pages/ProductPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const FAQs = lazy(() => import("./pages/FAQs"));
const Terms = lazy(()=>import('./pages/Terms'))
const HelpCenter =lazy(()=>import('./pages/HelpCenter'))
const Shipping =lazy(()=>import('./pages/Shipping'))
const DevelopedBy =lazy(()=>import('./pages/DevelopedBy'))
const FeedbackForm =lazy(()=>import('./pages/FeedbackForm'))


const App = () => {

  const {token} =useContext(AuthContext)
  // Import the spinner

  return (
    <>
      <div className="px-4 sm:px-[4%] relative">    
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <Circles color="#4fa94d" height={80} width={80} />
            </div>
          }
        >
          <ToastContainer />
          <Navbar />
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
            <Route path='/profile' element={token ? <ProfilePage/>:<Login/>} />
            <Route path="/place-order" element={token ? <PlaceOrder /> : <Login/>} />
            <Route path="/orders" element={token ? <Orders/> : <Login/>} />
            <Route path="/verify-payment/:id" element={token ? <VerifyPayment/> : <Login/>} />
            <Route path="/category/:categorySlug" element={<Category />} />
            <Route path='/faq' element={<FAQs />} />
            <Route path='/ProductList/:slug' element={<ProductList/>}/>
            <Route path= '/Product-page/:id' element={<ProductPage/>} />
            <Route path='/terms' element={<Terms/>}/>
            <Route path='/support' element={<HelpCenter/>}/>
            <Route path='/shipping' element={<Shipping/>}/>
            <Route path='/dev' element={<DevelopedBy/>}/>
             <Route path='/feed-back-form' element={<FeedbackForm/>}/>
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer/>
    </>
  )
}

export default App
