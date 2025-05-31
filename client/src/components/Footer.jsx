import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Facebook, Instagram, Mail, Phone, MapPin, Twitter, Send } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="mt-24 border-t pt-20 pb-16 bg-white text-gray-800">
            <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12'>

                {/* Logo & Mission */}
                <div className="col-span-1 md:col-span-3 lg:col-span-2">
                    <img src={assets.logoo} alt="YegnaCart Logo" className='w-44 mb-4' />
                    <p className="text-sm leading-relaxed text-gray-600 max-w-md">
                        YegnaCart empowers Ethiopian buyers and sellers with a trusted, seamless shopping experience. From fashion to electronics, real estate, and more — everything in one place.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <a href="https://facebook.com/yegnafits" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><Facebook size={20} /></a>
                        <a href="https://instagram.com/yegnafits" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><Instagram size={20} /></a>
                        <a href="https://twitter.com/yegnafits" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                        <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-blue-600">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/support" className="hover:text-blue-600">Help Center</Link></li>
                        <li><Link to="/faq" className="hover:text-blue-600">FAQs</Link></li>
                        {/* <li><Link to="/returns" className="hover:text-blue-600">Returns</Link></li> */}
                        <li><Link to="/shipping" className="hover:text-blue-600">Shipping Info</Link></li>
                    </ul>
                </div>

                {/* Contact & Newsletter */}
                <div className="md:col-span-2 lg:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-center gap-2"><Phone size={16} /> +251 912 193 011</li>
                        <li className="flex items-center gap-2"><Mail size={16} /> <a href="mailto:yegnafits@gmail.com" className="hover:text-blue-600">yegnafits@gmail.com</a></li>
                        <li className="flex items-center gap-2"><MapPin size={16} /> Addis Ababa, Ethiopia</li>
                    </ul>
                    {/* <form className="mt-6">
                        <label htmlFor="newsletter" className="block text-sm mb-2 text-gray-900">Subscribe to our newsletter</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input id="newsletter" type="email" placeholder="Email address" className="w-full px-3 py-2 rounded-md text-sm bg-gray-100 text-gray-900 border border-gray-300" />
                            <button type="submit" className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                                <Send size={18} />
                            </button>
                        </div>
                    </form> */}
                </div>

            </div>

            {/* Divider */}
           
            <div className="border-t border-gray-200 mt-12 pt-6 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} YegnaCart. All rights reserved | Developed by{' '}
                <Link
                    to="/dev"
                    className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors group"
                >
                    Dataora
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
            </div>
        </footer>
    )
}

export default Footer