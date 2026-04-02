import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import Link from "next/link";
import db from "../../prisma/db";

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

async function getAllPosts(page) {
  try {
    const posts = await db.post.findMany();

    return { data: posts, prev: null, next: null }
  } catch (error) {
    logger.error('Falha ao obter posts', { error})
    return { data: [], prev: null, next: null }
  }
}

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1
  const { data: posts, prev, next } = await getAllPosts(currentPage)

  return (
    <main className='main'>
      {posts.map(post => <CardPost key={post.id} post={post} />)}
      <div className="centralize_link_paginate">
        {prev && <Link className="link_paginate" href={`/?page=${prev}`}>Pagina anterior</Link>}
        {next && <Link className="link_paginate" href={`/?page=${next}`}>Próxima pagina</Link>}
      </div>
    </main>
  )
}


