import { component$, useStyles$} from "@qwik.dev/core";
import { Logo } from "../logo/Logo";
import style from './Map.css?inline';

export default component$(() => {
  useStyles$(style);


  return (
    <section id="map">
      <article id="welcome" class="is-visible">
        <div class="presentation">
          <Logo class="place-self-center logo animated" />
          <hgroup>
            <p>Erwan Richard</p>
            <h1>Le P'tit Menuisier</h1>
          </hgroup>
          <div class="grid grid-cols-2 place-items-center">
            <p>Intérieur</p>
            <p>Extérieur</p>
          </div>
          <a class="btn-fill" href="/simulateur">
            Simuler un Devis
          </a>
        </div>
      </article>
      <article class="imgs">
        {/* eslint-disable-next-line qwik/jsx-img */}
        <img src="/imgs/map.svg" width="1920" height="1080" />
        <div class="img-filter"></div>
        <div class="location" style="--w:0.5;--h:0.5">
          <div class="circle second"></div>
          <div class="circle"></div>
          <p>
            {Array.from('Redon').map((letter, i) => <span key={i} style={{'--index': i}}>{letter}</span>)}
          </p>
        </div>
        <div class="location" style="--w:0.61;--h:0.20;--delay:300ms">
          <p>
            {Array.from('Rennes').map((letter, i) => <span key={i} style={{'--index': i}}>{letter}</span>)}
          </p>
        </div>
        <div class="location" style="--w:0.64;--h:0.78;--delay:400ms">
          <p>
            {Array.from('Nantes').map((letter, i) => <span key={i} style={{'--index': i}}>{letter}</span>)}
          </p>
        </div>
      </article>
    </section>
  )
})