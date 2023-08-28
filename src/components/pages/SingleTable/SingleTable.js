import { useParams, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const SingleTable = () => {

    const { id } = useParams();
    const tableData = useSelector(state => getTableById(state, id));


    if(!tableData) return <Navigate to="/" />
    return (
        <Container fluid="md">
            <Row className="my-3">
                <Col><h1>Table {tableData.id}</h1></Col>
            </Row>
            <Row className="my-3">
                <Col><span className="fw-bolder">Status: </span>{tableData.status}</Col>
            </Row>
            <Row className="my-3">
                <Col><span className="fw-bolder">People: </span> {tableData.peopleAmount} / {tableData.maxPeopleAmount}</Col>
            </Row>
            <Row className="my-3">
                <Col><span className="fw-bolder">Bill: $</span>{tableData.bill}</Col>
            </Row>
            <Row className="my-3">
                <Col>
                    <Button variant="primary">Update</Button>{' '}
                </Col>
            </Row>
        </Container>
        
    );
};

export default SingleTable;
