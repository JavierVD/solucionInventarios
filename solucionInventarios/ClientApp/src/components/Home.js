import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from '../../../../node_modules/axios/index';


export default function Home() {
    const [input, setInput] = useState(0);
    const [output, setOutput] = useState(0);
    const [mainProduct, setMainProduct] = useState([]);

    const getCountIn = async () => {
        axios.defaults.withCredentials = true;
        axios.get(
            "http://localhost:5183/api/transaccion/getInCount",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
} }
        ).then((response) => {
            setInput(response.data);
        })
    }

    const getCountOut = async () => {
        axios.defaults.withCredentials = true;
        axios.get(
            "http://localhost:5183/api/transaccion/getOutCount",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            setOutput(response.data);
        })
    }

    const getBestProduct = async () => {
        axios.defaults.withCredentials = true;
        axios.get(
            "http://localhost:5183/api/transaccion/getBestProduct",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            setMainProduct(response.data[0]);
            console.log(response.data[0]);
        })
    }
    useEffect(() => {
        getCountIn();
        getCountOut();
        getBestProduct();

    }, []);

    return (
        <div className="main-div">
            <div className="static-header">
                <span className= "home-text">Home</span>
            </div>
            <div className="in-out-containers">
                <div className="in-container">
                    <div>
                        <span>Entradas</span>
                        <div className="in-out-number">
                            {input}
                        </div>
                    </div>
                </div>
                <div className="out-container">
                    <div>
                        <span>Salidas</span>
                        <div className="in-out-number">
                            { output }
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-container">
                <span>Producto más solicitado</span>
                {(mainProduct) ?
                    <div>
                        
                        <img className="trophy" src="./img/trophy.png" />
                        <span className="text-not-found">{mainProduct.descripcion}</span>
                    </div> :
                    <div>
                        <img className = "box-pic" src = "./img/empty-box.png"/>
                        <span className= "text-not-found" > Sin resultados</span>
                    </div>}
            </div>
        </div>
    );
}
