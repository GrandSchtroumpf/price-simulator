import { component$, useOn, useStyles$, sync$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { Map } from "~/components/map/Map";
import { Welcome } from "~/components/welcome/Welcome";
import Gallery from "~/components/gallery/Gallery";
import Recommendation from "~/components/recommendation/Recommendation";
import Estimate from "~/components/estimate/Estimate";
import Footer from "~/components/footer/Footer";

import MapLink from "~/components/map/Map.css?url";

import GalleryLink from "~/components/gallery/Gallery.css?url";
import RecommendationLink from "~/components/recommendation/Recommendation.css?url";
import EstimateLink from "~/components/estimate/Estimate.css?url";
import FooterLink from "~/components/footer/Footer.css?url";

import WoodVeins from '~/media/wood-veins.svg?jsx';
import style from './index.css?inline';

export default component$(() => {
  useStyles$(style);
  useOn('qidle', sync$(() => {
    for (const link of document.querySelectorAll('preload-stylesheet')) {
      (link as HTMLLinkElement).rel = 'stylesheet';
    }
  }));
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
  meta: [],
  links: [
    { rel: 'preload', href: '/fonts/Josefin Sans.woff2', as: 'font', type: 'font/woff2', crossOrigin: '' },
    { rel: 'preload', href: MapLink, as: "style", class: "preload-stylesheet" },
    { rel: 'preload', href: GalleryLink, as: "style", class: "preload-stylesheet" },
    { rel: 'preload', href: RecommendationLink, as: "style", class: "preload-stylesheet" },
    { rel: 'preload', href: EstimateLink, as: "style", class: "preload-stylesheet" },
    { rel: 'preload', href: FooterLink, as: "style", class: "preload-stylesheet" },
  ]
};
