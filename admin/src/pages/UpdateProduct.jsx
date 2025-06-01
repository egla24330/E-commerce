import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/admincontext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FiX, FiUpload, FiTrash2, FiStar } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

// Available categories
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

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendurl, token } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: Array(4).fill(''),
    slug: '',
    isFeatured: false
  });
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendurl}/api/product/up/${id}`, {
          headers: { token }
        });

        if (res.data.success && res.data.product) {
          const productData = res.data.product;
          // Pad images array to 4 items
          const images = productData.images || [];
          const paddedImages = [...images, ...Array(4 - images.length).fill('')];

          // Create image previews
          const previews = paddedImages.map(img => img || null);

          setProduct({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            stock: productData.stock,
            images: paddedImages.slice(0, 4),
            slug: productData.slug,
            isFeatured: productData.isFeatured || false
          });

          setImagePreviews(previews);
        } else {
          toast.error('Failed to load product');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, backendurl, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...product.images];
      const newPreviews = [...imagePreviews];

      newImages[index] = file;
      newPreviews[index] = reader.result;

      setProduct(prev => ({ ...prev, images: newImages }));
      setImagePreviews(newPreviews);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    const newPreviews = [...imagePreviews];

    // Keep track of removed images for backend
    if (typeof newImages[index] === 'string' && newImages[index] !== '') {
      // This will be handled in backend as removed image
    }

    newImages[index] = '';
    newPreviews[index] = null;

    setProduct(prev => ({ ...prev, images: newImages }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      // Add product data
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('stock', product.stock);
      formData.append('isFeatured', product.isFeatured);

      // Add images - backend expects image1, image2, etc.
      product.images.forEach((img, index) => {
        if (img instanceof File) {
          formData.append(`image${index + 1}`, img);
        } else if (img) {
          // For existing URLs
          formData.append(`imageUrl${index + 1}`, img);
        }
      });

      const res = await axios.post(`${backendurl}/api/product/up/${id}`, formData, {
        headers: { token }
      });

      if (res.data.success) {
        toast.success('Product updated successfully');
        navigate('/list');
      } else {
        toast.error(res.data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating product');
    } finally {
      setSaving(false);
    }
  };

  // --- React Helmet for meta data ---



  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Update Product | Admin Dashboard</title>
        <meta name="description" content="Edit and update product details in the admin dashboard." />
      </Helmet>

      <div className="p-4 md:p-6 mx-auto h-[100vh] overflow-y-scroll w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Update Product</h1>
          <p className="text-gray-600">Edit your product details below</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                min="0"
               
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl mb-6">
            <FiStar className="text-indigo-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Feature this product?</p>
              <p className="text-sm text-gray-600">Featured products appear on the homepage</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={product.isFeatured}
                onChange={e => setProduct(p => ({ ...p, isFeatured: e.target.checked }))}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Product Images</label>
            <p className="text-xs text-gray-500 mb-4">Upload up to 4 images</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  {preview ? (
                    <>
                      <img
                        src={preview}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-md h-32 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors">
                      <FiUpload className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">Upload Image</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, index)}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/list')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-[120px]"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  Saving...
                </>
              ) : (
                'Update Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;