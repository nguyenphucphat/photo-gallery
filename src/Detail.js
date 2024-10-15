import React, { useEffect } from "react";
import { getPhotoById } from "./unsplashApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";

function Detail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchPhoto();
    // eslint-disable-next-line
  }, []);

  function fetchPhoto() {
    getPhotoById(id)
      .then((response) => {
        setPhoto(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Header />
      {photo && (
        <div className="mt-20 p-4 flex flex-col items-center md:flex-row md:items-start md:space-x-8">
          <img
            src={photo.urls.full}
            alt={photo.alt_description || "Photo"}
            className="w-full h-auto md:w-1/2 max-w-sm rounded-md"
          />
          <div className="mt-4 md:mt-0 md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">
              Title: {photo.alt_description || "No Photo Title"}
            </h2>
            <p className="text-gray-700 mb-1">By: {photo.user.name}</p>
            <p className="text-gray-600">
              Description: {photo.description || "No description available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
