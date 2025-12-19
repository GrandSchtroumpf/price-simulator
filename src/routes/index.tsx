import { component$, useOn, $ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { Testimonies } from "~/components/testimonies/testimonies";
import Map from "~/components/map/Map";

export default component$(() => {
  
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
    <main>
      <Map />
      <Testimonies />
    </main>
  )
})


export const head: DocumentHead = {
  title: "Le P'tit Menuisier",
  meta: [],
  links: [
    { rel: 'preload', href: '/fonts/Josefin Sans.woff2', as:'font', type:'font/woff2' }
  ]
};
