'use client'

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMail,
  IconPhone,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Información principal */}
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        {/* Logo y descripción */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Image
            src="/web-app-manifest-512x512.png"
            alt="Logo Municipalidad de San Benito"
            width={120}
            height={120}
            className="mb-4"
          />
          <p className="max-w-xs text-sm">
            Municipalidad de San Benito, trabajando por el progreso de nuestra ciudad
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/tramites" className="hover:text-primary">
                Trámites
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-primary">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/noticias" className="hover:text-primary">
                Noticias
              </Link>
            </li>
            <li>
              <Link href="/eventos" className="hover:text-primary">
                Agenda
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Contacto</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <IconPhone size={18} />
              <a href="https://wa.me/543436127013" className="hover:text-primary">
                3436127013
              </a>
            </li>
            <li className="flex items-center gap-2">
              <IconMail size={18} />
              <a href="mailto:modernizacion@sanbenito.gob.ar" className="hover:text-primary">
                modernizacion@sanbenito.gob.ar
              </a>
            </li>
            <li>
              Bvad, Basavilbaso 1094
              <br />
              San Benito, Entre Ríos
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Seguinos</h3>
          <div className="flex gap-2">
            <a
              href="https://www.facebook.com/MunicipalidadDeSanBenito"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline btn-sm"
              aria-label="Facebook"
            >
              <IconBrandFacebook size={18} />
            </a>
            <a
              href="https://www.instagram.com/municipio_sanbenito"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline btn-sm"
              aria-label="Instagram"
            >
              <IconBrandInstagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@MunicipalidadSanBenito"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-outline btn-sm"
              aria-label="YouTube"
            >
              <IconBrandYoutube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-800 bg-neutral-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Municipalidad de San Benito. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
