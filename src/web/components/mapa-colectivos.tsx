import type { LineasColectivos } from './lineas-colectivos'

const MAPAS: Record<LineasColectivos, string> = {
  '4': 'https://www.google.com/maps/d/embed?mid=1_53jhBzizHh20KoDR63gUrtCLfo0ljAh',
  '20': 'https://www.google.com/maps/d/embed?mid=1fUwraKUoRMeBfxslqy4ApeQHsWLtO7t4',
  '22': 'https://www.google.com/maps/d/embed?mid=1JYa-WaGRL_QLxCC2-rAmx7kU67xCEN9Z',
  AM: 'https://www.google.com/maps/d/embed?mid=1KSEVAclSY5R0UHjrKSEWt-puAhcBBk14',
} as const

type Props = {
  lineaSeleccionada: LineasColectivos
}
export function MapaColectivos({ lineaSeleccionada }: Props) {
  return (
    <div>
      <iframe
        src={MAPAS[lineaSeleccionada]}
        width="100%"
        height="500px"
        className="rounded-md border"
        allowFullScreen
      ></iframe>
    </div>
  )
}
