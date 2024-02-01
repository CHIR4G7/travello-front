import { createContext } from "react";
import { useState,useEffect } from "react";
import axios from "axios";

export const Pins_Context = createContext({
    pins: [],
    currentUser : null,
    currentPlaceId: null,
    newPlaceId: null,
    handleMarkerClick : ()=>{},
    handleAddClick : ()=>{},
    handleSubmit: ()=>{},
    setNewPlaceId: ()=>{},
    setcurrentPlaceId: ()=>{},
    showRegister: null,
    showLogin: null,
    setShowLogin: ()=>{},
    setShowRegister: ()=>{},
    setCurrentUser: ()=>{},
    storage : null,
    handleLogOut: ()=>{},
    url: null
})

export const Pins_Context_Provider = ({children})=>{
    const [pins, setPins] = useState([]);
    const [currentUser,setCurrentUser] = useState(null);
    const [currentPlaceId, setcurrentPlaceId] = useState(null);
    const [newPlaceId, setNewPlaceId] = useState(null);
    const [showRegister,setShowRegister] = useState(false);
  const [showLogin,setShowLogin] = useState(false);
  const storage = window.localStorage;
  const url = 'https://travelloapi.onrender.com'

    useEffect(() => {
        const getPins = async () => {
          try {
            const response = await axios.get(
              `${url}/api/pin/getallpins`
            );
            setPins(response.data);
          } catch (err) {
            console.log(err);
          }
        };
        getPins();
      }, [pins]);

      const handleMarkerClick = (pin) => {
        setcurrentPlaceId(pin);
      };

      const handleAddClick = (event) => {
        const longitude = event.lngLat.lng;
        const latitude = event.lngLat.lat;
        setNewPlaceId({
          longitude: longitude,
          latitude: latitude,
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        setNewPlaceId(null);
        const newPin = {
            username: currentUser,
            title: event.target[0].value,
            description: event.target[1].value,
            rating: event.target[2].value,
            latitude: newPlaceId.latitude,
            longitude: newPlaceId.longitude,
          };
          try {
            const response = await axios.post(
              `${url}/api/pin/create`,
              newPin
            );
            setPins([...pins, newPin]);
          } catch (err) {
            console.log(err);
          }
        };

        const handleLogOut = ()=>{
            storage.removeItem('user')
            setCurrentUser(null);
        }

    return (
        <Pins_Context.Provider value={{
            pins:pins,
            currentUser : currentUser,
            currentPlaceId : currentPlaceId,
            newPlaceId: newPlaceId,
            handleMarkerClick : handleMarkerClick,
            handleAddClick: handleAddClick,
            handleSubmit: handleSubmit,
            setNewPlaceId: setNewPlaceId,
            setcurrentPlaceId: setcurrentPlaceId,
            showRegister: showRegister,
            showLogin: showLogin,
            setShowLogin: setShowLogin,
            setShowRegister: setShowRegister,
            setCurrentUser: setCurrentUser,
            storage: storage,
            handleLogOut : handleLogOut,
            url: url
        }}>
            {children}
        </Pins_Context.Provider>
    
    )
}