export class DomainError extends Error {
  protected source: unknown | undefined;

  constructor(data?: { message?: string; source?: unknown }) {
    super(data?.message);
    this.source = data?.source;
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, DomainError.prototype);
  }

  getSource() {
    return this.source;
  }
}
