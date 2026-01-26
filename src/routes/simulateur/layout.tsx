import { component$, createContextId, Slot, useContextProvider, useStore, useVisibleTask$ } from "@qwik.dev/core";
import { unwrapStore, useStyles$ } from "@qwik.dev/core/internal";
import { Item } from "~/types/simulator";
import styles from './layout.css?inline';


export const cartContext = createContextId<Item[]>('cart');

export default component$(() => {
  useStyles$(styles);
  const cart = useStore<Item[]>([]);
  useContextProvider(cartContext, cart);

  useVisibleTask$(() => {
    const storedItem = localStorage.getItem('cart');
    if (!storedItem) return;
    const items = JSON.parse(storedItem);
    for (const item of items) {
      cart.push(item);
    }
  }, { strategy: 'document-ready' });
  useVisibleTask$(({ track }) => {
    track(cart);
    const unwrap = unwrapStore(cart);
    localStorage.setItem('cart', JSON.stringify(unwrap));
  }, { strategy: 'document-ready' });
  return (
    <Slot />
  )
});