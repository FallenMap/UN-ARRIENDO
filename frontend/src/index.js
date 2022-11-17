import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import {App} from './App';
import mapboxgl from 'mapbox-gl';
import { API_KEY_MAPBOX } from './constantes';
 
mapboxgl.accessToken = API_KEY_MAPBOX;




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
);


