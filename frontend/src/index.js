import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import {App} from './App';
import mapboxgl from 'mapbox-gl';
 
mapboxgl.accessToken = 'pk.eyJ1Ijoiamhyb2RyaWd1ZXppIiwiYSI6ImNsYTRya2ptZTBldTgzb214N2FzdXN6eDYifQ.5q8fw5_B3HHF_61_TfDqkQ';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>
);


