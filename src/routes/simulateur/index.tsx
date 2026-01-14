import { component$, useContext, useStyles$ } from "@qwik.dev/core";
import { DocumentHead, Link } from "@qwik.dev/router";
import { stepsRecord } from "./steps";
import { cartContext } from "./layout";
import styles from "./index.css?inline";

export default component$(() => {
  useStyles$(styles);
  const cart = useContext(cartContext);
  return (
    <main id="simulator">
      <hgroup>
        <h1>Estimation de devis</h1>
        <p>Il s'agit d'une estimation basé vos critères, une visite sera nécessaire pour créer un devis définitif</p>
      </hgroup>
      <nav aria-label="travaux à réaliser">
        {Object.entries(stepsRecord).map(([key, step]) => (
          <Link key={key} href={key}>
            <div class="img-container" style={{ viewTransitionName: `${key}-img` }}>
              <img src={`/imgs/simulator/${key}.webp`} width="1344" height="756" />
            </div>
            <div class="card-content" style={{ ['--transition-name']: `${key}-background` }}>
              <p style={{ viewTransitionName: `${key}-title` }}>{step.label}</p>
            </div>
          </Link>
        ))}
      </nav>
      {!!cart.length && (
        <Link class="cart" href="cart" aria-label="Panier pour le devis">
          <p>Voir le devis</p>
        </Link>
      )}
    </main>
  )
})

export const head: DocumentHead = {
  title: "Simulateur de prix",
  meta: [],
};
