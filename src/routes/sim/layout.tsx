import { component$, createContextId, Slot, useContextProvider, useStore, useVisibleTask$ } from "@qwik.dev/core";
import { unwrapStore } from "@qwik.dev/core/internal";

export const cartContext = createContextId<any[]>('cart');

export default component$(() => {
  const cart = useStore<any[]>([]);
  useContextProvider(cartContext, cart);

  useVisibleTask$(() => {
    const storedItem = localStorage.getItem('cart');
    if (!storedItem) return;
    const items = JSON.parse(storedItem);
    for (const item of items) {
      cart.push(item);
    }
  });
  useVisibleTask$(({ track }) => {
    track(cart);
    const unwrap = unwrapStore(cart);
    localStorage.setItem('cart', JSON.stringify(unwrap));
  });
  return (
    <Slot />
  )
});