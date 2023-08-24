import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import SingleTable from "./components/pages/SingleTable/SingleTable";
import NotFound from "./components/pages/NotFound/NotFound";



function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default App;
