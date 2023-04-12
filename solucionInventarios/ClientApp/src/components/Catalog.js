import React, { useState, useEffect } from 'react';
import axios from '../../../../node_modules/axios/index';
import Card from './Card';
import { Container } from 'reactstrap';
export default function Catalog() {
    const [products, setProducts] = useState(null);

    const getProducts = async () => {

        axios.get(
            "http://localhost:5183/api/articulo/getCatalog",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            setProducts(response.data);
        })
    }

    useEffect(() => {
        getProducts()
    }, []);
    return (
        <div className="main-div">
            <div className="static-header">
                <span className="home-text">Catalog</span>
            </div>

            <div className= "card-container">
                {
                    products?.map((e, idx) => {
                        console.log(e);
                        return <Card key={idx} picture={e.uri} left={e.stock} nametop={e.descripcion} namebot={e.id} imgBrand={e.imgBrand} icon={ e.icon } cost={"ID: " + e.id} />
                    })
                }
            </div>
        </div>
    );
}