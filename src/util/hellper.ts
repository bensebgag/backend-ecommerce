export function parseSizeValues(
    raw: undefined | string | string[]
): number[] {
    let arr: string[] = [];

    if (Array.isArray(raw)) {
        // e.g. ['31','32']
        arr = raw;
    } else if (typeof raw === 'string') {
        // Try JSON.parse first
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                arr = parsed.map((v) => String(v));
            } else {
                arr = [String(parsed)];
            }
        } catch {
            // Fallback to comma‑split
            arr = raw.split(',').map((s) => s.trim()).filter(Boolean);
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