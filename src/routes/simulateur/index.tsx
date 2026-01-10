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
        <Link class="btn-icon" id="cart" href="cart" aria-label="Panier pour le devis">
          <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
          </svg>
        </Link>
      )}
    </main>
  )
})

export const head: DocumentHead = {
  title: "Simulateur de prix",
  meta: [],
};
