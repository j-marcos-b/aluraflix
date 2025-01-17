import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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

        newVideo.id = crypto.randomUUID();

        try {
            const storedVideos = localStorage.getItem('videos');
            const existingVideos = storedVideos ? JSON.parse(storedVideos) : [];
            const updatedVideos = [...existingVideos, newVideo];
            localStorage.setItem('videos', JSON.stringify(updatedVideos));

            if (onVideoAdded) {
                onVideoAdded(newVideo);
            }
            navigate('/');
        } catch (error) {
            setError('Hubo un error al guardar el video en el almacenamiento local.');
            console.error(error);
        }
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
        <div className={styles.container}> {/* Asume que styles está definido */}
            <h2 className={styles.titulo}>NUEVO VIDEO</h2> {/* Asume que styles está definido */}
            <p className={styles.texto}>Complete el formulario para crear una nueva tarjeta de video</p> {/* Asume que styles está definido */}
            {error && <div className={styles['error-message']}>{error}</div>} {/* Asume que styles está definido */}
            <div className={styles.container_form}> {/* Asume que styles está definido */}
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}> {/* Asume que styles está definido */}
                    <div className={styles.group}> {/* Asume que styles está definido */}
                        <label htmlFor="title">TÍTULO:</label>
                        <input
                            className={styles.input}
                            placeholder={error && !title ? 'Este campo es obligatorio' : 'Ingrese el título'}
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ borderColor: error && !title ? 'red' : 'inherit' }}
                        />
                    </div>

                    <div className={styles.group}> {/* Asume que styles está definido */}
                        <label htmlFor="category">CATEGORÍA:</label>
                        <select
                            className={styles.input} 
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ borderColor: error && !category ? 'red' : 'inherit' }}
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="front end">Front End</option>
                            <option value="back end">Back End</option>
                            <option value="innovacion y gestion">Innovación y Gestión</option>
                        </select>
                    </div>

                    <div className={styles.group}> {/* Asume que styles está definido */}
                        <label htmlFor="imageUrl">IMAGEN (URL):</label>
                        <input
                            placeholder={error && !imageUrl ? 'Este campo es obligatorio' : 'Ingrese la URL de la imagen'}
                            className={styles.input} 
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            style={{ borderColor: error && !imageUrl ? 'red' : 'inherit' }}
                        />
                    </div>

                    <div className={styles.group}> {/* Asume que styles está definido */}
                        <label htmlFor="videoUrl">VIDEO (URL):</label>
                        <input
                            placeholder={error && !videoUrl ? 'Este campo es obligatorio' : 'Ingrese la URL del video'}
                            className={styles.input} 
                            type="text"
                            id="videoUrl"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            style={{ borderColor: error && !videoUrl ? 'red' : 'inherit' }}
                        />
                    </div>

                    <div className={styles.group}> {/* Asume que styles está definido */}
                        <label htmlFor="description">DESCRIPCIÓN:</label>
                        <textarea
                            placeholder={error && !description ? 'Este campo es obligatorio' : '¿De qué trata este video?'}
                            className={styles.textarea} 
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ borderColor: error && !description ? 'red' : 'inherit' }}
                        />
                    </div>
                </form>
                <div className={styles.botones}> {/* Asume que styles está definido */}
                    <button className={styles.button} type="button" onClick={handleSave}> {/* Asume que styles está definido */}
                        GUARDAR
                    </button>
                    <button className={styles.button} type="button" onClick={handleClear}> {/* Asume que styles está definido */}
                        LIMPIAR
                    </button>
                </div>
            </div>
        </div>
    );
};

NewVideo.propTypes = {
    onVideoAdded: PropTypes.func,
};

export default NewVideo;