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

    useEffect(() => {
        const storedVideos = localStorage.getItem('videos');

        if (storedVideos) {
            setVideos(JSON.parse(storedVideos));
            setIsLoading(false);
        } else {
            fetch('https://6789b5cfdd587da7ac277178.mockapi.io/api/v1/videos')
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Error al cargar los videos desde la API');
                    }
                    return res.json();
                })
                .then(data => {
                    localStorage.setItem('videos', JSON.stringify(data));
                    setVideos(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                });
        }
    }, []);

    const handleEdit = (videoId) => {
        const videoToEdit = videos.find((video) => video.id === videoId);
        setCurrentVideo(videoToEdit);
        setShowPopup(true);
    };

    const handleDelete = (videoId) => {
        const updatedVideos = videos.filter((video) => video.id !== videoId);
        setVideos(updatedVideos);
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
    };

    const handleSave = (updatedVideo) => {
        const updatedVideos = videos.map((video) =>
            video.id === updatedVideo.id ? updatedVideo : video
        );
        setVideos(updatedVideos);
        localStorage.setItem('videos', JSON.stringify(updatedVideos));
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