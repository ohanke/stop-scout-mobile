import { RouteNumber } from '../RouteNumber';

describe('RouteNumber Value Object', () => {
  describe('normalization and construction', () => {
    it('should assign question mark fallback when raw value is null', () => {
      const routeNumber = new RouteNumber(null);
      expect(routeNumber.value).toBe('?');
    });

    it('should assign question mark fallback when raw value is undefined', () => {
      const routeNumber = new RouteNumber(undefined);
      expect(routeNumber.value).toBe('?');
    });

    it('should assign question mark fallback when raw value is an empty string', () => {
      const routeNumber = new RouteNumber('');
      expect(routeNumber.value).toBe('?');
    });

    it('should assign question mark fallback when raw value consists only of whitespace', () => {
      const routeNumber = new RouteNumber('   ');
      expect(routeNumber.value).toBe('?');
    });

    it('should correctly format standard integer route numbers', () => {
      const singleDigitRouteNumber = new RouteNumber(9);
      const multipleDigitsRouteNumber = new RouteNumber(199);

      expect(singleDigitRouteNumber.value).toBe('9');
      expect(multipleDigitsRouteNumber.value).toBe('199');
    });

    it('should extract modulo ten thousand for special route numbers greater than or equal to ten thousand', () => {
      const specialRouteNumberWithPrefix = new RouteNumber(10177);
      expect(specialRouteNumberWithPrefix.value).toBe('177');
    });

    it('should handle string numeric representations and trim extra whitespace', () => {
      const stringRouteNumberWithWhitespace = new RouteNumber('  12  ');
      expect(stringRouteNumberWithWhitespace.value).toBe('12');
    });

    it('should uppercase alphanumeric route numbers such as night lines', () => {
      const lowercaseNightLine = new RouteNumber('n1');
      expect(lowercaseNightLine.value).toBe('N1');
    });
  });

  describe('isNightLine verification', () => {
    it('should return true when route number starts with capital letter N', () => {
      const nightRouteNumber = new RouteNumber('N8');
      expect(nightRouteNumber.isNightLine()).toBe(true);
    });

    it('should return true when input was lowercase night line prefix', () => {
      const nightRouteNumberFromLowercase = new RouteNumber('n14');
      expect(nightRouteNumberFromLowercase.isNightLine()).toBe(true);
    });

    it('should return false for daytime numeric routes', () => {
      const regularDayRouteNumber = new RouteNumber(12);
      expect(regularDayRouteNumber.isNightLine()).toBe(false);
    });

    it('should return false when value resolved to question mark', () => {
      const fallbackRouteNumber = new RouteNumber(null);
      expect(fallbackRouteNumber.isNightLine()).toBe(false);
    });
  });

  describe('structural equality comparison', () => {
    it('should return true when comparing two instances with identical values', () => {
      const firstRouteNumberInstance = new RouteNumber(10177);
      const secondRouteNumberInstance = new RouteNumber('177');

      expect(firstRouteNumberInstance.equals(secondRouteNumberInstance)).toBe(true);
    });

    it('should return false when comparing two instances with different values', () => {
      const firstRouteNumber = new RouteNumber(6);
      const secondRouteNumber = new RouteNumber(8);

      expect(firstRouteNumber.equals(secondRouteNumber)).toBe(false);
    });

    it('should return false when comparing against null or undefined', () => {
      const validRouteNumber = new RouteNumber(5);

      expect(validRouteNumber.equals(null)).toBe(false);
      expect(validRouteNumber.equals(undefined)).toBe(false);
    });
  });

  describe('string representation', () => {
    it('should return string value when invoking toString', () => {
      const routeNumber = new RouteNumber(10);
      expect(routeNumber.toString()).toBe('10');
    });
  });
});
