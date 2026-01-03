import { component$, useStyles$ } from "@qwik.dev/core";
import { Logo } from "../logo/Logo";
import { SplittedText } from "../SplittedText";
import ImgWoodenBoard from '~/media/wood-board.svg?jsx';
import style from './Welcome.css?inline';
  

export const Welcome = component$(() => {
  useStyles$(style);

  return (
    <section id="welcome">
      <ImgWoodenBoard class="wood-board" />
      <div class="calling-card">
        <Logo width="200" height="200" class="logo" />
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
      </div>
      <a class="simulator-link" href="/simulateur" style="--index: 3">Simuler un devis</a>
    </section>
  )
})