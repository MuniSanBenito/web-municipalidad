'use client'

import type { Ciudadano, Curriculum } from '@/payload-types'
import { jsPDF } from 'jspdf'
import { useState } from 'react'

interface CurriculumPDFDownloadProps {
  ciudadano: Ciudadano
  curriculum: Curriculum
}

export function CurriculumPDFDownload({ ciudadano, curriculum }: CurriculumPDFDownloadProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Presente'
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDateShort = (dateString: string | null | undefined) => {
    if (!dateString) return 'Presente'
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
    })
  }

  const formatDateBirth = (dateString: string | null | undefined) => {
    if (!dateString) return 'No especificado'
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      const doc = new jsPDF('p', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - 2 * margin
      let yPosition = margin

      // Función helper para agregar nueva página si es necesario
      const checkPageBreak = (requiredHeight: number) => {
        if (yPosition + requiredHeight > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }
      }

      // Función helper para texto con salto de línea automático
      const addWrappedText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        lineHeight: number = 6,
      ) => {
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, x, y)
        return lines.length * lineHeight
      }

      // Header con información personal
      doc.setFillColor(41, 128, 185) // Color azul profesional
      doc.rect(0, 0, pageWidth, 40, 'F')

      // Nombre en header
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont('helvetica', 'bold')
      const nombreCompleto =
        ciudadano.nombre && ciudadano.apellido
          ? `${ciudadano.nombre} ${ciudadano.apellido}`
          : ciudadano.email
      doc.text(nombreCompleto, margin, 25)

      // Título del currículum
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.text(curriculum.titulo || 'Currículum Vitae', margin, 32)

      yPosition = 50

      // Información personal
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('INFORMACIÓN PERSONAL', margin, yPosition)
      yPosition += 10

      // Línea separadora
      doc.setDrawColor(41, 128, 185)
      doc.setLineWidth(0.5)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')

      // Datos personales en dos columnas
      const leftColumn = margin
      const rightColumn = pageWidth / 2 + 10

      doc.setFont('helvetica', 'bold')
      doc.text('Email:', leftColumn, yPosition)
      doc.setFont('helvetica', 'normal')
      doc.text(ciudadano.email, leftColumn + 25, yPosition)

      doc.setFont('helvetica', 'bold')
      doc.text('DNI:', rightColumn, yPosition)
      doc.setFont('helvetica', 'normal')
      doc.text(ciudadano.dni, rightColumn + 30, yPosition)
      yPosition += 7

      if (ciudadano.telefono) {
        doc.setFont('helvetica', 'bold')
        doc.text('Teléfono:', leftColumn, yPosition)
        doc.setFont('helvetica', 'normal')
        doc.text(ciudadano.telefono, leftColumn + 25, yPosition)
      }

      if (ciudadano.fecha_nacimiento) {
        doc.setFont('helvetica', 'bold')
        doc.text('Nacimiento:', rightColumn, yPosition)
        doc.setFont('helvetica', 'normal')
        doc.text(formatDateBirth(ciudadano.fecha_nacimiento), rightColumn + 30, yPosition)
      }
      yPosition += 7

      if (ciudadano.domicilio) {
        doc.setFont('helvetica', 'bold')
        doc.text('Domicilio:', leftColumn, yPosition)
        doc.setFont('helvetica', 'normal')
        doc.text(ciudadano.domicilio, leftColumn + 25, yPosition)
      }

      if (ciudadano.ciudad) {
        doc.setFont('helvetica', 'bold')
        doc.text('Ciudad:', rightColumn, yPosition)
        doc.setFont('helvetica', 'normal')
        doc.text(ciudadano.ciudad, rightColumn + 30, yPosition)
      }

      yPosition += 15

      // Categorías
      if (curriculum.categorias && curriculum.categorias.length > 0) {
        checkPageBreak(20)
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.text('ÁREAS DE INTERÉS', margin, yPosition)
        yPosition += 10

        doc.setDrawColor(41, 128, 185)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 8

        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        const categorias = curriculum.categorias.map((c) => c.nombre).join(' • ')
        yPosition += addWrappedText(categorias, margin, yPosition, contentWidth)
        yPosition += 10
      }

      // Estudios
      if (curriculum.estudios && curriculum.estudios.length > 0) {
        checkPageBreak(30)
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.text('FORMACIÓN ACADÉMICA', margin, yPosition)
        yPosition += 10

        doc.setDrawColor(41, 128, 185)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 8

        curriculum.estudios.forEach((estudio, index) => {
          checkPageBreak(25)

          doc.setFontSize(12)
          doc.setFont('helvetica', 'bold')
          doc.text(estudio.institucion || 'Institución no especificada', margin, yPosition)
          yPosition += 6

          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          doc.text(
            estudio.is_old ? estudio.nivel_old || '' : estudio.nivel || '',
            margin,
            yPosition,
          )

          const fechaTexto = `${formatDateShort(estudio.fecha_inicio)} - ${formatDateShort(estudio.fecha_finalizacion)}`
          doc.text(fechaTexto, pageWidth - margin - doc.getTextWidth(fechaTexto), yPosition)
          yPosition += 6

          if (estudio.descripcion) {
            yPosition += addWrappedText(
              estudio.descripcion,
              margin + 5,
              yPosition,
              contentWidth - 5,
              5,
            )
          }

          yPosition += 8
        })
      }

      // Experiencia Laboral
      if (curriculum.experiencias && curriculum.experiencias.length > 0) {
        checkPageBreak(30)
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.text('EXPERIENCIA LABORAL', margin, yPosition)
        yPosition += 10

        doc.setDrawColor(41, 128, 185)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 8

        curriculum.experiencias.forEach((experiencia, index) => {
          checkPageBreak(25)

          doc.setFontSize(12)
          doc.setFont('helvetica', 'bold')
          doc.text(experiencia.institucion || 'Empresa no especificada', margin, yPosition)
          yPosition += 6

          doc.setFontSize(10)
          doc.setFont('helvetica', 'italic')
          doc.text(experiencia.puesto || '', margin, yPosition)

          const fechaTexto = `${formatDateShort(experiencia.fecha_inicio)} - ${formatDateShort(experiencia.fecha_finalizacion)}`
          doc.text(fechaTexto, pageWidth - margin - doc.getTextWidth(fechaTexto), yPosition)
          yPosition += 6

          if (experiencia.descripcion) {
            doc.setFont('helvetica', 'normal')
            yPosition += addWrappedText(
              experiencia.descripcion,
              margin + 5,
              yPosition,
              contentWidth - 5,
              5,
            )
          }

          yPosition += 8
        })
      }

      // Referencias
      if (curriculum.referencias && curriculum.referencias.length > 0) {
        checkPageBreak(30)
        doc.setFontSize(16)
        doc.setFont('helvetica', 'bold')
        doc.text('REFERENCIAS', margin, yPosition)
        yPosition += 10

        doc.setDrawColor(41, 128, 185)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 8

        curriculum.referencias.forEach((referencia, index) => {
          checkPageBreak(20)

          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.text(referencia.nombre || 'Nombre no especificado', margin, yPosition)
          yPosition += 6

          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')

          if (referencia.telefono) {
            doc.text(`Tel: ${referencia.telefono}`, margin + 5, yPosition)
            yPosition += 4
          }

          if (referencia.email) {
            doc.text(`Email: ${referencia.email}`, margin + 5, yPosition)
            yPosition += 4
          }

          if (referencia.descripcion) {
            yPosition += addWrappedText(
              referencia.descripcion,
              margin + 5,
              yPosition,
              contentWidth - 5,
              4,
            )
          }

          yPosition += 6
        })
      }

      // Footer con fecha de generación
      const currentDate = new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      doc.setFontSize(8)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(128, 128, 128)
      doc.text(`Currículum generado el ${currentDate}`, margin, pageHeight - 10)

      // Guardar el PDF
      const fileName = `curriculum_${nombreCompleto.replace(/\s+/g, '_').toLowerCase()}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error('Error al generar PDF:', error)
      alert('Error al generar el PDF. Por favor, inténtelo de nuevo.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="btn btn-outline btn-primary btn-sm"
    >
      {isGenerating ? (
        <>
          <span className="loading loading-spinner loading-xs"></span>
          Generando...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Descargar PDF
        </>
      )}
    </button>
  )
}
