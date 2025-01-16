import styles from './Footer.module.css';

const Footer = () => {
   return (
        <footer className={styles.container}>
            <img className={styles.img} src="alura.png" alt="" />
            <p className={styles.p}>Desarrollado por J_Marcos_B</p>
        </footer>
    )
}

export default Footer;