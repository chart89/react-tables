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
import clsx from 'clsx';
import styles from './SingleTable.module.scss';

const SingleTable = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const tableData = useSelector(state => getTableById(state, id));
    const allStatus = useSelector(getStatusName);

    const [staTus, setStaTus] = useState(tableData.status);
    const [peopleAm, setPeopleAm] = useState(tableData.peopleAmount);
    const [maxPeopleAm, setmaxPeopleAm] = useState(tableData.maxPeopleAmount);
    const [dispBill, setDispBill] = useState(false);
    const [billAm, setBillAm] = useState(tableData.bill);


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(editTableInfo(staTus, id, parseInt(peopleAm), parseInt(maxPeopleAm), parseInt(billAm)));
        navigate('/');
    };
    // if people amount is below 0 or above 10
    if(peopleAm < 0) {
        setPeopleAm(0);
    };
    
    if(peopleAm > 10) {
        setPeopleAm(10);
    };

    // if max people amount is below 0 or above 10
    if(maxPeopleAm < 0) {
        setmaxPeopleAm(0);
    }; 
    
    if(maxPeopleAm > 10) {
        setmaxPeopleAm(10);
    };

    // if people is more than max people
    useEffect(() => {
        if(peopleAm > maxPeopleAm) {
        setPeopleAm(maxPeopleAm);
    };
    }, []);

    // if status is FREE or CLEANING people amount input is 0
    useEffect(() => {
        if(staTus === 'Free' || staTus === 'Cleaning' ) {
        setPeopleAm(0);
        };
    }, [peopleAm, staTus]);

    useEffect(() => {
    if(peopleAm < 1) {
        setDispBill(true);
        setBillAm(0);
    } else {
        setDispBill(false);
    };
}, [peopleAm]);



    if(!tableData) return <Navigate to="/" />
    return (
        <Container fluid="md">
            <Row className='row'>
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
                    <Row className={styles.rowDiv}>
                        <Col className="col-2 me-3">
                            <Form.Label className="mt-1 fw-bold">People:</Form.Label>
                        </Col>
                        <Col className={'col ' + styles.impDiv}>
                        <Form.Control className={styles.billImput} 
                            type="text" 
                            placeholder="" 
                            value={peopleAm} 
                            onChange={e => setPeopleAm(e.target.value)} />
                        </Col>
                        <Col className={'col ' + styles.impDiv}>/</Col>
                        <Col className={'col ' + styles.impDiv}>
                        <Form.Control className={styles.billImput} 
                            type="text" 
                            placeholder="" 
                            value={maxPeopleAm} 
                            onChange={e => setmaxPeopleAm(e.target.value)} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="my-3">
                    <Row className="w-25">
                        <Col className="col-2">
                            <Form.Label className="mt-1 fw-bold">Bill:</Form.Label>
                        </Col>
                        <Col className="col-1 mt-1">$</Col>
                        <Col className={'col ' + styles.impDiv}>
                        <Form.Control className={clsx(styles.billImput, dispBill && 'd-none')} 
                            type="text" 
                            placeholder="" 
                            value={billAm} 
                            onChange={e => setBillAm(e.target.value)}
                         />
                        </Col>
                    </Row>
                </Form.Group>
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
