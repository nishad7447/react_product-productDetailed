import ProductList from './components/ProductList/ProductList'
import './App.css';
import ProductDetailed from './components/ProductDetailed/ProductDetailed';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<ProductList/>} />
      <Route path='/product/:Id'  element={<ProductDetailed  />} />
    </Routes>
    </>
    );
}

export default App;
