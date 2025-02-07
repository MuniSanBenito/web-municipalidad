const mapas: Record<'4' | '20' | '22' | 'AM', string> = {
  '4': 'https://www.google.com/maps/d/embed?mid=1_53jhBzizHh20KoDR63gUrtCLfo0ljAh',
  '20': 'https://www.google.com/maps/d/embed?mid=1fUwraKUoRMeBfxslqy4ApeQHsWLtO7t4',
  '22': 'https://www.google.com/maps/d/embed?mid=1JYa-WaGRL_QLxCC2-rAmx7kU67xCEN9Z',
  AM: 'https://www.google.com/maps/d/embed?mid=1KSEVAclSY5R0UHjrKSEWt-puAhcBBk14',
}

type LineaColectivo = keyof typeof mapas

interface MapaColectivosProps {
  lineaSeleccionada: LineaColectivo
}

export function MapaColectivos({ lineaSeleccionada }: MapaColectivosProps) {
  return (
    <div>
      <iframe
        src={mapas[lineaSeleccionada]}
        width="100%"
        height="500px"
        className="rounded-md border"
        allowFullScreen
      ></iframe>
    </div>
  )
}
