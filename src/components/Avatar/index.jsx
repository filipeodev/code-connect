import Image from 'next/image'
import styles from './avatar.module.css'

export const Avatar = ({ name, imageSrc }) => {
    return (
        <ul className={styles.ul}>
            <li>
                <Image src={imageSrc} alt={name} width={32} height={32} />
            </li>
            <li className={styles.li}>
                @{name }
            </li>
        </ul>
    )
}