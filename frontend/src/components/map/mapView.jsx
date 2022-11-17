import mapboxgl from 'mapbox-gl';
import React, { useLayoutEffect, useRef } from 'react'
import { formAllListings } from '../../adapters/formAdapters';
import { URL_BACKEND } from '../../constantes';

export default function MapView({ listings }) {
    const containerMap = useRef();

    useLayoutEffect(() => {
        const map = new mapboxgl.Map({
            container: containerMap.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.08311251974894, 4.635978001561783], // starting position [lng, lat]
            zoom: 13, // starting zoom
        });

        map.on('load', () => {
            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': listings.map(listing => {
                        if (listing.location && listing.active) {
                            let imgSrc = listing[formAllListings.imagenes][0] ? `${URL_BACKEND}/images/listing/` + listing[formAllListings.imagenes][0] : "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"
                            let icon = listing[formAllListings.tipo] === 'Room' ? 'bedroom' : 'building'
                            return {
                                'type': 'Feature',
                                'properties': {
                                    'description': `<center><img src=${imgSrc} style="max-width:100px; max-height:100px"></center><br><strong>${listing.title}</strong><p>${listing.description}</p><p>Precio: ${listing.price}&nbsp;COP</p><a href=/listing/details/${listing._id}><button>Ver más detalles</button></a>`,
                                    'icon': `${icon}`
                                },
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [listing.location.coordinates[0], listing.location.coordinates[1]]
                                }
                            }
                        } else {
                            return {}
                        }

                    })
                }
            });

            map.loadImage('https://img.icons8.com/emoji/512/person-in-bed.png', (error, image) => {
                if (error) throw error;
                // Add the loaded image to the style's sprite with the ID 'kitten'.
                map.addImage('bedroom', image);
            });

            map.loadImage('https://cdn-icons-png.flaticon.com/512/1259/1259768.png', (error, image) => {
                if (error) throw error;
                // Add the loaded image to the style's sprite with the ID 'kitten'.
                map.addImage('building', image);
            });


            // Add a layer showing the places.
            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': '{icon}',
                    'icon-allow-overlap': true,
                    'icon-size': 0.05,
                }
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on('click', 'places', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'places', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
            });
        });

    }, [containerMap, listings])

    return (
        <div ref={containerMap} style={{ width: "100%", height: "100%" }}>

        </div>
    )
}
