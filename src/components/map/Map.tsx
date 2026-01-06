import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Map.css?inline';

export const Map = component$(() => {
  useStyles$(style);
  return (
    <section id="map">
      {/* eslint-disable-next-line qwik/jsx-img */}
      <img fetchPriority="high" src="/imgs/map.svg" width="1920" height="1080" alt="Carte représentant la Loire-Atlantique, le Morbihan et l'Ille-et-Vilaine" aria-description="Erwan Richard, menuisier professionnel, travaille à Redon et peut se déplacer jusqu'à 50 kilomètres autour de cette ville" />
      <div class="location" style="--w:0.5;--h:0.5">
        <div class="circle second"></div>
        <div class="circle"></div>
        <p>
          {Array.from('Redon').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <div class="location" style="--w:0.61;--h:0.20;--delay:300ms">
        <p>
          {Array.from('Rennes').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <div class="location" style="--w:0.64;--h:0.78;--delay:400ms">
        <p>
          {Array.from('Nantes').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
    </section>
  )
})