// ProductPage.jsx
// This component displays detailed information about a single product, including images, variants, price, stock status, and allows users to select options and add the product to their cart.

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ShopContext } from '../context/Shopcontext.jsx';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';


const ProductPage = () => {


  const { currency, backendurl, addToCart, itemCount, removeCartItem, subtotal } = useContext(ShopContext);
  let ok = () => {
    console.log(itemCount)
    console.log(subtotal)
  }
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/product/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader />
      </div>
    );
  }

  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const allVariantsSelected =
    !product.variants || product.variants.every(group => selectedVariant[group.label]);

  const totalPrice =
    product.price +
    Object.values(selectedVariant).reduce((acc, v) => acc + (v.price || 0), 0);

  const galleryImages = product.images?.map(img => ({
    original: img,
    thumbnail: img,
  }));

  const handleAddToCart = () => {
    if (!allVariantsSelected) {
      toast.error('Please select all options before adding to cart.');
      return;
    }

    addToCart(product, selectedVariant, 1);
    //toast.success('Added to cart');
  };



  return (
    <>
    <Helmet>
      <title>{product.name} | E-commerce</title>
      <meta name="description" content={product.description?.slice(0, 160) || 'Product details'} />
      <meta property="og:title" content={product.name} />
      <meta property="og:description" content={product.description?.slice(0, 160) || 'Product details'} />
      {product.images?.[0] && <meta property="og:image" content={product.images[0]} />}
    </Helmet>
      <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <ImageGallery
            items={galleryImages}
            showPlayButton={true}
            showFullscreenButton={true}
            showNav={true}
            slideOnThumbnailOver={true}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            {product.isFeatured && (
              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 text-xs rounded">Featured</span>
            )}
          </div>

          <p className="text-gray-500 text-sm">{product.category}</p>
          <p className="text-xl font-bold text-black">{currency}{totalPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-700">{product.description}</p>
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
          </p>

          {/* Variants */}
          {product.variants?.map((group, i) => (
            <div key={i}>
              <label className="font-medium text-sm">{group.label}</label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {group.values.map((v, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`px-3 py-1 border rounded-md text-sm ${selectedVariant[group.label]?.value === v.value ? 'bg-black text-white' : ''
                      }`}
                    onClick={() =>
                      setSelectedVariant(prev => ({
                        ...prev,
                        [group.label]: v,
                      }))
                    }
                  >
                    {v.value} {v.price > 0 && `(+${v.price})`}
                  </button>
                ))}
              </div>
            </div>
          ))}


          {product.tags?.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock < 1 || !allVariantsSelected}
            className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:opacity-90 disabled:opacity-50"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </>
  );
};

export default ProductPage;
