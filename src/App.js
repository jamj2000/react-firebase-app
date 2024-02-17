import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const videosCollectionRef = collection(db, "videos");

  const getMovieList = async () => {
    try {
      const {docs} = await getDocs(videosCollectionRef);
      const filteredData = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   getMovieList()
  // });  // Actualizamos página

  const onSubmitMovie = async () => {
    try {
      await addDoc(videosCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "videos", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "videos", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Título peli..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Año estreno..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> 🏆 Recibió un Oscar</label>
        <button onClick={onSubmitMovie}>Nueva peli</button>
      </div>
      <div>
        {movieList.map((peli) => (
             <div key={peli.id}>
             <h1 style={{ color: peli.receivedAnOscar ? "green" : "red" }}>
                 {peli.receivedAnOscar ? '🏆' + peli.title : peli.title}
             </h1>
             <p> Año: {peli.releaseDate} </p>
 
             <input
                 placeholder="new title..."
                 onChange={(e) => setUpdatedTitle(e.target.value)}
                 defaultValue={peli.title}
             />
             <button onClick={() => updateMovieTitle(peli.id)}>
                 ✏️ Actualizar peli
             </button>
 
             <button onClick={() => deleteMovie(peli.id)}>
                 ❌ Eliminar peli
             </button>
 
         </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}> Upload File </button>
      </div>
    </div>
  );
}

export default App;
