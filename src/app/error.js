'use client' // Error boundaries must be Client Components
 
import Image from 'next/image'
import { useEffect } from 'react'
 
export default function Error({ error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <Image src="/imgs/erro_400_desktop.png" alt="Logo da Code Connect" width={656} height={367} />
        <h2 style={{ color: '#81FE88', fontSize: "37px", fontWeight: "500", marginBottom: "0px" }}>Opa! Um erro ocorreu</h2>
        <p style={{ color: "#BCBCBC", fontSize: "26px", fontWeight: "400" }}>Não conseguimos carregar a página, volte para seguir navegando. </p>
    </div>
  )
}