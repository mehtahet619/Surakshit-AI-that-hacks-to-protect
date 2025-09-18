import { ulid } from 'ulid';

export class ULIDGenerator {
  static generate(): string {
    return ulid();
  }

  static generateWithPrefix(prefix: string): string {
    return `${prefix}_${ulid()}`;
  }

  static isValid(id: string): boolean {
    // ULID format: 26 characters, base32 encoded
    const ulidRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;
    return ulidRegex.test(id);
  }

  static extractTimestamp(id: string): Date | null {
    if (!this.isValid(id)) {
      return null;
    }
    
    try {
      // First 10 characters represent timestamp in base32
      const timestampPart = id.substring(0, 10);
      const timestamp = parseInt(timestampPart, 32);
      return new Date(timestamp);
    } catch {
      return null;
    }
  }
}

export default ULIDGenerator;