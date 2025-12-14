import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
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
