import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios"
import './ProductList.css';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setfilteredProducts] = useState(products);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos?query=coffee&per_page=20&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k');
        const data = response.data.results;
        setProducts(data);
        setfilteredProducts(data)
      } catch (error) {
        setError("some error occurred:" + error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    const handleSearchInput = (e) => {
      const term = e.target.value.toLowerCase();
      let filtered = [...products];
      filtered = products.filter((product) =>
        product.user.name.toLowerCase().includes(term)
      );
      setfilteredProducts(filtered);
    };

    useEffect(() => {
      fetchData();
    }, []);
  
    if (loading) {
      return <div id = "loading">Loading...</div>;
    }
  
    if (error) {
      return <div id = "error">Error: {error}</div>;
    }

    return (
      <div>
        <input type="text"  placeholder="Search by name" onChange={handleSearchInput}/>
        
        {filteredProducts.length === 0 ? (<p>No matching products found.</p>) : filteredProducts.map((product) => (
          <div key={product.id}>
            <ProductCard id={product.id} name={product.user.name} description={product.description || product.alt_description } image={product.urls.full} />
          </div>
        ))}
      </div>
    );
  };