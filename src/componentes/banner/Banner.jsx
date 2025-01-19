import { useEffect, useState } from 'react';
import styles from './Banner.module.css';

const Banner = () => {
    const [randomCard, setRandomCard] = useState(null);

    const getBorderColor = (category) => {
        switch (category) {
            case 'front end':
                return '#00c3ff';
            case 'back end':
                return '#00ff8c';
            case 'innovacion y gestion':
                return '#ffb700';
            default:
                return '#ccc';
        }
    };

    useEffect(() => {
        const fetchRandomCard = () => {
            const storedVideos = localStorage.getItem('videos');
            if (storedVideos) {
                const videos = JSON.parse(storedVideos);
                if (videos && videos.length > 0) {
                    const randomIndex = Math.floor(Math.random() * videos.length);
                    setRandomCard(videos[randomIndex]);
                }
            }
        };

        fetchRandomCard();
        window.addEventListener('storage', fetchRandomCard);

        return () => {
            window.removeEventListener('storage', fetchRandomCard);
        }
    }, []);

    const borderColor = randomCard ? getBorderColor(randomCard.category) : '#ccc';

    return (
        <div className={styles.banner}>
            <div className={styles.text}>
                <div className={styles.categoria} style={{ backgroundColor: borderColor }}>
                    {randomCard ? randomCard.category.toUpperCase() : 'CARGANDO CATEGORÍA...'}
                </div>
                <h1 className={styles.title}>
                    {randomCard ? randomCard.title : 'CARGANDO TÍTULO...'}
                </h1>
                <p>
                    {randomCard ? randomCard.description : 'CARGANDO DESCRIPCIÓN...'}
                </p>
            </div>
            {randomCard ? (
                <a href={randomCard.videoUrl} target="_blank" rel="noopener noreferrer">
                    <img
                        className={styles.image}
                        src={randomCard.imageUrl}
                        alt={randomCard.title}
                        style={{ borderColor }}
                    />
                </a>
            ) : (
                <p>CARGANDO IMAGEN...</p>
            )}
        </div>
    );
};

export default Banner;