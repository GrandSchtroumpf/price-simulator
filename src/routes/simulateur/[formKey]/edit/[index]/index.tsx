import { component$ } from "@qwik.dev/core";
import { StaticGenerateHandler, useLocation } from "@qwik.dev/router";
import Form from "~/components/simulator/Form";
import { dynamicFormRecord } from "~/routes/simulateur/forms";

export default component$(() => {
  const location = useLocation();
  console.log("In redirect component", location, location.params);
  return <Form />;
});

export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: Object.keys(dynamicFormRecord).map(formKey => ({
      formKey,
      index: '0'
    })),
  };
};