import PropTypes from "prop-types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./VideoCard.module.css";

const VideoCard = ({ video, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={video.imageUrl}
          alt={video.title}
          className={styles.cardImage}
        />
      </a>

      <div className={styles.cardFooter}>
        <button className={styles.button} onClick={() => onEdit(video)}>
          <FaEdit /> Editar
        </button>
        <button className={styles.button} onClick={() => onDelete(video.id)}>
          <FaTrashAlt /> Eliminar
        </button>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default VideoCard;