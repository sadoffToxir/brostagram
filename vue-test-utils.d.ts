import { DOMWrapper } from '@vue/test-utils';

declare module '@vue/test-utils' {
  export class VueWrapper {
    findByTestId(testId: string): DOMWrapper<HTMLElement>;
    findAllByTestId(testId: string): DOMWrapper<HTMLElement>[];
  }
}
