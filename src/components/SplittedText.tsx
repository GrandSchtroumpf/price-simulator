import { component$ } from "@qwik.dev/core";

interface Props {
  text: string;
  mode: 'letter' | 'word';
}

export const SplittedText = component$<Props>(({ text, mode }) => {
  return (
    text.split(mode === 'letter' ? '' : ' ').map((segment, i) => (
      <span key={i} style={{['--index']: i}}>
        {segment === ' ' ? '\u00A0' : segment}
      </span>
    ))
  )
})