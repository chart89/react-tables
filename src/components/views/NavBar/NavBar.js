import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    return (
        <Navbar bg="primary" data-bs-theme="dark" className='rounded justify-content-between'>
            <div className='mx-3'>
                <p className='my-auto'>Waiter.app</p>
            </div>
            <div className='mx-3'>
                <Nav>
                    <Nav.Link as={NavLink} to={'/'}><p className='my-auto'>Home</p></Nav.Link>
                </Nav>
            </div>
        </Navbar>
    );
};

export default NavBar;
