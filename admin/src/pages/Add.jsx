/**
 * @file Add.jsx
 * @description React component for the admin dashboard to add new products to the e-commerce store.
 * 
 * Features:
 * - Upload up to 4 product images with validation (type and size).
 * - Input product details: name, slug (auto-generated), description, price, category, stock, tags, and featured status.
 * - Add product variants with custom labels, values, and additional prices.
 * - Form validation and error handling with toast notifications.
 * - Submits product data (including images and variants) to the backend API using Axios.
 * - Displays loading spinner during submission and resets form on success.
 * 
 * Context:
 * - Uses `AdminContext` for backend URL and admin token.
 * 
 * Dependencies:
 * - React, react-helmet, react-icons, axios, react-toastify, react-spinners, AdminContext
 * 
 * @component
 * @returns {JSX.Element} The Add New Product page for the admin dashboard.
 */
import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FiUpload, FiPlus, FiTrash2, FiStar, FiInfo, FiPackage } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";
import { AdminContext } from '../context/admincontext';

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(1);
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  const [variants, setVariants] = useState([]);
  const [newVariantLabel, setNewVariantLabel] = useState('');
  const [newVariantValue, setNewVariantValue] = useState('');
  const [newVariantPrice, setNewVariantPrice] = useState('');
  const [variantTempList, setVariantTempList] = useState([]);

  // Mock backend context for demonstration
  //const backendurl = "https://your-backend-api.com";
  //const token = "admin-auth-token";

  let {backendurl,token} =useContext(AdminContext)



  useEffect(() => {
    const generated = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(generated);
  }, [name]);

  const handleImageChange = (index, file) => {
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error('Image size should be less than 2MB');
      return;
    }
    
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const addVariantValue = () => {
    if (!newVariantValue.trim()) {
      toast.error('Please enter a variant value');
      return;
    }
    
    if (variantTempList.some(item => item.value === newVariantValue.trim())) {
      toast.error('This variant value already exists');
      return;
    }
    
    const priceValue = parseFloat(newVariantPrice) || 0;
    
    setVariantTempList([
      ...variantTempList,
      {
        value: newVariantValue.trim(),
        price: priceValue
      }
    ]);
    setNewVariantValue('');
    setNewVariantPrice('');
  };

  const removeTempVariant = (index) => {
    const newList = [...variantTempList];
    newList.splice(index, 1);
    setVariantTempList(newList);
  };

  const saveVariantGroup = () => {
    if (!newVariantLabel.trim()) {
      toast.error('Please enter a variant label');
      return;
    }
    
    if (variants.some(v => v.label === newVariantLabel.trim())) {
      toast.error('This variant group already exists');
      return;
    }
    
    if (variantTempList.length === 0) {
      toast.error('Please add at least one variant value');
      return;
    }
    
    setVariants([
      ...variants,
      {
        label: newVariantLabel.trim(),
        values: variantTempList
      }
    ]);
    setNewVariantLabel('');
    setVariantTempList([]);
  };

  const removeVariantGroup = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      toast.error('Product name is required');
      return;
    }
    
    if (images.every(img => img === null)) {
      toast.error('Please upload at least one image');
      return;
    }
    
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    
    setLoading(true);

    try {
      const formData = new FormData();
      images.forEach((img, i) => img && formData.append(`image${i + 1}`, img));

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("isFeatured", isFeatured);
      formData.append("tags", JSON.stringify(tags.split(',').map(tag => tag.trim())));
      formData.append("variants", JSON.stringify(variants));

      // Mock API call for demonstration
      //console.log('Submitting product:', {
//name, slug, description, price, category, stock, 
     //  // isFeatured, tags: tags.split(',').map(tag => tag.trim()), variants
      //});
      
      // In a real app:
       const res = await axios.post(`${backendurl}/api/product/add`, formData, {
      headers: { token },
      });
      
      // Simulate API delay
      //await new Promise(resolve => setTimeout(resolve, 1500));
          console.log(res)
      toast.success("Product added successfully!");
      
      // Reset form after successful submission
      setName('');
      setDescription('');
      setPrice(0);
      setCategory('');
      setStock(1);
      setTags('');
      setIsFeatured(false);
      setVariants([]);
      setImages([null, null, null, null]);

    } catch (err) {
      console.error(err);
      toast.error("Error uploading product.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Electronics & Accessories", 
    "Clothing & Fashion", 
    "Books & Education", 
    "Construction Materials",
    "Real Estate & Guest Houses", 
    "Health & Beauty", 
    "Baby & Kids", 
    "Automotive Supplies",
    "Furniture & Home Decor", 
    "Household Essentials"
  ];

  return (
    <>
      {/* Metadata for SEO and Social Sharing */}
      <Helmet>
        <title>Add New Product | Admin Dashboard</title>
        <meta name="description" content="Add new products to your online store inventory" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Product Management Dashboard" />
        <meta property="og:description" content="Admin interface for managing store products" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-4 md:p-8 h-[100vh] overflow-y-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FiPackage className="text-indigo-600 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Image Upload Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiUpload /> Product Images
              </h2>
              <p className="text-sm text-gray-600 mb-4">Upload up to 4 images (First image will be the main display)</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <label className={` w-full h-40 border-2 border-dashed rounded-xl cursor-pointer flex items-center justify-center overflow-hidden ${
                      img ? '' : 'bg-gray-50 hover:bg-gray-100'
                    }`}>
                      {img ? (
                        <img
                          src={URL.createObjectURL(img)}
                          className="w-full h-full object-cover"
                          alt={`preview-${idx}`}
                        />
                      ) : (
                        <div className="text-center p-4">
                          <FiPlus className="mx-auto text-gray-400 text-2xl mb-2" />
                          <span className="text-xs text-gray-500">Add Image</span>
                        </div>
                      )}
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={e => e.target.files[0] && handleImageChange(idx, e.target.files[0])}
                      />
                    </label>
                    
                    {img && (
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiInfo /> Product Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    className="w-full px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
                    value={slug}
                    disabled
                    placeholder="Auto-generated slug"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price ($)</label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                    type="number"
                    min="0"
                    step="0.01"
                  
                    onChange={e => setPrice(+e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                    type="number"
                    min="1"
                    value={stock}
                    onChange={e => setStock(+e.target.value)}
                    placeholder="1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition appearance-none bg-white"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                    placeholder="tag1, tag2, tag3"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition resize-none min-h-[120px]"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detailed product description..."
                />
              </div>
            </div>

            {/* Variants Section */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiPlus /> Product Variants
              </h2>
              
              <div className="bg-gray-50 rounded-xl p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Variant Group</label>
                    <input
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                      placeholder="Size, Color, Material"
                      value={newVariantLabel}
                      onChange={e => setNewVariantLabel(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Variant Value</label>
                    <input
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                      value={newVariantValue}
                      onChange={e => setNewVariantValue(e.target.value)}
                      placeholder="Small, Red, Wood"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Price ($)</label>
                    <input
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newVariantPrice}
                      onChange={e => setNewVariantPrice(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={addVariantValue}
                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition flex items-center gap-2"
                  >
                    <FiPlus size={16} /> Add Value
                  </button>
                  
                  <button
                    type="button"
                    onClick={saveVariantGroup}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    Save Variant Group
                  </button>
                </div>
                
                {variantTempList.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Current Values:</h3>
                    <div className="flex flex-wrap gap-2">
                      {variantTempList.map((variant, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-lg px-3 py-2 flex items-center gap-2">
                          <span className="font-medium">{variant.value}</span>
                          {variant.price > 0 && <span className="text-green-600">+${variant.price.toFixed(2)}</span>}
                          <button
                            type="button"
                            onClick={() => removeTempVariant(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {variants.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <h3 className="text-md font-medium text-gray-800 mb-3">Saved Variant Groups</h3>
                    <div className="space-y-4">
                      {variants.map((group, groupIdx) => (
                        <div key={groupIdx} className="bg-white border border-gray-200 rounded-xl p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-gray-800">{group.label}</h4>
                            <button
                              type="button"
                              onClick={() => removeVariantGroup(groupIdx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {group.values.map((value, valueIdx) => (
                              <div key={valueIdx} className="bg-gray-50 px-3 py-1.5 rounded-lg text-sm">
                                <span>{value.value}</span>
                                {value.price > 0 && <span className="text-green-600 ml-1">+${value.price.toFixed(2)}</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Product */}
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl">
              <FiStar className="text-indigo-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Feature this product?</p>
                <p className="text-sm text-gray-600">Featured products appear on the homepage</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 font-medium shadow-md hover:shadow-lg disabled:opacity-70"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ClipLoader size={18} color="#fff" /> Adding Product...
                  </>
                ) : (
                  <>
                    <FiPlus size={18} /> Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;