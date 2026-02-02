import { component$ } from "@qwik.dev/core";
import Form from "~/components/simulator/Form";
import { routeLoader$ } from "@qwik.dev/router";

export const useLoaderParams = routeLoader$(({ params }) => {
  const index = Number(params.index);
  const formKey = params.formKey;

  if (Number.isNaN(index) || !formKey) return null;

  return {
    index,
    formKey,
  };
});

export default component$(() => {
  const params = useLoaderParams();
  return <Form params={params} />
});