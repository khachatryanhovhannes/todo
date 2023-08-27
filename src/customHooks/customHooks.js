import { useState, useEffect } from "react";

export function useDebounce(value, delay = 300) {
    const [debounsed, setDebounsed] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounsed(value), delay);
        return () => clearTimeout(handler);

    }, [value, delay]);

    return debounsed;
}