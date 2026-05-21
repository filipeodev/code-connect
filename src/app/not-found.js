import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="center_infor_error">
            <Image src="/imgs/not_found_404.png" alt="OPS! Página não encontrada." width={656} height={367} />
            <h2 className="title_error">OPS! Página não encontrada.</h2>
            <p className="description_error">Você pode voltar ao feed e continuar buscando projetos incríveis!</p>
            <Link href="/" className="link_paginate">Voltar ao feed</Link>
        </div>
    )
}