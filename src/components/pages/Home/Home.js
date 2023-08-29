import TablesList from '../../features/TablesList/TablesList';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchTables } from '../../../redux/tablesRedux';
import LoadSpinner from '../../features/Spinner/Spinner';
import { fetchLoadSpin, getLoadSpin } from '../../../redux/loadSpinRedux';
import { fetchstatusName } from '../../../redux/statusNameRedux';


const Home = () => {

    const [loadSpin, setLoadSpin] = useState(false);

    const dispatch = useDispatch();
  
    useEffect(() => dispatch(fetchTables()), [dispatch]);
    useEffect(() => dispatch(fetchLoadSpin()), [dispatch]);
    useEffect(() => dispatch(fetchstatusName()), [dispatch]);

    const allTables = useSelector(getAllTables);
    const getLoad = useSelector(getLoadSpin);

    useEffect(() => {setLoadSpin(getLoad[0])}, [getLoad]);


    return (
        <div>
            <h2>All tables</h2>
            {!loadSpin && <LoadSpinner />}
            {allTables.map(table => <TablesList key={table.id} {...table} />)}
        </div>
    );
};

export default Home;