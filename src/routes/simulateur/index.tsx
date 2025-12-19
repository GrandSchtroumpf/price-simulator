import { $, component$, useComputed$, useStore, useStyles$, useVisibleTask$ } from "@qwik.dev/core";
import { unwrapStore } from "@qwik.dev/core/internal";
import { useSignal } from "@qwik.dev/core";
import { transition$ } from "~/components/transition";
import { Option, steps } from './steps';
import { DocumentHead } from "@qwik.dev/router";
import styles from './index.css?inline';

type StepKey = keyof typeof steps;

interface Answer {
  question: string;
  option: StepKey;
}

type Simulation = Answer[];

/** Enforce value is value CSS */
const transitionName = (value: string | number) => ({ viewTransitionName: `_${value}_` });

const getDescription = (question: StepKey) => steps[question].description;
const getOption = (answer: Answer) => steps[answer.question].options[answer.option];
const getOptions = (question: StepKey) => Object.entries(steps[question].options);
const getSimulationName = (simulation: Answer[]) => {
  const answer = simulation[0];
  return getOption(answer).label;
}

const formatter = Intl.NumberFormat('fr-FR', { style: "currency", currency: 'EUR' });

export default component$(() => {
  useStyles$(styles);
  // Store the current question
  const current = useSignal<StepKey>('task');
  // Store the answer to each previous questions
  const answers = useStore<Answer[]>([]);
  // Store previous simulations
  const simulations = useStore<Simulation[]>([]);

  useVisibleTask$(() => {
    const local = localStorage.getItem('simulations');
    if (local) simulations.splice(0, Infinity, ...JSON.parse(local));
  })
  useVisibleTask$(({ track }) => {
    track(simulations);
    if (simulations.length) {
      localStorage.setItem('simulations', JSON.stringify(unwrapStore(simulations)));
    }
  });
  useVisibleTask$(({ track }) => {
    track(current);
    document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' });
  })

  const price = useComputed$(() => {
    const total = answers.reduce((acc, answer) => {
      const option = getOption(answer);
      return acc + option.price;
    }, 0);
    return formatter.format(total);
  });

  const back = transition$((index: number) => {
    const lastStep = answers[index];
    current.value = lastStep.question;
    answers.splice(index, Infinity);
  })

  const add = transition$((optionKey: string, option: Option) => {
    const next = option.next ?? steps[current.value].next;
    if (!next) {
      const mailto = document.getElementById('mailto') as HTMLAnchorElement;
      const subject = encodeURIComponent('Simulation - Devis');
      const body = answers
        .map(answer => `${getDescription(answer.question)}: ${getOption(answer).label}`)
        .join('\n');
      mailto.href= `mailto:erwanrichard.lpm@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      mailto.click();
    } else {
      const answer: Answer = {
        question: current.value,
        option: optionKey,
      };
      answers.push(answer);
      if (next === 'task') {
        simulations.push([...answers]);
        answers.splice(0, Infinity);
      }
      current.value = next;
    }
  });

  const edit = $((simulation: Simulation) => {
    answers.splice(0, Infinity, ...simulation);
    current.value = simulation.at(-1)!.question;
  });

  const remove = $((index: number) => {
    simulations.splice(index, 1);
  });

  return (
    <main>
      <aside>
        <ul class="simulations">
          {simulations.map((simulation, i) => (
            <li key={i}>
              <span>{getSimulationName(simulation)}</span>
              <button onClick$={() => edit(simulation)}>
                <svg height="24px" viewBox="0 -960 960 960" width="24px" stroke="currentColor">
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                </svg>
              </button>
              <button onClick$={() => remove(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section>
        <ol>
            {answers.map((answer, index) => (
              <>
                <li key={answer.question}>
                  <span style={transitionName(answer.question)}>
                    {getDescription(answer.question)}
                  </span>
                </li>
                <li key={answer.option}>
                  <span style={transitionName(answer.option)}>
                    {getOption(answer).label}
                  </span>
                  <button class="back" onClick$={() => back(index)} aria-label="back to this step">
                    <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                      <path d="M680-160v-400H313l144 144-56 57-241-241 240-240 57 57-144 143h447v480h-80Z"/>
                    </svg>
                  </button>
                </li>
              </>
            ))}
            <li>
              <svg class="logo" viewBox="0 0 100 100" fill="none" stroke="currentColor" width="40" height="40">
                <g>
                  <path d="M29.21,66.17c-.24.24-.24.63,0,.86l1.2,1.2c1.33,1.33,3.48,1.33,4.8,0l31.61-31.61-4.04-4.04-33.58,33.58ZM33.04,66.05c-.27.98-1.37,1.46-2.28,1.02-.62-.3-.76-1.13-.27-1.62l10.2-10.15c-5.35,5.35-7.11,8.79-7.65,10.75ZM52.05,43.81l10.7-10.58,3.45,3.43c-8.09,1.18-14.15,7.15-14.15,7.15Z"/>
                  <path d="M81.38,35.51l-2.39-2.39c-.09-.09-.23-.11-.34-.06-1.96.77-3.09-1.55-3.49-2.61-.34.39-1.05,1.09-1.8,1.79-.55.72-1.04,1.57-.69,1.99.67.81,1.66,2.33,1.42,3.25.01.03-.39-1.7-2.64-3.25-.09-.09-.19-.1-.27-.08.79.63,2.53,2.17,2.77,3.71l2.54,2.54c.16.16.42.16.58,0l4.31-4.31c.16-.16.16-.42,0-.58ZM76.44,40.17l-2.28-2.37,1.9-1.76c-1.76,1.58-.1,3.6.37,4.12l.12.13s-.05-.05-.12-.13Z"/>
                  <path d="M75.01,28.49l-5.31-5.31c-8.52-8.52-16.72-2.62-16.72-2.62,0,0,7.55-2.16,14.48,4.77.13.13.04.55-.04.71-.8,1.55-4.35,5.46-4.35,5.46-.14.18-.14.41-.02.59l4.29,4.29c.19.13.45.12.63-.04l2.55-2.37s3.57-3.35,4.5-4.18c.35-.36.36-.94,0-1.3ZM68.17,26.56c-.52.79-3.73,4.74-3.96,5.02,0,.01-.01.02-.01.02-.09.12-.09.28,0,.4l1.49,2.28-2.27-2.27c-.13-.13-.13-.34,0-.46,0,0,3.07-3.15,4.41-5.54.15-.27.08-.53-.15-.85,0,0-5.17-6.22-13.46-5.03.65-.12,8.27-1.53,13.89,4.88,0,0,.6.75.06,1.56ZM69.5,34.65c-.77.74-.61.5-.11-.1l5.23-4.93c.17-.19.25-.46.1-.69,0,0-.72-.56-4.24-4.58-.12-.14,4.33,4.39,4.33,4.39.26.26.25.67-.01.92l-5.3,4.99Z"/>
                </g>
                <g>
                  <path d="M70.79,66.17l-33.58-33.58-4.04,4.04,31.61,31.61c1.33,1.33,3.48,1.33,4.8,0l1.2-1.2c.24-.24.24-.63,0-.86ZM33.51,36.63l3.7-3.7c-3.57,3.57,6.03,13.42,6.03,13.42l-9.72-9.72ZM69.51,67.35c-2.03,1.07-3.92.67-5-.03-.14-.09-.25-.23-.33-.38-1.7-3.33-8.95-10.76-11.78-13.6-.38-.37-.76-.75-1.15-1.14,0,0,.44.44,1.15,1.14,13.41,13.28,16.28,13.9,17.07,13.85.09,0,.13.12.05.17Z"/>
                  <path d="M24.84,30.45c-.4,1.05-1.52,3.38-3.49,2.61-.12-.05-.25-.03-.34.06l-2.39,2.39c-.16.16-.16.42,0,.58l4.31,4.31c.16.16.42.16.58,0l2.54-2.54c.24-1.55,2.02-3.11,2.79-3.72-.72-.49-3.26-2.83-4-3.69ZM25.59,37.15c-.5-.5-4.13-3.91-6.76-1.44l2.3-2.3c.05-.05.13-.07.19-.04.44.17,2.14.64,3.26-1.74.03-.05-.21,1.64-2.04,2.17-.11.03-.15.16-.07.24l3.11,3.11.06.06-.06-.06Z"/>
                  <path d="M36.93,31.5s-3.55-3.91-4.35-5.46c-.08-.16-.17-.59-.04-.71,6.94-6.94,14.48-4.77,14.48-4.77,0,0-8.21-5.89-16.72,2.62l-5.31,5.31c-.36.36-.35.94,0,1.3.93.84,4.48,4.17,4.5,4.18,0,0,0,0,0,0h0l2.55,2.36c.18.16.43.17.63.04l4.29-4.29c.12-.18.12-.42-.02-.59ZM30.5,34.65l-5.3-4.99c-.26-.25-.27-.66-.01-.92,0,0,4.45-4.54,4.33-4.39-3.52,4.02-3.61,4.26-3.61,4.26-.15.23-.07.5.1.69l4.61,5.25c.5.6.66.84-.11.1ZM36.58,32l-2.27,2.27,1.65-2.15c.09-.12.09-.28,0-.4-.62-.85-3.1-4.03-3.48-5.39,0,0,1.55,2.74,4.09,5.2.13.13.13.34,0,.46Z"/>
                </g>
                <path class="st0" d="M34.86,10.88h50.14v70H15V30.75c0-10.96,8.9-19.86,19.86-19.86Z" transform="translate(47.09 -21.92) rotate(45)" stroke-width="3"/>
              </svg>
              <h3 style={transitionName(current.value)}>
                {getDescription(current.value)}
              </h3>
            </li>
            <li>
              <menu id="menu">
                {getOptions(current.value).map(([key, option]) => (
                  <button key={key} style={transitionName(key)} onClick$={() => add(key, option)} role="menuitem">
                    {option.label}
                  </button>
                ))}
              </menu>
            </li>
          </ol>
        <footer>
          {/* @ts-expect-error exist */}
          <button class="menu" commandFor="simulations-dialog" command="show-modal">
            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </button>
          <h1>Estimation: <span class="price">{price}</span></h1>
        </footer>
      </section>
      <a id="mailto" hidden href=""></a>
      {/* @ts-expect-error exist */}
      <dialog id="simulations-dialog" closedBy="any">
        <ul class="simulations">
          {simulations.map((simulation, i) => (
            <li key={i}>
              <span>{getSimulationName(simulation)}</span>
              <button onClick$={() => edit(simulation)}>
                <svg height="24px" viewBox="0 -960 960 960" width="24px" stroke="currentColor">
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                </svg>
              </button>
              <button onClick$={() => remove(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </main>
  )
})

export const head: DocumentHead = {
  title: "Simulateur de prix",
  meta: [],
};
