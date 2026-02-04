import { component$, useContext, useStyles$ } from "@qwik.dev/core";
import { DocumentHead, Link } from "@qwik.dev/router";
import { dynamicFormRecord } from "./forms/index";
import { cartContext } from "./layout";
import styles from "./index.css?inline";
import { Logo } from "~/components/logo/Logo";


export default component$(() => {
  useStyles$(styles);
  const { cart } = useContext(cartContext);


  return (
    <main id="simulator">
      <header>
        <a href="/" aria-label="Accueil">
          <Logo />
        </a>
        <hgroup>
          <h1>Estimation de devis</h1>
          <p>Il s'agit d'une estimation basée sur vos critères. Une visite sera nécessaire pour créer un devis définitif.</p>
        </hgroup>
      </header>
      <nav aria-label="travaux à réaliser">
        {Object.entries(dynamicFormRecord).map(([key, form]) => (
          <Link key={key} href={`${key}`} data-key={key}>
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
