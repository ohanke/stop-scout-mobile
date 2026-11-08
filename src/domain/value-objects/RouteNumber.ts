export class RouteNumber {
  public readonly value: string;

  constructor(rawRouteIdentifier: number | string | null | undefined) {
    this.value = RouteNumber.normalize(rawRouteIdentifier);
  }

  private static normalize(rawRouteIdentifier: number | string | null | undefined): string {
    if (rawRouteIdentifier === null || rawRouteIdentifier === undefined) {
      return '?';
    }

    const trimmedRouteIdentifier = String(rawRouteIdentifier).trim();
    if (!trimmedRouteIdentifier) {
      return '?';
    }

    const numericValue = Number(trimmedRouteIdentifier);
    if (!Number.isNaN(numericValue) && Number.isInteger(numericValue)) {
      if (numericValue >= 10000) {
        return String(numericValue % 10000);
      }
      return String(numericValue);
    }

    return trimmedRouteIdentifier.toUpperCase();
  }

  public isNightLine(): boolean {
    return this.value.startsWith('N');
  }

  public equals(otherRouteNumber: RouteNumber | null | undefined): boolean {
    if (!otherRouteNumber) {
      return false;
    }
    return this.value === otherRouteNumber.value;
  }

  public toString(): string {
    return this.value;
  }
}
