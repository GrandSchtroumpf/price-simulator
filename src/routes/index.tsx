import { component$ } from "@qwik.dev/core";
import { DocumentHead } from "@qwik.dev/router";
import Map from "~/components/map/Map";
import { Testimonies } from "~/components/testimonies/testimonies";

export default component$(() => {
  return (
    <main>
      <Map />
      <Testimonies />
    </main>
  )
})


export const head: DocumentHead = {
  title: "Le P'tit Menuisier",
  meta: [],
};
