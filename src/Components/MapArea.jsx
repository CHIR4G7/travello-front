import React, { useEffect, useRef } from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import { FaMapMarker } from "react-icons/fa";
import { useState } from "react";
// import PopUpInfo from "./PopUpInfo";

import { useContext } from "react";
import { Pins_Context } from "../store/Pin_objs";
import Register from "./Register";
import Login from "./Login";
import './MapArea.css'

const MapArea = () => {

  const storage = window.localStorage;

  // THE CONTEXT AB ISME DAALTE RAHO AUR NIKALTE RAHO JAHAN CHAHIYE
  const context = useContext(Pins_Context);

  //ALL THE PINS IN CONTEXT
  const pins = context.pins;
  const currentUser = context.currentUser;
  const currentPlaceId = context.currentPlaceId;
  const newPlaceId = context.newPlaceId;
  const handleAddClick = context.handleAddClick;
  const handleSubmit = context.handleSubmit;
  const handleMarkerClick = context.handleMarkerClick;
  const setcurrentPlaceId = context.setcurrentPlaceId;
  const setNewPlaceId = context.setNewPlaceId;
  const showLogin = context.showLogin;
  const showRegister = context.showRegister;

  const [showPopup, setShowPopup] = useState(true);



  // for the form frilds
  const title = useRef();
  const description = useRef();
  const rating = useRef();

  //customs user pins

  // const custompins = pins.filter((pin)=>{
  //   return currentUser!=null && pin.username!=currentUser
  // });
  // console.log(custompins);

  return (
    <div>
      <Map
        initialViewState={{
          longitude: 76.7794,
          latitude: 30.7333,
          zoom: 13,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_API_KEY}`}
        onDblClick={handleAddClick}
      >
        
        {pins.map((pin) => (
          <>
            <Marker longitude={pin.longitude} latitude={pin.latitude}>
              <FaMapMarker size={30} onClick={() => handleMarkerClick(pin)} />
            </Marker>
          </>
        ))}


        {/* add and close popups on each and every marker */}
        {currentPlaceId != null && (
          <Popup
            longitude={currentPlaceId.longitude}
            latitude={currentPlaceId.latitude}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setcurrentPlaceId(null)}
          >
            <div className="popupinfo">
              <label className="info-place">Place : </label>
              <span className="place">{currentPlaceId.title}</span>
              <br></br>
              <label className="info-review">Review : </label>
              <span className="review">{currentPlaceId.description}</span>
              <br></br>
              <label className="info-rating">Rating : </label>
              <span className="rating">{currentPlaceId.rating}</span>
              <br></br>
              <label className="info-info">Information : </label>
              <span className="info">all about this sector.</span>
              <br></br>
              <label className="info-by">Create by :</label>
              <span className="by">{currentPlaceId.username}</span>
            </div>
          </Popup>
        )}

        {/* add new place */}
        {newPlaceId != null && (
          <Popup
            longitude={newPlaceId.longitude}
            latitude={newPlaceId.latitude}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlaceId(null)}
          >
            <form onSubmit={handleSubmit} className="pop-form">
              <label>place : </label>
              <input
                type="text"
                placeholder="place Name"
                name="title"
                ref={title}
              />
              <br></br>
              <label>Reviews : </label>
              <input
                type="text"
                placeholder="your review"
                name="description"
                ref={description}
                className="rate"
              />
              <br></br>
              <label>Rating : </label>
              <input type="number" max={5} min={0} name="rating" ref={rating} />
              <br></br>
              <center><button className='add' type="submit">Add</button></center>
            </form>
          </Popup>
        )}
        {showRegister &&  <Register/>}
        {showLogin && <Login myStorage={storage}/>}
       
      </Map>
    </div>
  );
};

export default MapArea;
