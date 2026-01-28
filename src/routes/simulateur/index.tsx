import { sync$, component$, useContext, useStyles$ } from "@qwik.dev/core";
import { DocumentHead, Link } from "@qwik.dev/router";
import { dynamicFormRecord } from "./forms/index";
import { cartContext } from "./layout";
import styles from "./index.css?inline";

export default component$(() => {
  useStyles$(styles);
  const cart = useContext(cartContext);

  const setViewTransition = sync$((e: Event, el: HTMLAnchorElement) => {
    el.style.setProperty('--transition-background', `${el.dataset.key}-background`);
    el.style.setProperty('--transition-img', `${el.dataset.key}-img`);
    el.style.setProperty('--transition-title', `${el.dataset.key}-title`);
  })

  return (
    <main id="simulator">
      <hgroup>
        <h1>Estimation de devis</h1>
        <p>Il s'agit d'une estimation basé vos critères, une visite sera nécessaire pour créer un devis définitif</p>
      </hgroup>
      <nav aria-label="travaux à réaliser">
        {Object.entries(dynamicFormRecord).map(([key, form]) => (
          <Link key={key} href={`${key}/create`} onClick$={setViewTransition} data-key={key}>
            <div class="img-container">
              <img src={`/imgs/simulator/${key}.webp`} width="1344" height="756" />
            </div>
            <div class="card-content">
              <p>{form.label}</p>
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
