import PropTypes from 'prop-types';

const ShowStatus = ({statusName}) => {

    return (
        <option  value={statusName}>{statusName}</option>
    )
}

export default ShowStatus;

ShowStatus.propTypes = {
    statusName: PropTypes.string,
};