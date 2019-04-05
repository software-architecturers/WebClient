import { EncodeURIPipe } from './encode-uri.pipe';

describe('EncodeUriPipe', () => {
  it('should encode as #encodeURI', () => {
    const pipe = new EncodeURIPipe();
    const testString = '1 + 2';
    expect(pipe.transform(testString)).toBe(encodeURI(testString));
  });
});
