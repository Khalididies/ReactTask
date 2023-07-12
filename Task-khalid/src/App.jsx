import reactLogo from "./assets/react.svg";
import "./App.css";
import ProductList from "./Components/ProductList";
import ImageGallery from "./Components/ImageGallery";
import {Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      <Link to='ProductList'>ProductList</Link> <br />
      <Link to='ImageGallery'>ImageGallery</Link> <br />

      <Routes>
            <Route path='ProductList' element={<ProductList />} />
            <Route path='ImageGallery' element={<ImageGallery />} />
        </Routes>

    </div>
  );
}

export default App;
