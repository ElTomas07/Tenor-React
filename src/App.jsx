import React, { useState, useEffect } from 'react';
import './App.css'

const API_KEY = "d59ZAY980DorGJk3vAYtU2bC32Y6jIjD";
const TRENDING_ENDPOINT = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20`;
const SEARCH_ENDPOINT = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=20`;


function App() {

  const [gifs, setGifs] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchGifs(TRENDING_ENDPOINT);
  }, []);

  const fetchGifs = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setGifs([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const endpoint = `${SEARCH_ENDPOINT}&q=${searchInput}`;
    fetchGifs(endpoint);
  };

  return (
    <div>
      <h1 className='title'>Tenor Gifs</h1>
      <form onSubmit={handleSearch} className='container'>
        <input
          className='input'
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar en Tenor"
        />
        <button className='search' type="submit">Search</button>
      </form>
      <div id="containers">
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} className="gif" />
        ))}
      </div>
    </div>
  );
};

export default App;
