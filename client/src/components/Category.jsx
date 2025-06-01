import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Searchbox from "./Searchbox";
import { ShopContext } from "../context/Shopcontext";
import Productitem from "./Productitem";
//import Pagination from "./Pagination";
const CategoryPage = () => {
    const { search } = useContext(ShopContext);
    const { categorySlug } = useParams();
    const [allProducts, setAllProducts] = useState([]);
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [sort, setSort] = useState("");
    const [filtered, setFiltered] = useState([]);




    // Fetch products
    useEffect(() => {
        const fetchData = async () => {
            //const res = await axios.get(`/api/products/category/${categorySlug}`);
            setAllProducts(products);
            setFiltered(products);
        };
        fetchData();
    }, [categorySlug]);

    // Filter + sort logic
    useEffect(() => {
        let results = [...allProducts];

        if (search) {
            results = results.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }



        if (sort === "low") results.sort((a, b) => a.price - b.price);
        if (sort === "high") results.sort((a, b) => b.price - a.price);

        setFiltered(results);
    }, [search, priceMin, priceMax, sort, allProducts]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <Searchbox />
            <div className=" flex flex-col sm:flex-row justify-between gap-3 my-3">
                <h1 className="text-3xl font-bold mb-6 text-center capitalize">
                    {categorySlug.replace("-", " ")}
                </h1>


                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className=" border bg-white p-2 rounded-md h-[40px] "
                >
                    <option value="">Sort By</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                </select>
            </div>

            {/* Products */}
            {filtered.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
            ) : (
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6"
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                >
                    {filtered.map((item,index) => (
                        
                        <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                        
                    ))}
                </motion.div>
            )}

            {/* <Pagination/> */}
        </div>
    );
};

export default CategoryPage;