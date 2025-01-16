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
    setIsLoading(true);
    fetch('http://localhost:5000/videos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar los videos');
        }
        return response.json();
      })
      .then((data) => {
        setVideos(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
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
    fetch(`http://localhost:5000/videos/${videoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el video');
        }
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSave = (updatedVideo) => {
    if (updatedVideo.id) {
      fetch(`http://localhost:5000/videos/${updatedVideo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVideo),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al actualizar el video');
          }
          // Actualizamos solo el video editado sin afectar el resto de los videos
          setVideos((prevVideos) =>
            prevVideos.map((video) =>
              video.id === updatedVideo.id ? updatedVideo : video
            )
          );
        })
        .catch((error) => {
          setError(error.message);
        });
    }
    // Después de guardar, cerramos el popup y restablecemos el video actual
    setShowPopup(false);
    setCurrentVideo(null);
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
