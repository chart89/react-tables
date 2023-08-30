import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Bill = ({ bill }) => {

    return (
        <Form.Group className="my-3">
                    <Row className="w-50">
                        <Col className="col-2">
                            <Form.Label className="mt-2 fw-bold">Bill: $</Form.Label>
                        </Col>
                        <Col className="col-2 m-0">
                        <Form.Control className="mx-0" 
                            type="text" 
                            placeholder="" 
                            value={bill} 
                         />
                        </Col>
                    </Row>
                </Form.Group>
    );
};

export default Bill;