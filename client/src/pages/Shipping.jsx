import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, TimerReset, Info, Globe, ShieldCheck } from 'lucide-react';
import { assets } from '../assets/assets/frontend_assets/assets';
import { Helmet } from 'react-helmet';


const Shipping = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <Helmet>
                <title>Shipping in Addis Ababa | E-commerce</title>
                <meta name="description" content="Learn about our local delivery process, fast timelines, and secure packaging within Addis Ababa. Reliable, citywide shipping with quick turnaround and safe packaging." />
                <meta property="og:title" content="Shipping in Addis Ababa | E-commerce" />
                <meta property="og:description" content="Learn about our local delivery process, fast timelines, and secure packaging within Addis Ababa." />
                <meta property="og:type" content="website" />
            </Helmet>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white px-4 py-10 md:px-8 lg:px-16 xl:px-32 text-gray-800">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto flex flex-col"
                >
                    <div className="mb-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h1 className="text-xl md:text-3xl font-bold mb-2 text-indigo-700">Shipping in Addis Ababa</h1>
                                <p className="text-gray-600 max-w-2xl text-sm font-semibold">
                                    Learn about our local delivery process, fast timelines, and secure packaging within Addis Ababa.
                                </p>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-xl p-4 shadow-md flex items-center gap-3 border border-indigo-100"
                            >
                                <div className="bg-indigo-100 p-3 rounded-lg">
                                    <ShieldCheck className="text-indigo-600 w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-medium">Secure Shipping</p>
                                    <p className="text-xs text-gray-500">Reliable and protected delivery</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Moving Truck Animation */}
                        <div className="relative h-32 mb-16 overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100">
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-700"></div>
                            <div className="absolute bottom-3 left-0 right-0 h-0.5 bg-yellow-300 flex">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="h-full w-4 bg-yellow-300 mr-8"></div>
                                ))}
                            </div>

                            <motion.div
                                className="absolute bottom-8"
                                initial={{ x: -100 }}
                                animate={{
                                    x: "100vw",
                                    transition: {
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }
                                }}
                            >
                                <div className='flex gap-[100px]'>
                                    {/* <img src={assets.imagecopy} className='w-[80px]' />
                                <img src={assets.imagecopy} className='w-[90px]' /> */}
                                    <img src={assets.imagecopy} className='w-[70px]' />
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute top-6 left-1/4 opacity-70"
                                animate={{
                                    x: [0, 20, 0],
                                    transition: {
                                        duration: 8,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }
                                }}
                            >
                                <div className="w-16 h-8 bg-gray-200 rounded-full"></div>
                            </motion.div>

                            <motion.div
                                className="absolute top-4 right-1/3 opacity-60"
                                animate={{
                                    x: [0, -30, 0],
                                    transition: {
                                        duration: 10,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }
                                }}
                            >
                                <div className="w-20 h-10 bg-gray-200 rounded-full"></div>
                            </motion.div>
                        </div>

                        {/* Shipping Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {/* City Coverage */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <Globe className="text-green-600 w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Citywide Delivery</h3>
                                </div>
                                <p className="text-sm text-gray-700">
                                    We deliver to all major areas in Addis Ababa, including Bole, Yeka, Arada, Nifas Silk, and more.
                                </p>
                                <div className="mt-4 flex items-center">
                                    <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded">Local Reach</span>
                                </div>
                            </motion.div>

                            {/* Delivery Times */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white border border-amber-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-amber-100 p-2 rounded-lg">
                                        <TimerReset className="text-amber-500 w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Fast Delivery</h3>
                                </div>
                                <p className="text-sm text-gray-700">
                                    Our logistics team ensures quick and safe delivery to your location.
                                </p>
                                <div className="mt-4 flex items-center">
                                    <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded">Quick Turnaround</span>
                                </div>
                            </motion.div>

                            {/* Secure Packaging */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <ShieldCheck className="text-blue-500 w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Safe Packaging</h3>
                                </div>
                                <p className="text-sm text-gray-700">
                                    All items are securely packaged with local handling expertise to minimize damage during city transport.
                                </p>
                                <div className="mt-4 flex items-center">
                                    <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">Handled with Care</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Standard Shipping Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-auto bg-white border border-indigo-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
                >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="bg-indigo-100 p-4 rounded-lg">
                            <Truck className="text-indigo-600 w-10 h-10" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-xl mb-2 text-indigo-700">Standard Addis Delivery</h3>
                            <p className="text-gray-700 mb-4">
                                Most orders are delivered within 1–2 business days. Tracking is provided after your item is dispatched.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-4">
                                <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">Local Shipping</span>
                                <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">SMS Updates</span>
                                <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full">payment by bank</span>
                            </div>

                            <div className="flex items-center gap-4 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-sm">Available in all Addis sub-cities</span>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <span className="text-sm">Same-day in Bole, Kazanchis, and more</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Support Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex gap-4 text-sm text-gray-700 bg-white rounded-xl p-5 border border-indigo-100 shadow-sm"
                >
                    <div className="bg-indigo-100 p-2 rounded-lg h-fit">
                        <Info className="text-indigo-600 w-5 h-5" />
                    </div>
                    <div>
                        <p className="font-medium mb-1">Need help with your delivery?</p>
                        <p>
                            If your package hasn’t arrived within the estimated time, please call our local support. We're here to help 24/7 in Amharic, Afaan Oromo, and English.
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Shipping;
