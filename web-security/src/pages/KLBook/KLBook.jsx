import { useEffect, useState, useCallback } from "react";
import Header from "../../components/header/Header";
import styles from '../KLBook/KLBook.module.css';
import { getUserById } from "../../services/klbookService";
import { useParams } from "react-router-dom";

const KLBook = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState({
        username: '', password: '', phone: ''
    });

    const [isToggleGooddy, setIsToggleGooddy] = useState(false);

    const fetchUserById = useCallback(async (id) => {
        try {
            const fetchedUser = await getUserById(parseInt(id));
            if (fetchedUser) setUser(fetchedUser);
        } catch(error) {
            console.error('Error fetching user:', error.message);
        }
    }, []);

    const handleGood = useCallback(() => {
        const localId = localStorage.getItem('id');
        if (localId !== id) {
            console.error('Unauthorized');
        } else {
            fetchUserById(localId);
        }
    }, [id, fetchUserById]);

    const handleBad = useCallback(() => {
        fetchUserById(id);
    }, [id, fetchUserById]);

    useEffect(() => {
        if (isToggleGooddy) {
            handleGood();
        } else {
            handleBad();
        }
    }, [isToggleGooddy, handleGood, handleBad]);

    useEffect(() => {
        localStorage.setItem('id', 1);
    }, []);

    const handleGooddyToggle = () => {
        const newToggleState = !isToggleGooddy;
        setIsToggleGooddy(newToggleState);
        localStorage.setItem('isToogle', newToggleState)
    }    

    return (
        <>
            <Header />
            <section className={styles.klbookContainer}>
                <div className={styles.card}>
                    <img src="kl_logo.svg" alt="user_image" />
                    <div className={styles.inputBox}>
                        <label htmlFor="">Username</label>
                        <input type="text" defaultValue={user.username} />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Password</label>
                        <input type="password" defaultValue={user.password} />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Phone</label>
                        <input type="text" defaultValue={user.phone} />
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={styles.saveBtn}>Save</button>
                        <button className={styles.badBtn} onClick={handleGooddyToggle}>
                            {isToggleGooddy ? 'Gooddy' : 'Bad Bad'}
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default KLBook;
