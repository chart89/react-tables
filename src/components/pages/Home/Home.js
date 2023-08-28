import TablesList from "../../features/TablesList/TablesList";
import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/tablesRedux";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { fetchTables } from "../../../redux/tablesRedux";

const Home = () => {

    const dispatch = useDispatch();
  
    useEffect(() => dispatch(fetchTables()), [dispatch]);

    const allTables = useSelector(getAllTables);



    return (
        <div>
            <h2>Tables list</h2>
        {allTables.map(table => <TablesList key={table.id} status={table.id} />)}
        </div>
    );
};

export default Home;