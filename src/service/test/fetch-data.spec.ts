import { ENDPOINT_DATA } from '../fetch-data';

describe('Fetch util', () => {
    test('Endpoint as expetyced', () => {
      expect(ENDPOINT_DATA('dog', '10')).toBe('https://www.reddit.com/r/dog/top.json?after=10&limit=10');
    });  
   
  });