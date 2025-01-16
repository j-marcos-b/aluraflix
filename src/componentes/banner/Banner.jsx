import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <div className={styles.frontend}>FRONT END</div>
        <h1>Descubre y comparte los mejores videos</h1>
        <p>Explora nuestras diversas categorías, descubre contenido que se ajusta a tus intereses y añade fácilmente tus videos favoritos para tenerlos siempre a la mano. Personaliza tu experiencia y mantén todos tus videos organizados y listos para ver en cualquier momento.</p>
      </div>
      {/* Iframe de YouTube */}
      <iframe
        className={styles.iframe}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/ov7vA5HFe6w"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Banner;