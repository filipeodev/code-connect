'use client' // Error boundaries must be Client Components
 
import Image from 'next/image'
import { useEffect } from 'react'
 
export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="center_info_error">
        <Image src="/imgs/erro_400_desktop.png" alt="Logo da Code Connect" width={656} height={367} />
        <h2 className="title_error">Opa! Um erro ocorreu</h2>
        <p className="description_error">Não conseguimos carregar a página, volte para seguir navegando. </p>
    </div>
  )
}