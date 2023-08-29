import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const TablesList = ({ id, status }) => {


    return (
        <div className="row border-bottom my-2">
            <div className="col-1">
                <h5 className="my-3">Table {id}</h5>
            </div>
            <div className="col-9">
                <p className="my-3"><span className="fw-bolder">Status:</span> {status}</p>
            </div>
            <div className="col-2 text-end">
                <Nav>
                    <Nav.Link as={NavLink} to={'/table/' + id}><Button variant="primary">Show more</Button>{' '}</Nav.Link>
                </Nav>
            </div>
        </div>
    );
};

export default TablesList;

TablesList.propTypes = {
    id: PropTypes.string,
    status: PropTypes.string,
};