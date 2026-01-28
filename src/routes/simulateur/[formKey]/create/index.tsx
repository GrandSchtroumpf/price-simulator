import { component$ } from "@qwik.dev/core";
import { StaticGenerateHandler } from "@qwik.dev/router";
import Form from "~/components/simulator/Form";
import { dynamicFormRecord } from "~/routes/simulateur/forms";

export default component$(() => <Form />);

export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: Object.keys(dynamicFormRecord).map(formKey => ({ formKey })),
  };
};