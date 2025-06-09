import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/Shopcontext.jsx';
import CartTot from '../components/CartTot';
import { assets } from '../assets/assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BankIcon from '../components/BankIcon.jsx';
import BankTransferWarning from '../components/BankTransferWarning.jsx';
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import AuthContext from '../context/Authcontext'
import DeliveryForm from '../components/DeliveryForm.jsx';


import { FiUser, FiMail, FiMapPin, FiPhone, FiChevronDown } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

const Placeorder = () => {



  const [isAddis, setIsAddis] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { getCartTotal, currency, delivery_fee, cartItems, backendurl } = useContext(ShopContext);
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [trWarn, setrWarn] = useState(false);
  const [totalPrice, setTotalPrice] = useState(getCartTotal() + delivery_fee);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    deliveryArea: 'addis',
    subCity: '',
    city: '',
    deliveryLocation: '',
    phone: ''
  });



  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.trim().length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      case 'phone':
        if (!value) error = 'Phone is required';
        else if (!/^\d{9}$/.test(value)) error = 'Phone must be 9 digits';
        break;
      case 'subCity':
        if (isAddis && !value) error = 'Sub-city is required';
        break;
      case 'city':
        if (!isAddis && !value.trim()) error = 'City is required';
        break;
      case 'deliveryLocation':
        if (!value.trim()) error = 'Delivery location is required';
        break;
      default:
        break;
    }

    return error;
  };


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.entries(form).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    // Special validation for conditional fields
    if (isAddis) {
      const subCityError = validateField('subCity', form.subCity);
      if (subCityError) {
        newErrors.subCity = subCityError;
        isValid = false;
      }
    } else {
      const cityError = validateField('city', form.city);
      if (cityError) {
        newErrors.city = cityError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For phone input, only allow numbers and limit to 9 digits
    if (name === 'phone') {
      if (!/^\d*$/.test(value) || value.length > 9) return;
    }

    handleChange(e);

    // Validate field if it's been touched before
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };


  const handleAreaChange = (e) => {
    const value = e.target.value;
    setIsAddis(value === 'addis');
    handleChange({ target: { name: 'deliveryArea', value } });
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      { window.scrollTo({ top: 0, behavior: 'smooth' }); }


      toast.error('Please fill in all required fields correctly');
      return;
    }


    if (paymentMethod === '') {
      toast.error('Please select a payment method');
      return;
    }

    if (paymentMethod === 'telebirr') {
      toast.error('Telebirr payment method is not available yet. Please try Bank.');
      return;
    }
    if (paymentMethod === 'cod') {
      toast.error('Cash on delivery is not available yet. Please try Bank.');
      return;
    }

    try {
      setLoading(true)
      // if (!validateForm()) return;
      console.log({
        form,
        paymentMethod,
        cartItems,
        totalPrice,
      })
      console.log('cart', cartItems)
      const response = await axios.post(`${backendurl}/api/order/add`, {
        form,
        paymentMethod,
        cartItems,
        totalPrice,
      }, { headers: { token } });

      if (response.data.success) {

        toast.success('Order placed successfully');
        navigate('/verify-payment/' + response.data.order);
        console.log(response.data)
        // this is used to if exis order until verif if not verify it give warn to verify
        console.log('order id', response.data.order)
        localStorage.setItem('order', response.data.order)
      } else {
        toast.error('opps unauthorized please login again');
      }
    } catch (error) {
      toast.error('Error placing order');
      console.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Helmet>
        <title>Place Order | E-commerce</title>
        <meta name="description" content="Place your order and provide delivery details for your E-commerce purchase." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <form className={`${trWarn ? 'filter blur-lg bg-opacity-50' : ''}`}>
        <div className="min-h-screen px-4 sm:px-10 py-10 text-sm">
          <h1 className="text-xl font-semibold mb-6 text-gray-800 pacifico-regular">🚚 Delivery Information</h1>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* <DeliveryForm form={form} handleChange={handleChange} /> */}

            <div className="bg-white shadow rounded-lg py-6 px-4 md:px-6 space-y-5 border border-gray-200">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiUser size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    } transition-colors`}
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    } transition-colors`}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
              </div>

              {/* Address Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMapPin size={18} />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={form.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.address ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    } transition-colors`}
                  required
                />
                {errors.address && <p className="text-red-500 text-xs mt-1 ml-1">{errors.address}</p>}
              </div>

              {/* Delivery Area Selection */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Delivery Area</label>
                <div className="relative">
                  <select
                    name="deliveryArea"
                    value={form.deliveryArea || 'addis'}
                    onChange={handleAreaChange}
                    className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none bg-white"
                  >
                    <option value="addis">Addis Ababa</option>
                    <option value="outside">Outside Addis Ababa</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <FiChevronDown size={20} />
                  </div>
                </div>
              </div>

              {/* Conditional Sub-city or City Input */}
              {isAddis ? (
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Sub-city</label>
                  <div className="relative">
                    <select
                      name="subCity"
                      value={form.subCity || ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-3 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 appearance-none bg-white ${errors.subCity ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                        }`}
                    >
                      <option value="">-- Select Sub-city --</option>
                      <option value="bole">Bole</option>
                      <option value="kirkos">Kirkos</option>
                      <option value="yeka">Yeka</option>
                      <option value="lideta">Lideta</option>
                      <option value="gulele">Gulele</option>
                      <option value="lafto">Nifas Silk-Lafto</option>
                      <option value="akaki">Akaki Kality</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <FiChevronDown size={20} />
                    </div>
                  </div>
                  {errors.subCity && <p className="text-red-500 text-xs mt-1 ml-1">{errors.subCity}</p>}
                </div>
              ) : (
                <div>
                  <label className="block font-medium mb-2 text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={form.city}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                      } transition-colors`}
                    required
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1 ml-1">{errors.city}</p>}
                </div>
              )}

              {/* Delivery Location */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Delivery Location Details</label>
                <input
                  type="text"
                  name="deliveryLocation"
                  placeholder="House number, landmark, or specific instructions"
                  value={form.deliveryLocation}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.deliveryLocation ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    } transition-colors`}
                  required
                />
                {errors.deliveryLocation && <p className="text-red-500 text-xs mt-1 ml-1">{errors.deliveryLocation}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Phone Number</label>
                <div className={`flex items-center rounded-lg border-2 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200'
                  }`}>
                  <div className="flex items-center px-3 border-r border-gray-300 h-full">
                    <FiPhone className="text-gray-500 mr-2" size={18} />
                    <span className="text-gray-700 font-bold">+251</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="912345678"
                    value={form.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className="w-full p-3 outline-none font-medium"
                    maxLength={9}
                    required
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                <p className="text-xs text-gray-500 mt-1">Enter 9-digit phone number without prefix</p>
              </div>
            </div>

            {/* Delivery Form 
            <div className="bg-white shadow rounded-lg py-6 px-2 space-y-4 border border-gray-200">
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input-style" required />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input-style" required />
              <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="input-style" required />
              <div className="flex gap-4">
                <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="input-style w-1/2" required />
                <input type="text" name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} className="input-style w-1/2" required />
              </div>
              <div className='flex items-center justify-center gap-1 rounded-md border-2 border-gray-200'>
                <p className='text-black font-bold'>+251</p>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} className="border-0 w-full p-2 outline-none font-bold" required />
              </div>
            </div>
           */}
            {/* Summary */}
            <div className="bg-white shadow rounded-lg p-6 space-y-4 border border-gray-200 flex flex-col">
              <h2 className="text-lg font-medium text-gray-800 mb-4">🧾 Order Summary</h2>

              <CartTot />

              <p>SELECT PAYMENT METHOD</p>
              <div className='flex gap-3 flex-col lg:flex-row lg:items-center p-2'>
                <div onClick={() => setPaymentMethod('telebirr')} className={`p-3 cursor-pointer rounded-md hover:bg-gray-100 transition-colors ${paymentMethod === 'telebirr' ? 'bg-gray-300' : 'border border-gray-200'}`}>
                  <img className='h-6' src={assets.tele} alt="telebirr icon" />
                </div>
                <div onClick={() => { setrWarn(true); setPaymentMethod('bank'); window.scrollTo(0, -4000); }} className={`p-3 cursor-pointer rounded-md hover:bg-gray-100 transition-colors ${paymentMethod === 'bank' ? 'bg-gray-300' : 'border border-gray-200'}`}>
                  <p className='text-gray-700 font-bold'>Bank</p>
                </div>
                <div onClick={() => setPaymentMethod('cod')} className={`p-3 cursor-pointer rounded-md hover:bg-gray-100 transition-colors ${paymentMethod === 'cod' ? 'bg-gray-300' : 'border border-gray-200'}`}>
                  <p className='text-gray-700 font-bold'>CASH ON DELIVERY</p>
                </div>
              </div>

              {paymentMethod === 'telebirr' && <p className='text-red-500 text-md font-bold'>Telebirr payment method is not available yet. Please try Bank!</p>}
              {paymentMethod === 'cod' && <p className='text-red-500 text-md font-bold'>Cash on delivery is not available yet. Please try Bank!</p>}

              {paymentMethod === 'bank' && (
                <div className='flex flex-col gap-4 mt-4'>
                  <BankIcon />

                </div>
              )}

              <div className='flex items-center justify-end mt-4'>
                <button onClick={handleSubmit} disabled={loading} className="px-2 mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition w-[100px]">
                  {loading ? <ClipLoader size={20} color="#fff" /> : (paymentMethod === 'bank' ? 'Verify' : 'Place Order')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {trWarn && (
        <div className='max-w-4xl mx-auto absolute top-40 left-0 right-0 flex'>
          <div>
            <BankTransferWarning />
            <button
              onClick={() => setrWarn(false)}
              className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition w-[300px] mt-4 mx-auto'>
              Understand and Will Proceed
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Placeorder;
