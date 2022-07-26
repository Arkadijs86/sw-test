import { Route, Routes } from 'react-router-dom';
import Add from './components/add/add';
import Footer from './components/footer/footer';
import Products from './components/products/products';

const App = () => {

  return (
  <div>
    <Routes>
    <Route strict exact path="/" element={<Products/>}/>
    <Route strict exact path="/add-product" element={<Add/>}/>
   </Routes>
   <Footer/>
  </div>
  );
};

export default App;
