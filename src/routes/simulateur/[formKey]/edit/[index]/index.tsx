import { component$ } from "@qwik.dev/core";
import { StaticGenerateHandler, useLocation } from "@qwik.dev/router";
import Form from "~/components/simulator/Form";
import { dynamicFormRecord } from "~/routes/simulateur/forms";

export default component$(() => {
  const { params } = useLocation();
  const index = Number(params.index);
  return <Form index={index} />;
});

export const onStaticGenerate: StaticGenerateHandler = () => {
  return {
    params: Object.keys(dynamicFormRecord).map(formKey => ({
      formKey
    })),
  };
};