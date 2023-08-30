import { useParams, Navigate, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { editTableInfo, getTableById } from '../../../redux/tablesRedux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import ShowStatus from '../../features/ShowStatus/ShowStatus';
import { getStatusName } from '../../../redux/statusNameRedux';
import shortid from 'shortid';
import Bill from '../../features/Bill/Bill';

const SingleTable = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const tableData = useSelector(state => getTableById(state, id));
    const allStatus = useSelector(getStatusName);

    const [staTus, setStaTus] = useState(tableData.status);
    const [peopleAm, setPeopleAm] = useState(tableData.peopleAmount);
    const [maxPeopleAm, setmaxPeopleAm] = useState(tableData.maxPeopleAmount)

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(editTableInfo(staTus, id, parseInt(peopleAm), parseInt(maxPeopleAm)));
        navigate('/');
    };
    // if people amount is below 0 or above 10
    if(peopleAm < 0) {
        setPeopleAm(0);
    } else if(peopleAm > 10) {
        setPeopleAm(10);
    };

    // if max people amount is below 0 or above 10
    if(maxPeopleAm < 0) {
        setmaxPeopleAm(0);
    } else if(maxPeopleAm > 10) {
        setmaxPeopleAm(10);
    };

    // if people is more than max people
    if(peopleAm > maxPeopleAm) {
        setPeopleAm(maxPeopleAm);
    };

    // if status is FREE or CLEANING people amount input is 0
    useEffect(() => {
        if(staTus == 'Free' || staTus == 'Cleaning' ) {
        setPeopleAm(0);
        };
    }, [peopleAm, staTus]);



    if(!tableData) return <Navigate to="/" />
    return (
        <Container fluid="md">
            <Row className="my-3">
                <Col><h1>Table {tableData.id}</h1></Col>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Row className="w-25">
                        <Col className="col-2">
                            <Form.Label className="mt-1 fw-bold">Status:</Form.Label>
                        </Col>
                        <Col className="col-10">
                            <Form.Select className="mx-3"
                                aria-label="Status" 
                                onChange={e => setStaTus(e.target.value)}>
                                <option>{staTus}</option>
                                {allStatus.map(stat => <ShowStatus key={shortid()} statusName={stat.statusName} />)};
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="my-3">
                    <Row className="w-25">
                        <Col className="col-2">
                            <Form.Label className="mt-1 fw-bold">People:</Form.Label>
                        </Col>
                        <Col className="col-3 m-0">
                        <Form.Control className="mx-3" 
                            type="text" 
                            placeholder="" 
                            value={peopleAm} 
                            onChange={e => setPeopleAm(e.target.value)} />
                        </Col>
                        <Col className="col-1 mt-1 ms-4">/</Col>
                        <Col className="col-3 m-0">
                        <Form.Control className="mx-3" 
                            type="text" 
                            placeholder="" 
                            value={maxPeopleAm} 
                            onChange={e => setmaxPeopleAm(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
                <Bill bill={tableData.bill}/>
                <Row className="my-3">
                    <Col>
                        <Button variant="primary" type="submit">Update</Button>{' '}
                    </Col>
                </Row>
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