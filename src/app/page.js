import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import Link from "next/link";
import db from "../../prisma/db";
import SearchForm from "@/components/SearchForm";

// const post = {
//   "id": 1,
//   "cover": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png",
//   "title": "Introdução ao React",
//   "slug": "introducao-ao-react",
//   "body": "Neste post, vamos explorar os conceitos básicos do React, uma biblioteca JavaScript para construir interfaces de usuário. Vamos cobrir componentes, JSX e estados.",
//   "markdown": "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
//   "author": {
//       "id": 101,
//       "name": "Ana Beatriz",
//       "username": "anabeatriz_dev",
//       "avatar": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png"
//   }
// }

async function getAllPosts(page, busca) {
  try {

    const where = {}

    if (busca) {
      where.title = {
        contains: busca,
        mode: 'insensitive'
      }
    }

    const perPage = 2;
    const skip = (page - 1) * perPage;

    const totalItems = await db.post.count({ where });
    const totalPages = Math.ceil(totalItems / perPage);

    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    const posts = await db.post.findMany({
      take: perPage,
      orderBy: { createdAt: 'desc' },
      skip: skip,
      where,
      include: {
        author: true
      }
    });

    return { data: posts, prev, next }
  } catch (error) {
    logger.error('Falha ao obter posts', { error})
    return { data: [], prev: null, next: null }
  }
}

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || 1);
  const busca = searchParams?.q;
  const { data: posts, prev, next } = await getAllPosts(currentPage, busca)
  return (
    <>
      <div style={{ width: 100 + '%' }}>
        <SearchForm />
        <main className='main'>
          {posts.map(post => <CardPost key={post.id} post={post} />)}
          <div className="centralize_link_paginate">
            {prev && <Link className="link_paginate" href={{ pathname: '/', query: { page: prev, q: busca }}}>Pagina anterior</Link>}
            {next && <Link className="link_paginate" href={{ pathname: '/', query: { page: next, q: busca }}}>Próxima pagina</Link>}
          </div>
        </main>
      </div>
    </>
  )
}


