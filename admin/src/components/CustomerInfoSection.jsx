import React, { useState } from 'react';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCity,
    FaMapPin,
    FaBuilding,
    FaHome,
    FaChevronDown,
} from 'react-icons/fa';

const CustomerInfoSection = ({ order }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded((prev) => !prev);

    const { customerInfo = {} } = order || {};
    const {
        name,
        phone,
        email,
        city,
        subCity,
        address,
        deliveryLocation,
        deliveryArea,
    } = customerInfo;

    return (
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Summary Bar */}
            <div
                className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                onClick={toggleExpand}
                aria-expanded={expanded}
            >
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                        <FaUser className="text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="text-gray-800 font-medium">{name || 'Customer'}</h4>
                        {/* <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <FaPhone className="text-xs text-gray-500" />
              <span>{phone ? `+251 ${phone}` : 'No phone'}</span>
            </div> */}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {deliveryArea === 'addis' ? 'Addis Ababa' : 'Outside'}
                    </span>
                    <FaChevronDown
                        className={`text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {/* Expandable Info */}
            {expanded && (
                <div className="px-4 py-3 border-t border-gray-100 flex flex-col  gap-2 text-sm">
                    {/* Email */}
                    <div className="flex items-center gap-3 p-1 bg-gray-100 ">
                        <FaEnvelope className="mt-0.5 text-blue-500 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Email</p>
                            {email ? (
                                <a
                                    href={`mailto:${email}`}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {email}
                                </a>
                            ) : (
                                <p className="font-medium">Not provided</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-1 bg-gray-100 ">
                        <FaPhone className="mt-0.5 text-indigo-300 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="font-medium">{'+251' + phone || 'Not provided'}</p>
                        </div>
                    </div>


                    {deliveryArea === 'addis' ? (
                        <div className="flex items-center gap-3 p-1 bg-gray-100 ">
                            <FaBuilding className="mt-0.5 text-cyan-500 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500">Sub-city</p>
                                <p className="font-medium">{subCity || 'Not provided'}</p>
                            </div>
                        </div>


                    ) : (
                        <div className="flex items-center gap-3 p-1 bg-gray-100 ">
                            <FaCity className="mt-0.5 text-purple-500 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-gray-500">City</p>
                                <p className="font-medium">{city || 'Not provided'}</p>
                            </div>
                        </div>

                    )}


                    {/* Address */}
                    <div className="flex items-center gap-3 p-1 bg-gray-100 ">
                        <FaHome className="mt-0.5 text-rose-500 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Address</p>
                            <p className="font-medium">{address || 'Not provided'}</p>
                        </div>
                    </div>

                    {/* Delivery Location */}
                    <div className="flex items-center gap-3 p-1 bg-gray-100 ">
                        <FaMapPin className="mt-0.5 text-orange-500 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Delivery Location</p>
                            <p className="font-medium">{deliveryLocation || 'Not provided'}</p>
                        </div>
                    </div>


                </div>
            )}
        </section>
    );
};

export default CustomerInfoSection;
