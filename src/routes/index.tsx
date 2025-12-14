import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Map from "~/components/map/Map";

export default component$(() => {
  return (
    <Map />
  )
})


export const head: DocumentHead = {
  title: "Le P'tit Menuisier",
  meta: [],
};
