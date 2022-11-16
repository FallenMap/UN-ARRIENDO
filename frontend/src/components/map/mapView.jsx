import mapboxgl, { Marker } from 'mapbox-gl';
import React, { useLayoutEffect, useRef } from 'react'

export default function MapView({lisitingMarkers}) {
    const containerMap = useRef();

    useLayoutEffect(() => {
        const map = new mapboxgl.Map({
            container: containerMap.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.08311251974894, 4.635978001561783], // starting position [lng, lat]
            zoom: 13, // starting zoom
        }); 
        
        
    }, [containerMap])

    

    return (
        <div ref={containerMap} style={{width:"100%", height:"100%"}}>

        </div>
    )
}
