import { component$, useStyles$ } from "@qwik.dev/core";
import ImgWoodenBoard from '~/media/wood-board.svg?jsx';
import style from './Welcome.css?inline';
import { Logo } from "../logo/Logo";
import { SplittedText } from "../SplittedText";
  

export const Welcome = component$(() => {
  useStyles$(style);

  return (
    <section id="welcome">
      <ImgWoodenBoard class="wood-board" />
      <Logo width="250" height="250" class="logo" />
      <hgroup>
        <h2 style="--index: 0">ERWAN RICHARD</h2>
        <h1 style="--index: 2" class="splitted-text">
          <SplittedText
            text="Le P'tit Menuisier"
            mode="letter"
          />
        </h1>
      </hgroup>
      <a class="simulator-link" href="/simulateur" style="--index: 3">Simuler un devis</a>
    </section>
  )
})