import { component$, useOn, $, useStyles$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { Map } from "~/components/map/Map";
import { Welcome } from "~/components/welcome/Welcome";
import Gallery from "~/components/gallery/Gallery";
import Recommendation from "~/components/recommendation/Recommendation";
import Estimate from "~/components/estimate/Estimate";
import Footer from "~/components/footer/Footer";
import WoodVeins from '~/media/wood-veins.svg?jsx';
import style from './index.css?inline';

export default component$(() => {
  useStyles$(style);
  useOn('qvisible', $(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio > 0.5) entry.target.classList.add('is-visible');
        else entry.target.classList.remove('is-visible');
      }
    }, {
      threshold: [0.5]
    });
    const sections = document.querySelectorAll('section,article');
    for (const section of sections) {
      observer.observe(section);
    }
  }));

  return (
    <>
      <div class="wood-background">
        <WoodVeins class="wood-veins" />
      </div>
      <main>
        <Welcome />
        <Map />
        <Gallery />
        <Recommendation />
        <Estimate />
      </main>
      <Footer />
    </>
  )
})


export const head: DocumentHead = {
  title: "Le P'tit Menuisier",
  meta: [],
  links: [
    { rel: 'preload', href: '/fonts/Josefin Sans.woff2', as: 'font', type: 'font/woff2' }
  ]
};
