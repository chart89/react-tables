import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';

const NavBar = () => {

    return (
        <Navbar bg="primary" data-bs-theme="dark" className='rounded justify-content-between'>
            <div className={styles.navDiv}>
                <p className='my-auto'>Waiter.app</p>
            </div>
            <div className={styles.navDiv}>
                <Nav>
                    <Nav.Link as={NavLink} to={'/'}><p className={'my-auto ' + styles.link}>Home</p></Nav.Link>
                </Nav>
            </div>
        </Navbar>
    );
};

export default NavBar;
