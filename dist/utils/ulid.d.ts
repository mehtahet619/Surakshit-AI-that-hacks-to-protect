export declare class ULIDGenerator {
    static generate(): string;
    static generateWithPrefix(prefix: string): string;
    static isValid(id: string): boolean;
    static extractTimestamp(id: string): Date | null;
}
export default ULIDGenerator;
//# sourceMappingURL=ulid.d.ts.map