import { component$, createContextId, Slot, useContextProvider, useStore, useVisibleTask$ } from "@qwik.dev/core";
import { unwrapStore, useSignal, useStyles$, Signal } from "@qwik.dev/core/internal";
import { Item } from "~/types/simulator";
import ImgDeck from "~/media/simulator/deck.webp";
import ImgFloor from "~/media/simulator/floor.webp";
import ImgInterior from "~/media/simulator/interior.webp";
import ImgStairs from "~/media/simulator/stairs.webp";
import ImgExterior from "~/media/simulator/exterior.webp";
import styles from './layout.css?inline';

interface CartContext {
  cart: Item[];
  editIndex: Signal<number | undefined>;
}

export const cartContext = createContextId<CartContext>('cart');

export const formImgs = {
  deck: ImgDeck,
  stairs: ImgStairs,
  interior: ImgInterior,
  floor: ImgFloor,
  exterior: ImgExterior
}
export type FormImg = keyof typeof formImgs;

export default component$(() => {
  useStyles$(styles);
  const cart = useStore<Item[]>([]);
  const editIndex = useSignal<number>();
  useContextProvider(cartContext, { cart, editIndex });

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