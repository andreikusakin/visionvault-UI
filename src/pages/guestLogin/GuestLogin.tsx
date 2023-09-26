import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Picture } from "../../components/interfaces";
import "./guestLogin.css";

export default function GuestLogin() {
  const { id } = useParams();
  const [coverUrl, setCoverUrl] = useState("");
  const [galleryId, setGalleryId] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pictures, setPictures] = useState<Picture[]>([]);

  useEffect(() => {
    axios
      .get(`/api/v1/galleries/guestlogin/${id}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }})
      .then((res) => {
        setGalleryName(res.data.name);
        setGalleryId(res.data.id);
        setCoverUrl(res.data.coverUrl);
        
      })
      .catch((error) => {console.error(error)
      window.location.href = "/404"});
  }, []);

  function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    axios
      .get(`/api/v1/galleries/viewgallery/${galleryId}`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        params: {
          password: password,
          email: email,
        },
      })
      .then((res) => {
        
        setIsError(false);
        setIsSuccess(true);

        setPictures(res.data.pictures);

      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          setIsError(true);
        }
      });
  }

  return (
    <div>
      <div
        className="guest-login-wrapper"
        style={{
          backgroundImage: `url(${coverUrl})`,
        }}
      >
        <div className="guest-login-form">
          <h3 className="gallery-name">{galleryName}</h3>
          <form className="guest-login-form-holder" onSubmit={onSubmit}>
            <label>Enter your email to view this gallery.</label>
            <input
            className="input-field"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>
              Enter password provided by the creator of this gallery.
            </label>
            <input
            className="input-field"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isError && <p>password is incorrect</p>}
            <button className="submit-btn" type="submit">Enter</button>
          </form>
        </div>

        {isSuccess && (
          <div className="pictures">
            <h3 className="gallery-name" style={{ color: "var(--main-text-color)"}}>{galleryName}</h3>
            {[...pictures].reverse().map((picture) => (
              <img src={picture.url} key={picture.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
