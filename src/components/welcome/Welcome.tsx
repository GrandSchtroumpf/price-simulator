import { component$, useStyles$ } from "@qwik.dev/core";
import { AnimatedLogo } from "../logo/Logo";
import { SplittedText } from "../SplittedText";
// import { Rive } from "@rive-app/webgl2";
// import RiveFile from '~/media/welcome/button.riv?url';

import style from './Welcome.css?inline';


export const Welcome = component$(() => {
  useStyles$(style);

  // useVisibleTask$(() => {
  //   const darkmode = matchMedia("(prefers-color-scheme:dark)");
  //   const r = new Rive({
  //     src: RiveFile,
  //     canvas: document.getElementById("canvas") as HTMLCanvasElement,
  //     autoplay: true,
  //     useOffscreenRenderer: true,
  //     onLoad: () => {
  //       r.resizeDrawingSurfaceToCanvas();
  //       const vmi = r.viewModelByName("ViewModel1")?.instance();
  //       if (!vmi) return;
  //       r.bindViewModelInstance(vmi);
  //       const color = vmi.color("GeneralColor");
  //       if (!color) return;
  //       color.value = darkmode.matches ? 0xFFFFFFFF : 0xFF000000;
  //     },
  //   });
  //   const changeColor = () => {
  //     const vmi = r.viewModelByName("ViewModel1")?.instance();
  //     if (!vmi) return;
  //     r.bindViewModelInstance(vmi);
  //     const color = vmi.color("GeneralColor");
  //     if (!color) return;
  //     color.value = darkmode.matches ? 0xFFFFFFFF : 0xFF000000;
  //   }
  //   darkmode.addEventListener('change', changeColor);
  // });

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
        <a class="simulator-link" href="/simulateur" style="--index: 3">
          Simuler un devis
          {/* <canvas id="canvas" width="250" height="125" aria-label="Simuler un devis"></canvas> */}
        </a>
      </div>
    </section>
  )
})