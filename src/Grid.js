import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { getPhotos } from "./unsplashApi";
import { Link } from "react-router-dom";
import Header from "./Header";

function Grid() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = useCallback(
    (currentPage) => {
      if (loading) return;
      setLoading(true);
      getPhotos(currentPage)
        .then((response) => {
          if (response.data.length === 0) {
            setHasMore(false);
            return;
          }
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        });
    },
    [loading]
  );

  useEffect(() => {
    console.log("first render");
    if (photos.length === 0) {
      fetchPhotos(1);
    }
  }, [fetchPhotos, photos.length]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        !loading
      ) {
        console.log("fetching more photos");
        fetchPhotos(page + 1);
        setPage(page + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPhotos]);

  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16">
        {photos.map((photo) => (
          <Link
            to={`/photos/${photo.id}`}
            className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="rounded overflow-hidden shadow-md bg-white">
              <img
                src={photo.urls.thumb}
                alt={photo.description || "Photo"}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 text-center">
                <span className="text-sm font-semibold text-gray-800">
                  {photo.user.name}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {loading && (
          <div className="flex justify-center items-center col-span-full py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
          </div>
        )}

        {!hasMore && (
          <div className="text-center col-span-full py-8 text-gray-500">
            <p>No more photos to load</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Grid;
