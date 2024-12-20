'use client'
import { useParams } from 'next/navigation'

export default function CustomPruebaPage() {
  const params = useParams()
  console.log(params)

  return (
    <div style={{ border: 'solid', borderWidth: 3, borderColor: 'gray', padding: 1 }}>
      Pagina de prueba con id
    </div>
  )
}

/* // ESTO CORRE SOLO AL SERVIDOR
export default async function CustomPruebaPage({ params }: { params: { id: string } }) {
  console.log((await params).id)
  return (
    <div style={{ border: 'solid', borderWidth: 3, borderColor: 'gray', padding: 1 }}>
      Pagina de prueba con id
    </div>
  )
} */
