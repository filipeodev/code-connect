import logger from "@/logger";
import { remark } from 'remark'
import html from 'remark-html'
import { CardPost } from "@/components/CardPost";

import styles from './page.module.css'

async function getPostBySlyg(slug) {
    const url = `http://localhost:3042/posts?slug=${slug}`

    const response = await fetch(url)
  
    if (!response.ok) {
        logger.error('Ops, alguma coisa correu mal')
        return {}
    }
    logger.info('Posts recuperados')
    const data = await response.json()

    if (data.length == 0) {
        return {}
    }

    const post = data[0]

    const processedContent = await remark()
    .use(html)
    .process(post.markdown);

    const contentHtml = processedContent.toString();

    post.markdown = contentHtml

    return post
}

export default async function PagePost ({params}) {
    const { slug } = await params
    const post = await getPostBySlyg(slug)
    return (
        <div>
            <CardPost post={post} highlight />

            <h3 className={styles.subtitle}>Código:</h3>

            <div className={styles.code}>
                <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
            </div>
        </div>
    )
}
