import { component$, useOn, useStyles$, sync$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { Map } from "~/components/map/Map";
import { Welcome } from "~/components/welcome/Welcome";
import Gallery from "~/components/gallery/Gallery";
import Recommendation from "~/components/recommendation/Recommendation";
import Estimate from "~/components/estimate/Estimate";
import Footer from "~/components/footer/Footer";

import WoodVeins from '~/media/wood-veins.svg?jsx';
import style from './index.css?inline';
import homeSchema from "~/schemas/home-schemas.json?raw";

export default component$(() => {
  useStyles$(style);
  useOn('qvisible', sync$(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio > 0.5) entry.target.classList.add('is-visible');
        else entry.target.classList.remove('is-visible');
      }
    }, {
      threshold: [0.5]
    });
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      observer.observe(section);
    }
  }));

  return (
    <>
      <main>
        <Welcome />
        <Map />
        <Gallery />
        <Recommendation />
        <Estimate />
      </main>
      <Footer />
      <div class="wood-background" aria-hidden="true">
        <WoodVeins class="wood-veins" />
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: "Le P'tit Menuisier",
  meta: [
    {
      name: 'description',
      content: 'Le P\'tit Menuisier : menuiserie artisanale de qualité en Ille-et-Vilaine. Erwan Richard réalise vos projets sur-mesure : meubles, aménagements intérieurs et extérieurs, rénovation. Devis gratuit.',
    },
    {
      name: 'keywords',
      content: 'menuisier, menuiserie artisanale, meubles sur-mesure, aménagement intérieur, aménagement extérieur, Redon, Ille-et-Vilaine, Erwan Richard',
    },
    {
      property: 'og:url',
      content: 'https://price-simulator-orpin.vercel.app/'
    },
    {
      property: 'og:image',
      content: 'https://price-simulator-orpin.vercel.app/og/og-image.jpg'
    },
    {
      property: 'og:image:type',
      content: 'image/jpeg'
    },
    {
      property: 'og:image:width',
      content: '1200'
    },
    {
      property: 'og:image:height',
      content: '630'
    },
    {
      property: 'og:image:alt',
      content: 'Carte de visite de Erwan Richard"'
    },
  ],
  links: [
    {
      rel: 'preload',
      href: '/fonts/JosefinSans.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: ''
    },
  ],
  scripts: [
    {
      props: {
        type: "application/ld+json"
      },
      script: homeSchema
    }
  ],
};
