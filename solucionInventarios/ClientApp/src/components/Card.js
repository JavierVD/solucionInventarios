import './Card.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { useEffect, useState } from 'react';
export default function Cards({ picture, left, nametop, namebot, imgBrand, icon }) {
    const [color, setColor] = useState("black")
    const validateStock = () => {
        if (left >= 5) {
            setColor("red");
        }
    }

    useEffect(() => {
        validateStock()
    }, []);

    return (
        <Card style={{width: "15vw", marginRight: "2%"}}>
            <CardImg style={ {height: '200px'} } src={picture} ></CardImg>
            <img width='20px' style={{position:'absolute', margin: '5px', border: '2px #000', borderRadius: '10%', background: '#FFF' } } src={icon} />
            <CardBody>
                <CardTitle style={{ fontSize: "20px" }}>{nametop}</CardTitle>
                <CardImg style={{ height: '40px' }} src={imgBrand} ></CardImg>
                <CardSubtitle style={{ color: {color} } }>ID: { namebot }</CardSubtitle>
                <CardText>Stock: {left}</CardText>
                {/*<div style={{ display: "flex", alignContent: "center" }}>
                    <Button style={{ width: '49%', marginRight: "2%" }} >Editar</Button>
                    <Button style={{ width: '49%' }}>Eliminar</Button>
                </div>*/}

            </CardBody>
        </Card>
    );
}