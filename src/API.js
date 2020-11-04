export default {
  getAllPhotos: async () => {
    const result = await fetch("https://localhost:44305/api/photos");
    return await result.json();
  },
  filterPhotosByLabel: async (query) => {
    const result = await fetch(`https://localhost:44305/api/photos/${query}`);
    return await result.json();
  },
  addPhoto: async (body) => {
    const json = JSON.stringify(body);
    const result = await fetch("https://localhost:44305/api/photos", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: json,
    });

    return result;
  },
  deletePhoto: async (id) => {
    await fetch(`https://localhost:44305/api/photos/${id}`, {
      method: "DELETE",
    });
  },
};
