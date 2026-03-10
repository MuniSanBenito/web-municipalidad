// src/components/chatbot/MessageParser.tsx

import type { IMessageParser, PhoneNumberMatcher, TramiteMatcher } from './types'

class MessageParser implements IMessageParser {
  actionProvider: any
  private tramiteMatchers: TramiteMatcher[]
  private phoneNumberMatchers: PhoneNumberMatcher[]

  constructor(actionProvider: any) {
    this.actionProvider = actionProvider

    // Inicializar los matchers de números de teléfono (WhatsApp actualizado 2025)
    this.phoneNumberMatchers = [
      {
        keywords: [
          'teléfono principal',
          'telefono principal',
          'número principal',
          'numero principal',
          'telefono municipalidad',
        ],
        phoneNumber: '(0343) 4973454',
        description: 'Teléfono principal de la Municipalidad',
      },
      {
        keywords: ['rentas', 'impuestos', 'tasas', 'pagar impuestos', 'deuda municipal'],
        phoneNumber: 'WhatsApp 3436127015',
        description: 'Área de Rentas',
      },
      {
        keywords: ['licencia', 'conducir', 'carnet', 'registro'],
        phoneNumber: 'WhatsApp 3436127014',
        description: 'Licencias de Conducir',
      },
      {
        keywords: ['habilitacion', 'habilitación', 'comercio', 'local comercial', 'negocio'],
        phoneNumber: 'WhatsApp 3434537319',
        description: 'Habilitaciones Comerciales',
      },
      {
        keywords: ['obras privadas', 'obra', 'construcción', 'construccion', 'plano'],
        phoneNumber: '(0343) 4973454 o obrasprivadas@munisanbenito.gov.ar',
        description: 'Área de Obras Privadas',
      },
      {
        keywords: ['punto digital', 'biblioteca'],
        phoneNumber: 'WhatsApp 3434508085',
        description: 'Punto Digital y Biblioteca',
      },
      {
        keywords: ['deportes', 'actividades deportivas', 'voley', 'futbol', 'gimnasia'],
        phoneNumber: 'WhatsApp 5493434682745',
        description: 'Área de Deportes',
      },
      {
        keywords: ['cav', 'reclamo', 'queja', 'vecino', 'bache', 'alumbrado'],
        phoneNumber: 'WhatsApp 3436127013',
        description: 'Centro de Atención al Vecino (CAV)',
      },
    ]

    // Initialize tramiteMatchers here to correctly bind actionProvider methods
    this.tramiteMatchers = [
      // Licencias - más específicos primero
      {
        keywords: ['licencia original', 'primera licencia', 'sacar licencia', 'obtener licencia'],
        handler: () => this.actionProvider.handleTramite('licenciaOriginal'),
      },
      {
        keywords: [
          'licencia renovacion',
          'licencia renovación',
          'renovar licencia',
          'renovacion licencia',
        ],
        handler: () => this.actionProvider.handleTramite('licenciaRenovacion'),
      },
      {
        keywords: [
          'licencia ampliacion',
          'licencia ampliación',
          'ampliar licencia',
          'ampliar carnet',
        ],
        handler: () => this.actionProvider.handleTramite('licenciaAmpliacion'),
      },
      {
        keywords: [
          'licencia de conducir',
          'licencia conducir',
          'carnet de conducir',
          'carnet',
          'licencia',
        ],
        handler: () => this.actionProvider.handleTramite('licencia'),
      },

      // Rentas e impuestos
      {
        keywords: [
          'rentas',
          'impuestos',
          'tasas',
          'tributos',
          'pagar impuestos',
          'deuda',
          'tgi',
          'obras sanitarias',
        ],
        handler: () => this.actionProvider.handleTramite('rentas'),
      },

      // Obras privadas - más específicos primero
      {
        keywords: [
          'inscripcion municipal profesional',
          'inscripción municipal profesional',
          'inscribir profesional',
        ],
        handler: () => this.actionProvider.handleTramite('obrasInscripcion'),
      },
      {
        keywords: ['final de obra', 'finalizar obra'],
        handler: () => this.actionProvider.handleTramite('obrasFinal'),
      },
      {
        keywords: ['presentacion de proyecto', 'presentación de proyecto', 'proyecto obra'],
        handler: () => this.actionProvider.handleTramite('obrasPresentacion'),
      },
      {
        keywords: ['relevamiento', 'relevar'],
        handler: () => this.actionProvider.handleTramite('obrasRelevamiento'),
      },
      {
        keywords: [
          'obras privadas',
          'construccion',
          'construcción',
          'edificacion',
          'edificación',
          'construir',
          'obra',
          'plano',
        ],
        handler: () => this.actionProvider.handleTramite('obrasPrivadas'),
      },

      // Habilitaciones
      {
        keywords: [
          'habilitaciones',
          'habilitacion comercial',
          'habilitación comercial',
          'local comercial',
          'habilitar comercio',
          'habilitar negocio',
          'abrir negocio',
          'abrir local',
        ],
        handler: () => this.actionProvider.handleTramite('habilitaciones'),
      },

      // Servicios municipales
      {
        keywords: [
          'actividades deportivas',
          'deportes',
          'polideportivo',
          'voley',
          'futbol',
          'beach voley',
          'natacion',
          'golf',
        ],
        handler: () => this.actionProvider.handleTramite('actividadesDeportivas'),
      },
      {
        keywords: ['area mujer', 'área mujer', 'mujer y genero', 'mujer y género', 'violencia'],
        handler: () => this.actionProvider.handleTramite('areaMujer'),
      },
      {
        keywords: ['catastro', 'catastro municipal', 'terreno', 'lote', 'parcela'],
        handler: () => this.actionProvider.handleTramite('catastro'),
      },
      {
        keywords: [
          'cav',
          'centro de atencion',
          'centro de atención',
          'atencion al vecino',
          'atención al vecino',
          'reclamo',
          'queja',
        ],
        handler: () => this.actionProvider.handleTramite('cav'),
      },
      {
        keywords: ['cic barrio san pedro', 'cic san pedro', 'centro integrador'],
        handler: () => this.actionProvider.handleTramite('cicBarrioSanPedro'),
      },
      {
        keywords: ['mesa de entrada', 'tramites generales', 'trámites generales'],
        handler: () => this.actionProvider.handleTramite('mesaDeEntrada'),
      },
      {
        keywords: [
          'punto digital',
          'biblioteca',
          'biblioteca municipal',
          'computadora',
          'internet',
        ],
        handler: () => this.actionProvider.handleTramite('puntoDigital'),
      },
      {
        keywords: [
          'talleres culturales',
          'cultura',
          'talleres artisticos',
          'talleres artísticos',
          'arte',
          'pintura',
          'musica',
        ],
        handler: () => this.actionProvider.handleTramite('talleresCulturales'),
      },
      {
        keywords: [
          'produccion y empleo',
          'producción y empleo',
          'empleo',
          'trabajo',
          'buscar trabajo',
        ],
        handler: () => this.actionProvider.handleTramite('produccionEmpleo'),
      },
      {
        keywords: ['tercera edad', 'discapacidad', 'adultos mayores', 'jubilados'],
        handler: () => this.actionProvider.handleTramite('terceraEdad'),
      },
    ]
  }

