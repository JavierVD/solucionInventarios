import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import './NavBar.css';

export default function NavBar() {

    return (
        <div className="navbar-position-left">
            <NavLink tag={ Link } to="/">
                <div className="navbar-buttons" onClick={() => { }}>
                    <img className="navbar-pics" src="./img/home.png" />
                </div>
            </NavLink>
            <NavLink tag={Link} to="/catalog">
                <div className = "navbar-buttons">
                    <img className="navbar-pics" src = "./img/catalogue.png"/>
                    </div>
            </NavLink>
            <NavLink tag={Link} to="/ins">
                <div className="navbar-buttons">
                    <img className="navbar-pics" src="./img/input.png" />
                </div>
            </NavLink>
            <NavLink tag={Link} to="/outs">
                <div className="navbar-buttons">
                    <img className="navbar-pics" src="./img/output.png" />
                </div>
            </NavLink>
        </div>
    );
}