import React, { useEffect, useState } from "react";
import "./dashboard.css";
import GalleryItem from "../../components/galleryItem/GalleryItem";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { Gallery } from "../../components/interfaces";

export default function Dashboard() {
  const [galleriesArray, setGalleriesArray] = useState<Gallery[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isUserId, setIsUserId] = useState(
    localStorage.getItem("authUserId") !== null
  );

  function signOut() {
    localStorage.clear();
    setIsUserId(false);
  }

  

  useEffect(() => {
    axios
      .get("/api/v1/galleries/mygalleries", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        params: {
          userId: localStorage.getItem("authUserId"),
        },
      })
      .then((res) => {
        setGalleriesArray(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="dashboard-wrapper">
      {isUserId ? (
        <>
          <div className="dashboard-menu">
            <a href="/" className="logo-dashboard">
              VisionVault
            </a>
            <div className="dashboard-menu-actions"><Link to="./reports" className="dashboard-menu-btn" >Reports</Link>
            <Link to="/" onClick={signOut} className="dashboard-menu-btn">
              Sign Out
            </Link>
          </div></div>
            
          <div className="dashboard-content">
            <Link to="./creategallery" className="btn-add-gallery">
              Create Gallery
            </Link>
            
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="gallaries-grid">
              {galleriesArray
                .filter((gallery) =>
                  gallery.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((gallery) => (
                  <GalleryItem key={gallery.id} gallery={gallery} />
                ))}
            </div>
            <Outlet />
          </div>
        </>
      ) : (
        <>
          <div className="dashboard-menu">
            <a href="/dashboard" className="logo-dashboard">
              VisionVault
            </a>
          </div>
          <div className="dashboard-content">
            <h3>Sign In to View Your Galleries</h3>
            <a href="/login" className="btn-add-gallery">
              Login
            </a>
          </div>
        </>
      )}
    </div>
  );
}
