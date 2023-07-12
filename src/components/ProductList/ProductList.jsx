import React, { useEffect, useState } from 'react';
import './ProductList.css';
import axios from 'axios';
import api from '../../api/products';
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setProducts } from '../../redux/cart';
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [updateUI, setUpdateUI] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(8)
    const [totalPage, setTotalPage] = useState(1)
    const [filteredProduct, setFilteredProduct] = useState()

    const nav = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(api).then((res) => {
            console.log(res.data);
            dispatch(setProducts(res.data));
            setTotalPage(Math.ceil(res.data.length / perPage))
        });
        axios.get(`${api}/categories`).then((res) => {
            console.log(res.data);
            dispatch(setCategory(res.data));
        });
    }, [updateUI, dispatch, perPage]);

    const { products, category } = useSelector((state) => state.cart);

    const handleClickCategory = (category) => {
        axios.get(`${api}/category/${category}`).then((res) => {
            dispatch(setProducts(res.data));
            setTotalPage(Math.ceil(res.data.length / perPage))
            setCurrentPage(1)
        });
    };


    const handleSearch = () => {
        setFilteredProduct(searchQuery
            ? products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : null)

    };

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    const visibleProducts = products.slice(startIndex, endIndex)

    return (
        <>
            <Header />
            <div className="fullContainer">
                <section className="leftContainer">
                    <div className='categories'>
                        <h3 className="categoryTitle" onClick={() => {
                            setFilteredProduct(null)
                            setUpdateUI((prevState) => !prevState)
                        }
                        }>All Categories</h3>
                        {category?.map((category, index) => (
                            <h3
                                key={`${category}-${index}`}
                                className="categoryName"
                                onClick={() => {
                                    handleClickCategory(category);
                                }}
                            >
                                {category}
                            </h3>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', maxHeight: "40px" }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products..."
                            className="searchBox"
                        />
                        <button className="searchBtn" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </section>
                <div className="rightContainer">

                    <section>
                        {filteredProduct ?
                            (filteredProduct?.map((product, key) => (
                                <div className="product-container" key={key}>
                                    <img src={product?.image} alt="" />
                                    <h3
                                        onClick={() => { nav(`/product/${key}`) }}
                                    >{product?.title}</h3>
                                    <h2>$ {product?.price}</h2>
                                </div>
                            )))
                            :
                            (visibleProducts?.map((product, key) => (
                                <div className="product-container" key={key}>
                                    <img src={product?.image} alt="" />
                                    <h3 onClick={() => { nav(`/product/${key}`) }}>{product?.title}</h3>
                                    <h2>$ {product?.price}</h2>
                                </div>
                            )))}
                    </section>
                    {
                        !filteredProduct ?
                            (<div className="pagination">
                                {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={currentPage === page ? 'active' : ''}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>)
                            :
                            null
                    }
                </div>
            </div>
        </>
    );
}
