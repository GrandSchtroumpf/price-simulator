import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Map.css?inline';

export const Map = component$(() => {
  useStyles$(style);
  return (
    <section id="map" aria-labelledby="map-legend">
      {/* eslint-disable-next-line qwik/jsx-img */}
      <img fetchPriority="high" src="/imgs/map.svg" width="1920" height="1080" alt="Carte représentant la Loire-Atlantique, le Morbihan et l'Ille-et-Vilaine" aria-description="Erwan Richard, menuisier professionnel, travaille à Redon et peut se déplacer jusqu'à 50 kilomètres autour de cette ville" />
      <div class="location" style="--w:0.5;--h:0.5">
        <p>•</p>
        <div class="circle"></div>
        <p>
          {Array.from('Redon').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <div class="location" style="--w:0.61;--h:0.20;--delay:300ms">
        <p>•</p>
        <p>
          {Array.from('Rennes').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <div class="location" style="--w:0.33;--h:0.48;--delay:400ms">
        <p>•</p>
        <p>
          {Array.from('Vannes').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <div class="location" style="--w:0.48;--h:0.725;--delay:500ms">
        <p>•</p>
        <p>
          {Array.from('St-Nazaire').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <div class="location" style="--w:0.70;--h:0.45;--delay:600ms">
        <p>•</p>
        <p>
          {Array.from('Châteaubriant').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <div class="location" style="--w:0.66;--h:0.78;--delay:700ms">
        <p>•</p>
        <p>
          {Array.from('Nantes').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
        </p>
      </div>
      <p id="map-legend">Zone d'intervention</p>
    </section>
  )
})