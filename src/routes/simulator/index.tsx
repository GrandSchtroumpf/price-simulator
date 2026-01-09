import { component$, useContext, useStyles$ } from "@qwik.dev/core";
import { DocumentHead, Link } from "@qwik.dev/router";
import { stepsRecord } from "./steps";
import { cartContext } from "./layout";
import styles from "./index.css?inline";

export default component$(() => {
  useStyles$(styles);
  const cart = useContext(cartContext);
  return (
    <main>
      <ul>
        {Object.entries(stepsRecord).map(([key, step]) => (
          <li key={key}><Link href={key}>{step.label}</Link></li>
        ))}
      </ul>
      <a href="cart">Cart</a>
    </main>
  )
})

export const head: DocumentHead = {
  title: "Simulateur de prix",
  meta: [],
};
