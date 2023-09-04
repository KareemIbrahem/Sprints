import { UnCompletedPipe } from './un-completed.pipe';

describe('UnCompletedPipe', () => {
  it('create an instance', () => {
    const pipe = new UnCompletedPipe();
    expect(pipe).toBeTruthy();
  });
});
