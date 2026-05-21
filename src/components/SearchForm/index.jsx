import styles from './searchform.module.css';
import { Search } from 'lucide-react';
import db from '../../../prisma/db';
import logger from '@/logger';
import Button from '../Button';

export default function SearchForm() {

    return (
        <form className={styles.form} action='/'>
            <input
                name='q'
                className={styles.input}
                type="text"
                placeholder='Digite o que você procura'
            />
            <Button text="Pesquisar"/>
        </form>
    )
}