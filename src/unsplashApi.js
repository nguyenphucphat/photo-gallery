import axios from "axios";

const unsplashApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getPhotos = (page = 1, size = 4) =>
  unsplashApi.get(
    `/photos?page=${page}&per_page=${size}&client_id=${process.env.REACT_APP_CLIENT_ID}&`
  );

export const getPhotoById = (id) =>
  unsplashApi.get(`/photos/${id}?client_id=${process.env.REACT_APP_CLIENT_ID}`);
