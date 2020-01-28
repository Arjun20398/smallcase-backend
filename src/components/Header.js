import React, {useState} from 'react'
import {Navbar, NavbarBrand, NavbarToggler, Nav , NavItem, NavbarText, NavLink, Collapse} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    
    return (
        <Navbar className="main_color" expand="md">
            <NavbarBrand href="/"><FontAwesomeIcon icon={faUser}/></NavbarBrand>
            <NavbarToggler onClick={toggle} className="button_color"><FontAwesomeIcon icon={faBars}/></NavbarToggler>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/holding">Holding</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">Portfolio</NavLink>
                    </NavItem>
                
                </Nav>
                <NavbarText> Name : {props.name} </NavbarText>
                <NavbarText> -Credits : {props.credits}</NavbarText>
            </Collapse>
        </Navbar>
    )
}

export default Header
