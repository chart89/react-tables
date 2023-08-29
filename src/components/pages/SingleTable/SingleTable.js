import { useParams, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getTableById } from '../../../redux/tablesRedux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import ShowStatus from '../../features/ShowStatus/ShowStatus';
import { getStatusName } from '../../../redux/statusNameRedux';
import shortid from 'shortid';

const SingleTable = () => {

    const { id } = useParams();

    const tableData = useSelector(state => getTableById(state, id));

    const [staTus, setStaTus] = useState(tableData.status);

    const allStatus = useSelector(getStatusName);


    if(!tableData) return <Navigate to="/" />
    return (
        <Container fluid="md">
            <Row className="my-3">
                <Col><h1>Table {tableData.id}</h1></Col>
            </Row>
            <Form>
                <Form.Group>
                    <Row className="w-25">
                        <Col className="col-2">
                            <Form.Label className="mt-1 fw-bold">Status</Form.Label>
                        </Col>
                        <Col className="col-10">
                            <Form.Select
                                aria-label="Status" 
                                onChange={e => setStaTus(e.target.value)}>
                                <option>{staTus}</option>
                                {allStatus.map(stat => <ShowStatus key={shortid()} statusName={stat.statusName} />)};
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
        
    );
};

export default SingleTable;

/*
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

*/