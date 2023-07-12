import React, { useEffect, useState } from 'react'
import "./ProductDetailed.css"
import Header from '../Header/Header'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/products';

function ProductDetailed() {
    const { Id } = useParams();
    const id = Number(Id)
    const [product, setProduct] = useState({})
    useEffect(() => {
        axios.get(`${api}/${id}`).then((res) => {
            console.log(res.data);
            setProduct(res.data);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Header />
            <div class="product-detail-container">
                <div class="product-image">
                    {/*  eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img src={product?.image} alt="Product Image" />
                </div>
                <div class="product-details">
                    <h3>{product?.title}</h3>
                    <p>{product?.description}</p>
                    <div class="product-price">{product?.price}</div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>

        </>
    )
}

export default ProductDetailed