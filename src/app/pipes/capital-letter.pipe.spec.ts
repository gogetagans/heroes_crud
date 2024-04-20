/* tslint:disable:no-unused-variable */

import { CapitalLetterPipe } from './capital-letter.pipe';

describe('Pipe: CapitalLettere', () => {
  let pipe = new CapitalLetterPipe();

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });
});
