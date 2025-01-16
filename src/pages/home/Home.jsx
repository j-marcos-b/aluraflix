import { useEffect, useState } from 'react';
import VideoCard from '../../componentes/videoCard/VideoCard';
import Banner from '../../componentes/banner/Banner';
import Header from '../../componentes/header/Header';
import Footer from '../../componentes/footer/Footer';
import Popup from '../../componentes/popup/Popup';
import styles from './Home.module.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const fetchVideos = () => {
    // Verificar si los videos ya están en localStorage
    const storedVideos = JSON.parse(localStorage.getItem('videos'));

    if (storedVideos) {
      // Si los datos ya están en localStorage, usarlos directamente
      setVideos(storedVideos);
      setIsLoading(false);
    } else {
      // Si no están en localStorage, cargar desde db.json
      fetch('./db.json') // Aquí se asume que el archivo db.json está en la raíz del proyecto
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al cargar los videos');
          }
          return response.json();
        })
        .then((data) => {
          // Guardar los videos en localStorage para futuras visitas
          localStorage.setItem('videos', JSON.stringify(data.videos));
          setVideos(data.videos);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleEdit = (videoId) => {
    const videoToEdit = videos.find((video) => video.id === videoId);
    setCurrentVideo(videoToEdit);
    setShowPopup(true);
  };

  const handleDelete = (videoId) => {
    // Actualizar videos en localStorage
    const updatedVideos = videos.filter((video) => video.id !== videoId);
    setVideos(updatedVideos);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));

    // Aquí también puedes hacer un "fetch" para eliminar en el backend si es necesario
  };

  const handleSave = (updatedVideo) => {
    if (updatedVideo.id) {
      const updatedVideos = videos.map((video) =>
        video.id === updatedVideo.id ? updatedVideo : video
      );
      setVideos(updatedVideos);
      localStorage.setItem('videos', JSON.stringify(updatedVideos)); // Actualizar localStorage

      // Después de guardar, cerramos el popup y restablecemos el video actual
      setShowPopup(false);
      setCurrentVideo(null);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setCurrentVideo(null);
  };

  if (isLoading) {
    return <div>Cargando videos...</div>;
  }

  if (error) {
    return <div>Hubo un error: {error}</div>;
  }

  const frontEndVideos = videos.filter((video) => video.category === 'front end');
  const backEndVideos = videos.filter((video) => video.category === 'back end');
  const innovacionGestionVideos = videos.filter(
    (video) => video.category === 'innovacion y gestion'
  );

  return (
    <div>
      <Header />
      <Banner />
      <div className={styles.container_principal}>
        {frontEndVideos.length > 0 && (
          <div id={styles.primerHijo} className={styles.container}>
            <h3 className={styles.front}>FRONT END</h3>
            <div className={styles.videoCardContainerWrapper}>
              {frontEndVideos.map((video) => (
                <div
                  id={styles.front}
                  className={styles.videoCardContainer}
                  key={video.id} // Mantener la clave constante
                >
                  <VideoCard
                    video={video}
                    onEdit={() => handleEdit(video.id)}
                    onDelete={() => handleDelete(video.id)}
                    isEdited={currentVideo?.id === video.id} // Solo edita el video seleccionado
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {backEndVideos.length > 0 && (
          <div className={styles.container}>
            <h3 className={styles.back}>BACK END</h3>
            <div className={styles.videoCardContainerWrapper}>
              {backEndVideos.map((video) => (
                <div
                  id={styles.back}
                  className={styles.videoCardContainer}
                  key={video.id}
                >
                  <VideoCard
                    video={video}
                    onEdit={() => handleEdit(video.id)}
                    onDelete={() => handleDelete(video.id)}
                    isEdited={currentVideo?.id === video.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {innovacionGestionVideos.length > 0 && (
          <div className={styles.container}>
            <h3 className={styles.innovacion}>INNOVACIÓN Y GESTIÓN</h3>
            <div className={styles.videoCardContainerWrapper}>
              {innovacionGestionVideos.map((video) => (
                <div
                  id={styles.innovacion}
                  className={styles.videoCardContainer}
                  key={video.id}
                >
                  <VideoCard
                    video={video}
                    onEdit={() => handleEdit(video.id)}
                    onDelete={() => handleDelete(video.id)}
                    isEdited={currentVideo?.id === video.id}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {videos.length === 0 && <div>No hay videos disponibles</div>}
      </div>
      <Footer />
      {showPopup && (
        <Popup
          video={currentVideo}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Home;
