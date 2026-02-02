import { component$, useStyles$ } from "@qwik.dev/core";
import { AnimatedLogo } from "../logo/Logo";
import { SplittedText } from "../SplittedText";
import style from './Welcome.css?inline';


export const Welcome = component$(() => {
  useStyles$(style);

  return (
    <section id="welcome">
      <div class="calling-card">
        <AnimatedLogo />
        <hgroup>
          <h2 style="--index: 0">
            <SplittedText text="ERWAN RICHARD" mode="letter" />
          </h2>
          <h1 style="--index: 2" class="splitted-text">
            <SplittedText
              text="Le P'tit Menuisier"
              mode="letter"
            />
          </h1>
        </hgroup>
        <p style="--index: 3">
          <SplittedText text="Intérieur · Extérieur" mode="word" />
        </p>
      </div>
      <div class="actions">
        <a class="simulator-link" href="/simulateur" style="--index: 3">Simuler un devis</a>
      </div>
    </section>
  )
})