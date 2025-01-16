import React from 'react';
import PropTypes from 'prop-types';
import styles from './Popup.module.css';

const Popup = ({ video, onSave, onClose }) => {
    const [formData, setFormData] = React.useState({
        id: video?.id || null, // Agregar el id si existe
        title: video?.title || '',
        description: video?.description || '',
        category: video?.category || '',
        imageUrl: video?.imageUrl || '',  // Agregar imageUrl
        videoUrl: video?.videoUrl || '',  // Agregar videoUrl
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h2 className={styles.h2}>Editar Video</h2>
                <form className={styles.contenedor_items} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Título:
                        <input className={styles.input}
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Categoría:
                        <select className={styles.select}
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="front end">Front End</option>
                            <option value="back end">Back End</option>
                            <option value="innovacion y gestion">Innovación y Gestión</option>
                        </select>
                    </label>
                    <label className={styles.label}>
                        Imagen URL:
                        <input className={styles.input}
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Video URL:
                        <input className={styles.input}
                            type="text"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Descripción:
                        <textarea className={styles.textarea}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className={styles.buttons}>
                        <button className={styles.button} type="submit">Guardar</button>
                        <button className={styles.button} type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Definir propTypes
Popup.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.string,  // Cambiar tipo a string, ya que el id es un string
        title: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string,
        imageUrl: PropTypes.string,  // Agregar validación para imageUrl
        videoUrl: PropTypes.string,  // Agregar validación para videoUrl
    }),
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

// Valores por defecto para las props
Popup.defaultProps = {
    video: null,
};

export default Popup;
