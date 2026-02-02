import { component$, Slot, $, useOnDocument } from "@qwik.dev/core";
import swUrl from '~/media/service-worker?url&no-inline';

export default component$(() => {

  useOnDocument('qidle', $(async () => {
    if ("serviceWorker" in navigator) {
      await navigator.serviceWorker.register(swUrl, { scope: '/', type: 'module' });
    }
  }));
  
  return <Slot />;
});