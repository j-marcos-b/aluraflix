import styles from './NotFound.module.css'; 

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>Página no encontrada</p>
    </div>
  );
};

export default NotFound;
