import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavBar from './NavBar';
import { NavMenu} from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
        <div>
            <NavBar/>
            <Container background="https://i.ibb.co/XbvqjFN/background-Pro.png">
              {this.props.children}
            </Container>
        </div>
    );
  }
}
