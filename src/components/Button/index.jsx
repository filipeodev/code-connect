import styles from './button.module.css';

export default function Button({ text }) {
    return (
        <>
            <button type="submit" className={styles.button}>
                {text}
            </button>
        </>
    )
}