export function parseSizeValues(raw) {
    let arr = [];
    if (Array.isArray(raw)) {
        // e.g. ['31','32']
        arr = raw;
    }
    else if (typeof raw === "string") {
        // Try JSON.parse first
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                arr = parsed.map((v) => String(v));
            }
            else {
                arr = [String(parsed)];
            }
        }
        catch {
            // Fallback to comma‑split
            arr = raw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        }
    }
    // Convert to ints
    return arr.map((s) => {
        const n = parseInt(s, 10);
        if (Number.isNaN(n)) {
            throw new Error(`Invalid size value "${s}"`);
        }
        return n;
    });
}
export function ensureArray(value) {
    if (!value)
        return [];
    if (Array.isArray(value))
        return value;
    if (typeof value === "string") {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [parsed];
        }
        catch {
            // string but not JSON -> treat as single element
            return [value];
        }
    }
    if (typeof value === "object") {
        // object but not array -> wrap it
        return [value];
    }
    // primitive -> wrap it
    return [value];
}
