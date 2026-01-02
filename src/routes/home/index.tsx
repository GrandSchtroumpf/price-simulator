import { $, component$, useOn, useStyles$ } from "@qwik.dev/core";
import Banner from "~/components/banner/Banner";
import styles from './index.css?inline';
import Gallery from "~/components/gallery/Gallery";
import Recommendation from "~/components/recommendation/Recommendation";
import Estimate from "~/components/estimate/Estimate";
import Footer from "~/components/footer/Footer";

export default component$(() => {
  useStyles$(styles);
  useOn('qvisible', $(() => {
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
    <main>
      {/* Add 1 component / section here */}
      <img class="wooden-board" src="/imgs/home/wooden-board.svg" alt="Planche en bois dessinée en arrière-plan" />
      <Banner />
      <Gallery />
      <Recommendation />
      <Estimate />
      <footer>
        <Footer />
      </footer>
    </main>
  )
})