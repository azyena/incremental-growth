const KM = 1_000;
const AU = 149_597_870_700;
const LY = 9_460_730_472_580_800;

/**
 * Slices a number to its respective format.
 * e.g. 1234000 -> 1,234,000
 */
function format(number: number, decimals = 3): string {
    if(number >= 1e12) {
        return number.toExponential(decimals).replace('+','');
    }

    let str = String(Math.floor(number));
    let decimal = str.split(/(?=(?:...)*$)/).join(',');
    let fraction = String(Math.floor((number % 1) * 1000)).padEnd(decimals, '0');

    return `${decimal}.${fraction}`;
}

export const formatSize = function(number: number, decimals = 3): string {
    if(number < KM) return `${number.toFixed(decimals)} m`;
    if(number < AU) return `${format(number / KM)} km`;
    if(number < LY) return `${format(number / AU)} AU`;
    if(number < LY * 1e3) return `${format(number / LY)} ly`;
    if(number < LY * 1e6) return `${format(number / (LY * 1e3))} kly`;
    if(number < LY * 1e9) return `${format(number / (LY * 1e6))} Mly`;
    if(number < LY * 1e9 * 93) return `${format(number / (LY * 1e9))} Gly`;
    return `${format(number / (LY * 1e9 * 93))} uni`;
}