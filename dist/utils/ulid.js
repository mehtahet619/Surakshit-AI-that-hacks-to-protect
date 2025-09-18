"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ULIDGenerator = void 0;
const ulid_1 = require("ulid");
class ULIDGenerator {
    static generate() {
        return (0, ulid_1.ulid)();
    }
    static generateWithPrefix(prefix) {
        return `${prefix}_${(0, ulid_1.ulid)()}`;
    }
    static isValid(id) {
        // ULID format: 26 characters, base32 encoded
        const ulidRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;
        return ulidRegex.test(id);
    }
    static extractTimestamp(id) {
        if (!this.isValid(id)) {
            return null;
        }
        try {
            // First 10 characters represent timestamp in base32
            const timestampPart = id.substring(0, 10);
            const timestamp = parseInt(timestampPart, 32);
            return new Date(timestamp);
        }
        catch {
            return null;
        }
    }
}
exports.ULIDGenerator = ULIDGenerator;
exports.default = ULIDGenerator;
//# sourceMappingURL=ulid.js.map