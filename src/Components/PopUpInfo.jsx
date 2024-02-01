import React from 'react'
import './PopUpInfo.css'

const PopUpInfo = (props) => {
  return (
    <div className="popupinfo">
        <label>Place</label>
        <h4 className="place">{props.pinobj.title}</h4>
        <label>Review</label>
        <span>{props.pinobj.description}</span>
        <label>Rating</label>
        <span>{props.pinobj.rating}</span>
        <label>Information</label>
        <span>all about this sector.</span>
        <label>Create by :</label>
        <span>{props.pinobj.username}</span>
    </div>
  )
}

export default PopUpInfo
