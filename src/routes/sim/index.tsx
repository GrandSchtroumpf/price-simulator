import { component$, useContext } from "@qwik.dev/core";
import { DocumentHead, Link } from "@qwik.dev/router";
import { stepsRecord } from "./steps";
import { cartContext } from "./layout";

export default component$(() => {
  const cart = useContext(cartContext);
  return (
    <main>
      {Object.entries(stepsRecord).map(([key, step]) => <Link href={key}>{step.label}</Link>)}
    </main>
  )
})

export const head: DocumentHead = {
  title: "Simulateur de prix",
  meta: [],
};
