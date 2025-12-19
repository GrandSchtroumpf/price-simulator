import { $, component$, useOn } from "@qwik.dev/core";

export default component$(() => {
  useOn('qvisible', $(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio > 0.5) entry.target.classList.add('is-visible');
        else entry.target.classList.remove('is-visible');
      }
    }, {
      threshold: [0.5]
    });
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      observer.observe(section);
    }
  }));

  return (
    <main>
      {/* Add 1 component / section here */}
    </main>
  )
})