import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import SingleTable from './components/pages/SingleTable/SingleTable';
import NotFound from './components/pages/NotFound/NotFound';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';




function App() {


  return (
    <Container>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<SingleTable />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />  
    </Container>
  );
}

export default App;
