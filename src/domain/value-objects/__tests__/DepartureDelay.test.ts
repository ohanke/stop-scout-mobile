import { DepartureDelay } from '../DepartureDelay';

describe('DepartureDelay Value Object', () => {
  describe('classification for on-time departures', () => {
    it('should classify zero seconds delay as ON_TIME', () => {
      const departureDelay = new DepartureDelay(0);

      expect(departureDelay.seconds).toBe(0);
      expect(departureDelay.severity).toBe('ON_TIME');
      expect(departureDelay.formattedText).toBe('Na czas');
      expect(departureDelay.shouldAnimate).toBe(false);
      expect(departureDelay.isDelayed()).toBe(false);
    });

    it('should classify negative delay (ahead of schedule) as ON_TIME', () => {
      const departureDelay = new DepartureDelay(-30);

      expect(departureDelay.seconds).toBe(-30);
      expect(departureDelay.severity).toBe('ON_TIME');
      expect(departureDelay.formattedText).toBe('Na czas');
      expect(departureDelay.shouldAnimate).toBe(false);
      expect(departureDelay.isDelayed()).toBe(false);
    });

    it('should default null input to zero seconds and ON_TIME severity', () => {
      const departureDelay = new DepartureDelay(null);

      expect(departureDelay.seconds).toBe(0);
      expect(departureDelay.severity).toBe('ON_TIME');
      expect(departureDelay.formattedText).toBe('Na czas');
      expect(departureDelay.shouldAnimate).toBe(false);
      expect(departureDelay.isDelayed()).toBe(false);
    });

    it('should default undefined input to zero seconds and ON_TIME severity', () => {
      const departureDelay = new DepartureDelay(undefined);

      expect(departureDelay.seconds).toBe(0);
      expect(departureDelay.severity).toBe('ON_TIME');
      expect(departureDelay.formattedText).toBe('Na czas');
      expect(departureDelay.shouldAnimate).toBe(false);
      expect(departureDelay.isDelayed()).toBe(false);
    });
  });

  describe('classification for minor delays', () => {
    it('should classify delay of 45 seconds as MINOR without animation', () => {
      const departureDelay = new DepartureDelay(45);

      expect(departureDelay.seconds).toBe(45);
      expect(departureDelay.severity).toBe('MINOR');
      expect(departureDelay.formattedText).toBe('+45s');
      expect(departureDelay.shouldAnimate).toBe(false);
      expect(departureDelay.isDelayed()).toBe(true);
    });

    it('should classify delay of 119 seconds as MINOR without animation', () => {
      const departureDelay = new DepartureDelay(119);

      expect(departureDelay.seconds).toBe(119);
      expect(departureDelay.severity).toBe('MINOR');
      expect(departureDelay.formattedText).toBe('+119s');
      expect(departureDelay.shouldAnimate).toBe(false);
      expect(departureDelay.isDelayed()).toBe(true);
    });
  });

  describe('classification for major delays', () => {
    it('should classify delay of exactly 120 seconds (2 minutes) as MAJOR with animation enabled', () => {
      const departureDelay = new DepartureDelay(120);

      expect(departureDelay.seconds).toBe(120);
      expect(departureDelay.severity).toBe('MAJOR');
      expect(departureDelay.formattedText).toBe('+2 min');
      expect(departureDelay.shouldAnimate).toBe(true);
      expect(departureDelay.isDelayed()).toBe(true);
    });

    it('should classify delay of 210 seconds as MAJOR with animation enabled and rounded down minutes', () => {
      const departureDelay = new DepartureDelay(210);

      expect(departureDelay.seconds).toBe(210);
      expect(departureDelay.severity).toBe('MAJOR');
      expect(departureDelay.formattedText).toBe('+3 min');
      expect(departureDelay.shouldAnimate).toBe(true);
      expect(departureDelay.isDelayed()).toBe(true);
    });
  });

  describe('structural equality comparison', () => {
    it('should return true when comparing two departure delay instances with equal seconds', () => {
      const firstDepartureDelay = new DepartureDelay(150);
      const secondDepartureDelay = new DepartureDelay(150);

      expect(firstDepartureDelay.equals(secondDepartureDelay)).toBe(true);
    });

    it('should return false when comparing two departure delay instances with different seconds', () => {
      const firstDepartureDelay = new DepartureDelay(45);
      const secondDepartureDelay = new DepartureDelay(120);

      expect(firstDepartureDelay.equals(secondDepartureDelay)).toBe(false);
    });

    it('should return false when comparing against null or undefined', () => {
      const validDepartureDelay = new DepartureDelay(60);

      expect(validDepartureDelay.equals(null)).toBe(false);
      expect(validDepartureDelay.equals(undefined)).toBe(false);
    });
  });
});
