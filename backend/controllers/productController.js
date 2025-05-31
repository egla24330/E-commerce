import productModel from "../models/productModel.js";
import { v2 as cloudinary } from 'cloudinary';
//add product 
import slugify from 'slugify'
const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, variants, isFeatured, tags, stock } = req.body;
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(i => i !== undefined)
    let imageUrl = await Promise.all(
      images.map(async (i) => {
        let r = await cloudinary.uploader.upload(i.path, { resource_type: 'image' })
        return r.secure_url
        return i.path
      })
    )
    let base = slugify(name, { lower: true, strict: true });
    let slug = base;
    try {
      const product = {
        name,
        slug: slug,
        description,
        category,
        price,
        images: imageUrl,
        variants: JSON.parse(variants),
        isFeatured,
        tags: tags ? JSON.parse(tags) : [],
        stock: stock || 0
      };
      let p = new productModel(product)
      await p.save()

      res.json({ success: true, message: 'successful upload data ' });
    } catch (err) {
      console.error("Error processing request");
      if (err.code === 11000 && err.keyPattern.slug) {
        slug = `${base}-${Date.now()}`;
        const product = {
          name,
          slug: slug,
          description,
          category,
          price,
          images: imageUrl,
          variants: JSON.parse(variants),
          isFeatured,
          tags: tags ? JSON.parse(tags) : [],
          stock: stock || 0
        };
        let p = new productModel(product);
        await p.save();
        res.json({ success: true, message: 'successful upload data with unique slug' });
        return;
      }
      throw err
      
    }

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ success: false, message: error.message });
  }

}

/*const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, variants, isFeatured, tags, stock } = req.body;

    // Collect all uploaded images
    const imageFiles = [req.files?.image1?.[0], req.files?.image2?.[0], req.files?.image3?.[0], req.files?.image4?.[0]].filter(Boolean);

    // Upload to Cloudinary
    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const uploaded = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        return uploaded.secure_url;
      })
    );

    // Slug generation
    let baseSlug = slugify(name, { lower: true, strict: true });
    let finalSlug = baseSlug;

    // Try saving the product
    let productData = {
      name,
      slug: finalSlug,
      description,
      category,
      price,
      images: imageUrls,
      variants: JSON.parse(variants),
      isFeatured: isFeatured === "true" || isFeatured === true,
      tags: tags ? JSON.parse(tags) : [],
      stock: parseInt(stock) || 0,
    };

    try {
      await new productModel(productData).save();
      return res.json({ success: true, message: 'Product uploaded successfully' });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern?.slug) {
        // Retry with new slug
        finalSlug = `${baseSlug}-${Date.now()}`;
        productData.slug = finalSlug;
        await new productModel(productData).save();
        return res.json({ success: true, message: 'Product uploaded with unique slug retry' });
      }
      throw err;
    }
  } catch (error) {
    console.error("Failed to add product:", error);
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

*/

// list product


const listProduct = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    // Search by product name or tags
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (page - 1) * limit;
    const total = await productModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const products = await productModel.find(query)
      .sort({ createdAt: -1 }) // optional: newest first
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({ products, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

}

// single product

const singleProduct = async (req, res) => {
  try {
    const products = await productModel.findById(req.body.id)
    res.status(201).json({ success: true, products })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}

//remove

const removeProduct = async (req, res) => {
  console.log(req.body.id)
  try {
    const products = await productModel.findByIdAndDelete(req.body.id)
    res.status(201).json({ success: true, message: 'successful delete data ' })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}

const resetAllData = async (req, res) => {
  try {
    if (true) {
      throw new Error('you are not allowed to reset all data')
    }
    const products = await productModel.deleteMany({})
    res.status(201).json({ success: true, message: 'successful reset all data' })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }

}

const  getProductById =async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}



const  getForUpdate =async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({
      success:true,
      product
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }

}

const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price, isFeatured, tags, stock } = req.body;
    const { id } = req.params;

    // Find existing product
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Handle new images if provided
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];
    const images = [image1, image2, image3, image4].filter(i => i !== undefined);

    let imageUrls = product.images || [];
    if (images.length > 0) {
      const uploadedUrls = await Promise.all(
        images.map(async (i) => {
          const r = await cloudinary.uploader.upload(i.path, { resource_type: 'image' });
          return r.secure_url;
        })
      );
      imageUrls = uploadedUrls;
    }

    // Update fields
    product.name = name ?? product.name;
    product.slug = name ? slugify(name, { lower: true, strict: true }) : product.slug;
    product.description = description ?? product.description;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.images = imageUrls;
    product.isFeatured = typeof isFeatured !== "undefined" ? isFeatured : product.isFeatured;
    product.tags = tags ? JSON.parse(tags) : product.tags;
    product.stock = typeof stock !== "undefined" ? stock : product.stock;

    await product.save();

    res.json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, singleProduct, listProduct, removeProduct, resetAllData, getProductById,getForUpdate,updateProduct}