import React, { useState, useEffect, useId } from "react";

// AddAlbumBar component
function AddAlbumBar({ onAddAlbum }) {
  const [newAlbumTitle, setNewAlbumTitle] = useState("");

  const handleAddAlbum = () => {
    onAddAlbum(newAlbumTitle);
    setNewAlbumTitle("");
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl">Add Album</h2>
      <div className="flex">
        <input
          type="text"
          placeholder="Album Title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          className="p-2 border border-gray-200 rounded-l-md"
        />
        <button
          onClick={handleAddAlbum}
          className="bg-green-500 text-white px-4 py-2 rounded-r-md"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// UpdateAlbumBar component
function UpdateAlbumBar({ album, onUpdateAlbum }) {
  const [newAlbumTitle, setNewAlbumTitle] = useState(album.title);

  const handleUpdateAlbum = () => {
    onUpdateAlbum({ ...album, title: newAlbumTitle });
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl">Update Album</h2>
      <div className="flex">
        <input
          type="text"
          placeholder="New Album Title"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          className="p-2 border border-gray-200 rounded-l-md"
        />
        <button
          onClick={handleUpdateAlbum}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
        >
          Update
        </button>
      </div>
    </div>
  );
}

// Main App component
function App() {
  const [albums, setAlbums] = useState([]);
  const [updatedAlbum, setUpdatedAlbum] = useState(null);

  useEffect(() => {
    // Fetch albums from the API
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data);
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  const handleAddAlbum = (newAlbumTitle) => {
    // Add a new album (dummy request)
    const id = Math.floor(Math.random() * 100000);
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        title: newAlbumTitle,
        userId: id, // Replace with the desired user ID
        id: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbums([...albums, data]);
      })
      .catch((error) => {
        console.error("Error adding album:", error);
      });
  };

  const handleUpdateAlbum = (updatedAlbum) => {
    // Update an album (dummy request)
    fetch(`https://jsonplaceholder.typicode.com/albums/${updatedAlbum.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedAlbum),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedAlbums = albums.map((album) =>
          album.id === data.id ? data : album
        );
        setAlbums(updatedAlbums);
        setUpdatedAlbum(null);
      })
      .catch((error) => {
        console.error("Error updating album:", error);
      });
  };

  const handleDeleteAlbum = (albumId) => {
    // Delete an album (dummy request)
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: "DELETE",
    })
      .then(() => {
        const filteredAlbums = albums.filter((album) => album.id !== albumId);
        setAlbums(filteredAlbums);
      })
      .catch((error) => {
        console.error("Error deleting album:", error);
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Albums</h1>
      <AddAlbumBar onAddAlbum={handleAddAlbum} />
      {albums.map((album) => (
        <div
          key={album.id}
          className="border border-gray-200 p-4 rounded-md shadow-md mb-4"
        >
          <h3 className="text-lg">{album.title}</h3>
          <div className="flex mt-4">
            <button
              onClick={() => handleDeleteAlbum(album.id)}
              className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => setUpdatedAlbum(album)}
              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
            >
              Update
            </button>
          </div>
          {updatedAlbum?.id === album.id && (
            <UpdateAlbumBar
              album={updatedAlbum}
              onUpdateAlbum={handleUpdateAlbum}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
