import Spinner from 'react-bootstrap/Spinner';

const LoadSpinner = () => {

    return (
        <>
        <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
    );
};

export default LoadSpinner;