  parse(message: string): void {
    const lowerCaseMessage = message
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    // Verificar si es una consulta general sobre IA
    if (
      lowerCaseMessage.includes('modelo de ia') ||
      lowerCaseMessage.includes('modelo ia') ||
      lowerCaseMessage.includes('inteligencia artificial')
    ) {
      this.actionProvider.handleUnknown(message)
      return
    }

    // Detectar saludos y despedidas - dejar que el servicio de IA los maneje para respuestas más naturales
    if (
      /^(hola|buenas?|buen\s*(dia|dias|tarde|tardes|noche|noches)|hi|hello|saludos?|que\s*tal|hey)[\s\!\?\.\,]*$/i.test(
        message.trim(),
      )
    ) {
      this.actionProvider.handleUnknown(message)
      return
    }

    if (
      /^(chau|adios|hasta\s*luego|nos\s*vemos|bye|gracias?)[\s\!\?\.\,]*$/i.test(message.trim())
    ) {
      this.actionProvider.handleUnknown(message)
      return
    }

    // Verificar si es una consulta de horarios
    if (
      /horario|hora de atencion|cuando atienden|a que hora|que hora abren/i.test(lowerCaseMessage)
    ) {
      this.actionProvider.handleUnknown('horarios de atencion municipalidad')
      return
    }

    // Verificar si es una consulta de ubicación/dirección
    if (/direccion|ubicacion|donde (esta|queda)|como llego/i.test(lowerCaseMessage)) {
      this.actionProvider.handleUnknown('direccion de la municipalidad')
      return
    }

    // Verificar si es una consulta de teléfono específico
    const phoneMatch = this.findPhoneNumberMatch(lowerCaseMessage)
    if (phoneMatch) {
      const phoneMessage = this.createPhoneNumberMessage(phoneMatch)
      this.actionProvider.handleUnknown(phoneMessage)
      return
    }

    // Verificar consultas de trámites específicos
    for (const matcher of this.tramiteMatchers) {
      if (
        matcher.keywords.some((keyword) =>
          lowerCaseMessage.includes(keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '')),
        )
      ) {
        // En lugar de solo mostrar un link, enviamos la consulta al servicio de IA para dar información completa
        this.actionProvider.handleUnknown(message)
        return
      }
    }

    // Si no coincide con patrones específicos, enviar al servicio de IA
    this.actionProvider.handleUnknown(message)
  }

  /**
   * Busca coincidencias de números de teléfono en el mensaje
   * @param message Mensaje del usuario en minúsculas
   * @returns Matcher de teléfono encontrado o null
   */
  private findPhoneNumberMatch(message: string): PhoneNumberMatcher | null {
    for (const matcher of this.phoneNumberMatchers) {
      if (matcher.keywords.some((keyword) => message.includes(keyword))) {
        return matcher
      }
    }
    return null
  }

  /**
   * Crea un mensaje con la información del número de teléfono
   * @param matcher Matcher de teléfono encontrado
   * @returns Mensaje formateado
   */
  private createPhoneNumberMessage(matcher: PhoneNumberMatcher): string {
    return `El número de teléfono para ${matcher.description} es ${matcher.phoneNumber}.`
  }
}
export default MessageParser
