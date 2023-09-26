import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./createGallery.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateGallery() {
  const [photoList, setPhotoList] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const addPhoto = () => {
    setPhotoList((prevList) => [...prevList, photoUrl]);
    setPhotoUrl("");
  };

  const deletePhoto = (index: number) => {
    const newPhotoList = [...photoList];
    newPhotoList.splice(index, 1);
    setPhotoList(newPhotoList);
  };

  const userId = localStorage.getItem("authUserId");

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const galleryData = {
      userId: userId,
      name: name,
      description: description,
      password: password,
      pictures: photoList,
    };

    axios
      .post("/api/v1/galleries/creategallery", galleryData, {headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }})
      .then((res) => {
        
        window.location.href = "/dashboard";
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="create-gallery-wrapper">
      <div className="create-gallery-window">
        <Link to="/dashboard" className="create-gallery-close">
          <CloseIcon fontSize="large" />
        </Link>
        <form className="create-gallery-form" onSubmit={onSubmit}>
          <input
            placeholder="Gallery Name"
            autoComplete="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />

          <input
            placeholder="Description"
            autoComplete="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
          <label>
            Incorporate a password security measure for your gallery, ensuring
            that the gallery's content can be accessed only upon entering the
            correct password.
          </label>
          <input
            placeholder="Gallery Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />

          <input
            placeholder="Link to Photo"
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input-field"
          />
          <button type="button" onClick={addPhoto} className="submit-btn">
            Add Photo
          </button>
          <div className="photo-list">
            <div className="photo-list-grid">
              {photoList.map((photoUrl, index) => (
                <div className="grid-item-photolist" key={index}>
                  <img
                    className="create-gallery-photo"
                    src={photoUrl}
                    alt="photo"
                  />
                  <button
                    onClick={() =>
                      setPhotoList(photoList.filter((url, i) => i !== index))
                    }
                    className="delete-button"
                  >
                    <CloseIcon className="close-icon-small" fontSize="small" />
                  </button>
                </div>
              ))}
            </div>
          </div>
                      
          <button type="submit" className="submit-btn">
            Create Gallery
          </button>
        </form>
      </div>
    </div>
  );
}
