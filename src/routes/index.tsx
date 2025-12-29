import { component$, useOn, $, useStyles$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import { Testimonies } from "~/components/testimonies/testimonies";
import { Map } from "~/components/map/Map";
import { Welcome } from "~/components/welcome/welcome";
import { Logo } from "~/components/logo/Logo";
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
      <Logo width="300" height="300" class="logo" />
      <main>
        <Welcome />
        <Map />
        <Testimonies />
      </main>
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
