export const toBengaliNumber = (
    num: number | string | undefined | null,
): string => {
    if (num === undefined || num === null) {
        return "০";
    }
    const str = num.toString();
    
    if (str.trim() === "" || !/\d/.test(str)) {
        return "০";
    }
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    
    return str.replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
};

export const formatPrice = (price: number | undefined | null): string => {
    if (price === undefined || price === null || isNaN(Number(price))) {
        return "—";
    }
    const formatted = Number(price).toLocaleString("en-IN");
    return toBengaliNumber(formatted);
};


export const formatPercent = (percent: number | undefined | null): string => {
    if (percent === undefined || percent === null || isNaN(Number(percent))) {
        return "০.০";
    }
    const abs = Math.abs(percent).toFixed(1);
    return toBengaliNumber(abs);
};


export const getChangeColor = (type: "up" | "down" | "flat"): string => {
    if (type === "up") return "text-green-600";
    if (type === "down") return "text-red-500";
    return "text-gray-400";
};


export const getChangeIcon = (type: "up" | "down" | "flat"): string => {
    if (type === "up") return "▲";
    if (type === "down") return "▼";
    return "—";
};


export const getChangeBg = (type: "up" | "down" | "flat"): string => {
    if (type === "up") return "bg-green-50";
    if (type === "down") return "bg-red-50";
    return "bg-gray-50";
};


export const createSlug = (text: string): string => {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\u0980-\u09FF-]/g, "");
};


 
export const translateUnit = (unit: string): string => {
    const map: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };
    return map[unit] || unit;
};


export const categoryToUrlSlug = (apiCategory: string): string => {
    
    return apiCategory;
};


export const navSlugToApiFilter = (navSlug: string): string => {
    const map: Record<string, string> = {
        shobji: "sobji",
        "dim-murgi": "dim-dui",
        moshla: "mosla",
    };
    return map[navSlug] || navSlug;
};