import { useParams, Navigate, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { editTableInfo, getTableById } from '../../../redux/tablesRedux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  useEffect, useState } from 'react';
import ShowStatus from '../../features/ShowStatus/ShowStatus';
import { getStatusName } from '../../../redux/statusNameRedux';
import shortid from 'shortid';
import clsx from 'clsx';
import styles from './SingleTable.module.scss';
import { useForm } from "react-hook-form";
import { fetchTables } from '../../../redux/tablesRedux';
import { fetchstatusName } from '../../../redux/statusNameRedux';


const SingleTable = () => {

    const { id } = useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => dispatch(fetchTables()), [dispatch]);
    useEffect(() => dispatch(fetchstatusName()), [dispatch]);


    const tableData = useSelector(state => getTableById(state, id));
    const allStatus = useSelector(getStatusName);
    const { register, handleSubmit: validate, formState: { errors } } = useForm();


    const [staTus, setStaTus] = useState('Free');
    const [peopleAm, setPeopleAm] = useState(0);
    const [maxPeopleAm, setmaxPeopleAm] = useState(1);
    const [dispBill, setDispBill] = useState(false);
    const [billAm, setBillAm] = useState(0);
    const [statError, setStatError] = useState(false);

    useEffect(() => {
        if (tableData) {
          setStaTus(tableData.status);
          setPeopleAm(tableData.peopleAmount);
          setmaxPeopleAm(tableData.maxPeopleAmount);
          setBillAm(tableData.bill);
        } 
      }, [tableData]);


    const handleSubmit = e => {
        setStatError(!staTus);
        dispatch(editTableInfo(staTus, id, parseInt(peopleAm), parseInt(maxPeopleAm), parseInt(billAm)));
        navigate('/');
    };

    
    const handlePeopleAm = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= maxPeopleAm && value <= 10) {
          setPeopleAm(value);
        }
      };
    
      const handleMaxPeopleAm = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value >= peopleAm && value <= 10) {
          setmaxPeopleAm(value);
        }
      };

      const handleBill = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setBillAm(value);
        } else if(isNaN(value)){
            setBillAm(0);
        };
      };

    // if status is FREE or CLEANING people amount input is 0
    useEffect(() => {
        if(staTus === 'Free' || staTus === 'Cleaning' ) {
        setPeopleAm(0);
        };
    }, [peopleAm, staTus]);

    //if there are not clients, bill should be hidden
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
            <Form onSubmit={validate(handleSubmit)}>
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
                            {statError && <small className="d-block form-text text-danger mt-0 mb-3">Category can't be empty</small>} 
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="my-3">
                    <Row className={styles.rowDiv}>
                        <Col className="col-3 me-3">
                            <Form.Label className="mt-1 fw-bold">People:</Form.Label>
                        </Col>
                        <Col className={'col-3 ' + styles.impDiv}>
                        <Form.Control className={styles.billImput} 
                            type="number" 
                            placeholder="" 
                            value={peopleAm} 
                            onChange={handlePeopleAm} />
                        </Col>
                        <Col className={'col-1 ' + styles.slashDiv}>/</Col>
                        <Col className={'col-3 ' + styles.impDiv}>
                        <Form.Control className={styles.billImput} 
                            type="number" 
                            placeholder="" 
                            value={maxPeopleAm} 
                            onChange={handleMaxPeopleAm} />
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
                        {...register("billAm", { required: true})}
                            type="number" 
                            placeholder="" 
                            value={billAm} 
                            onChange={handleBill}
                         />
                         {errors.billAm && <small className="d-block form-text text-danger mt-2">This field is required</small>}
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

