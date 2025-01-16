import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importamos PropTypes
import styles from './NewVideo.module.css';

const NewVideo = ({ onVideoAdded }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (!title || !category || !imageUrl || !videoUrl || !description) {
      setError('TODOS LOS CAMPOS SON REQUERIDOS');
      return;
    }

    const newVideo = {
      title,
      category,
      imageUrl,
      videoUrl,
      description,
    };

    fetch('http://localhost:5000/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar el video');
        }
        return response.json();
      })
      .then((video) => {
        if (onVideoAdded) {
          onVideoAdded(video); // Llamamos a la función si está definida
        }
        navigate('/');
      })
      .catch((error) => {
        setError('Hubo un error al guardar el video');
        console.error(error);
      });
  };

  const handleClear = () => {
    setTitle('');
    setCategory('');
    setImageUrl('');
    setVideoUrl('');
    setDescription('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>NUEVO VIDEO</h2>
      <p className={styles.texto}>Complete el formulario para crear una nueva tarjeta de video</p>
      {error && <div className={styles['error-message']}>{error}</div>}
      <div className={styles.container_form}>
        <form
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.group}>
            <label htmlFor="title">TÍTULO:</label>
            <input
              className={styles.input}
              placeholder="Ingrese el título"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="category">CATEGORÍA:</label>
            <select
              className={styles.input}
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              <option value="front end">Front End</option>
              <option value="back end">Back End</option>
              <option value="innovacion y gestion">Innovación y Gestión</option>
            </select>
          </div>

          <div className={styles.group}>
            <label htmlFor="imageUrl">IMAGEN (URL):</label>
            <input
              placeholder="Ingrese la URL de la imagen"
              className={styles.input}
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="videoUrl">VIDEO (URL):</label>
            <input
              placeholder="Ingrese la URL del video"
              className={styles.input}
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="description">DESCRIPCIÓN:</label>
            <textarea
              placeholder="¿De qué trata este video?"
              className={styles.textarea}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>
        <div className={styles.botones}>
          <button
            className={styles.button}
            type="button"
            onClick={handleSave}
          >
            GUARDAR
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={handleClear}
          >
            LIMPIAR
          </button>
        </div>
      </div>
    </div>
  );
};

// Validación de las props con PropTypes
NewVideo.propTypes = {
  onVideoAdded: PropTypes.func, // onVideoAdded es opcional
};

export default NewVideo;
