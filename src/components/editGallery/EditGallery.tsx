import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Gallery, Photo } from "../interfaces";

export default function EditGallery() {
  const [photoList, setPhotoList] = useState<string[]>([]);
  const [gallery, setGallery] = useState<Gallery>();
  const [userId, setUserId] = useState(localStorage.getItem("authUserId"));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { id } = useParams();

  const fetchGallery = async () => {
    try {
      const response = await axios.get("/api/v1/galleries/mygallery", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          id,
          userId,
        },
      });
      setGallery(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setPassword(response.data.password);
      setPhotoList(response.data.pictures.map((p: Photo) => p.url));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const addPhoto = () => {
    setPhotoList((prevList) => [...prevList, photoUrl]);
    setPhotoUrl("");
  };

  function updateGallery(e: { preventDefault: () => void }) {
    e.preventDefault();
    
    const galleryData = {
      id,
      userId,
      name,
      description,
      password,
      pictures: photoList,
    };

    axios
      .put("/api/v1/galleries/updategallery", galleryData, {headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }})
      .then((res) => {
        
        window.location.href = "/dashboard";
      })
      .catch((error) => console.error(error));
  }

  const PhotoItem = ({ url, index }: { url: string; index: number }) => (
    <div className="grid-item-photolist">
      <img className="create-gallery-photo" src={url} alt="photo" />
      <button
        onClick={() => setPhotoList(photoList.filter((_, i) => i !== index))}
        className="delete-button"
      >
        <CloseIcon className="close-icon-small" fontSize="small" />
      </button>
    </div>
  );

  return (
    <div className="create-gallery-wrapper">
      <div className="create-gallery-window">
        <Link to="/dashboard" className="create-gallery-close">
          <CloseIcon fontSize="large" />
        </Link>
        <form className="create-gallery-form" onSubmit={updateGallery}>
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
            correct password. If you wish for your gallery to be publicly
            accessible without the necessity of a password, simply leave the
            password field blank.{" "}
          </label>
          <input
            placeholder="Gallery Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
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
                <PhotoItem key={index} url={photoUrl} index={index} />
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Save Gallery
          </button>
        </form>
      </div>
    </div>
  );
}
