import { $, implicit$FirstArg, type QRL } from '@builder.io/qwik';

export interface ViewTransitionOptions {
  update?: () => any;
  types?: string[];
  root?: string | Element;
}
export function startViewTransition(options: ViewTransitionOptions = {}) {
  const { update = () => null, types = [], root = document } = options;
  const element =
    typeof root === 'string' ? document.getElementById(root) : root;
  if (element && 'startViewTransition' in element) {
    let transition;
    try {
      transition = (element as any).startViewTransition({
        update: async () => {
          if (update) await update();
        },
        types: ['qwik', ...types],
      });
    } catch {
      // For browsers that don't support types
      transition = (element as any).startViewTransition(async () => {
        if (update) await update();
      });
    }
    document.dispatchEvent(
      new CustomEvent('qViewTransition', { detail: transition })
    );
    return transition;
  } else {
    // For browsers that don't support view transition api
    if (update) return update();
  }
}

/** Imperatively start view transition  */
export function transitionQrl<T extends any[]>(
  qrl: QRL<(...args: T) => any>,
  options?: Omit<ViewTransitionOptions, 'update'>
) {
  return $((...args: T) => {
    return startViewTransition({
      update: async () => {
        await qrl(...args);
        await new Promise((res) => setTimeout(res, 20));
      },
      ...options,
    });
  });
}
export const transition$ = implicit$FirstArg(transitionQrl);