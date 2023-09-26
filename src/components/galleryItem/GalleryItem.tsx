import React, { useState } from "react";
import "./galleryItem.css";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Gallery } from "../interfaces";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";

interface GalleryItemProps {
  gallery: Gallery;
}

export default function GalleryItem(props: GalleryItemProps) {
  const { gallery } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  function deleteGallery() {
    axios
    .delete(`/api/v1/galleries/gallery/${gallery.id}`, {headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    }})
    .then((res) => {
      
      window.location.href = "/dashboard";
    })
    .catch((error) => console.error(error));
  }

  return (
    <div className="gallery-item">
      <div>
        <img src={gallery.coverUrl} alt="" />
      </div>
      <div className="gallery-item-flexbox">
        <div > 
          <h3 className="gallery-item-name">{gallery.name}</h3>
          <p>{gallery.description}</p>
        </div>
       
        <div>
          <Link to={`./editgallery/${gallery.id}`} className="gallery-item-icons"><ModeEditIcon /></Link>
          <a href={`../guestlogin/${gallery.id}`} target="_blank" rel="noopener noreferrer" className="gallery-item-icons">
  <IosShareIcon />
</a>
          <button onClick={() => setIsModalOpen(true)} className="gallery-item-icons"><DeleteForeverIcon /></button>
          
        </div>
      </div>
      {isModalOpen && (<div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h4>Are you sure you want to delete this gallery?</h4>
        <div className="delete-modal-actions">
          <button onClick={() => setIsModalOpen(false)} className="cancel-btn">Cancel</button>
          <button onClick={deleteGallery} className="confirm-btn">Confirm</button>
        </div>
      </div>
    </div>)}
    </div>
  );
}
