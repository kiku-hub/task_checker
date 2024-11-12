import axiosBase from "axios";

type action = "fetchGenres" | "createGenres";

const api = axiosBase.create({
  baseURL: "http://localhost:3001/genres",
  responseType: "json",
});

export const genreRequest: (action: action) => any = async (action: action) => {
  switch (action) {
    case "fetchGenres":
      const fetchGenres = await api.get("/");
      return fetchGenres.data;
    case "createGenres":
      const createGenres = await api.post("/", "Hello World");
      return createGenres.data;
    default:
      return null;
  }
};