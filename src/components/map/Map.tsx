import { component$, useStyles$ } from "@qwik.dev/core";
import mapUrl from '~/media/map.svg';
import style from './Map.css?inline';

export const Map = component$(() => {
  useStyles$(style);
  return (
    <section id="map" aria-labelledby="map-legend">
      {/* eslint-disable-next-line qwik/jsx-img */}
      <img loading="lazy" decoding="async" src={mapUrl} width="1920" height="1080" alt="Carte représentant la Loire-Atlantique, le Morbihan et l'Ille-et-Vilaine" aria-description="Erwan Richard, menuisier professionnel, travaille à Redon et peut se déplacer jusqu'à 50 kilomètres autour de cette ville"/>
      <div class="reference">
        <div class="location" style="--w:0.5;--h:0.5">
          <div class="circle"></div>
        </div>
        <div class="location" style="--w:0.5;--h:0.5">
          <p>•</p>
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
        <div class="location" style="--w:0.3;--h:0.5;--delay:400ms">
          <p>•</p>
          <p>
            {Array.from('Vannes').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
          </p>
        </div>
        <div class="location" style="--w:0.46;--h:0.765;--delay:500ms">
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
        <div class="location" style="--w:0.65;--h:0.82;--delay:700ms">
          <p>•</p>
          <p>
            {Array.from('Nantes').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
          </p>
        </div>
        <div class="location" style="--w:0.42;--h:0.3;--delay:800ms">
          <p>•</p>
          <p>
            {Array.from('Ploërmel').map((letter, i) => <span key={i} style={{ '--index': i }}>{letter}</span>)}
          </p>
        </div>
        <p id="map-legend">Zone d'intervention</p>

      </div>
    </section>
  )
})