import logger from "@/logger";
import { remark } from 'remark'
import html from 'remark-html'
import { CardPost } from "@/components/CardPost";

import styles from './page.module.css'
import db from "../../../../prisma/db";
import { redirect } from "next/navigation";

async function getPostBySlyg(slug) {
    try {
        const post = await db.post.findUnique({
            where: {slug: slug},
            include: {
                author: true
            }
        });

        if (!post) throw new Error(`Post ${slug} inexistente`);

        const processedContent = await remark()
        .use(html)
        .process(post.markdown);

        const contentHtml = processedContent.toString();

        post.markdown = contentHtml

        return post
    } catch (error) {
        logger.error('Falha ao obter post', { error, slug });
    }

    redirect('/not-found');
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
