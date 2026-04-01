import Image from "next/image"
import { Avatar } from "../Avatar"
import Link from "next/link";

import styles from './cardpost.module.css'
import { VerDetalhes } from "../VerDetalhes"

export const CardPost = ({ post, highlight  }) => {
    return (
        <Link href={`/posts/${post.slug}`} className={styles.link}>
            <article className={styles.article} style={{ width: highlight ? 993 : 486}}>
                <header className={styles.header}>
                    <figure className={styles.figure} style={{ height: highlight ? 300 : 133}}>
                        <Image
                            src={post.cover}
                            alt={post.title}
                            fill
                            // width={438}
                            // height={133}
                            className={styles.figure_image}
                        />
                    </figure>
                </header>
                <section className={styles.section}>
                    <h2 className={styles.h2}>{post.title}</h2>
                    <p className={styles.p}>{post.body}</p>
                    <VerDetalhes />
                </section>
                <footer className={styles.footer}>
                    <Avatar imageSrc={post.author.avatar} name={post.author.name}/>
                </footer>
            </article>
        </Link>
    )
}