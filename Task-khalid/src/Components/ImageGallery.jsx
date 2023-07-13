import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios"
import './ImageGallery.css';

export default function ImageGallery() {
    const [list, setList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [fullImage, setFullImage] = useState(null);

    const getAPIList = async () => {
        try {
          const response = await axios.get('https://api.unsplash.com/search/photos?query=coffee&per_page=20&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k');
          const data = response.data.results;
          setList(data);
        } catch (error) {
          setError("some error occurred:" + error);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        getAPIList();
    }, []);

    if (loading) {
      return <div id = "loading">Loading...</div>;
    }
  
    if (error) {
      return <div id = "error">Error: {error}</div>;
    }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      
      {list &&
        list.map((e, key) => (
          <div key={key} style={{ cursor: "pointer" }} 
          onClick={() => {
            setFullImage(e.urls.full);
          }}>

          <img src={e.urls.full} width={"300px"} height={"300px"} />
          </div>
        ))}

      {fullImage && 
      (<img style={{ zIndex: 100, position: "fixed", top: 0, left: 0 }} src={fullImage} width={"100%"} height={"100%"}
          onClick={() => {
            setFullImage(null);
          }}
        />
      )}
    </div>
  )
}
