import styles from '../header/Header.module.css'

function Header() {
    return (
        <section className={styles.header}>
            
            <div className={styles.headerContent}>
                <div className={styles.brand}>
                    <img src="/kl_logo.svg" alt="kl_logo" />
                    <p>KLBook</p>
                </div>

                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Feeds</a></li>
                    <li><a href="">Settings</a></li>
                </ul>
            </div>

        </section>
    );
}

export default Header