import { HSL, HslPalette, MaterialPalette, Palette } from '@libera/models/branding';
import invert from 'invert-color';
import materialPalette from 'material-palette';

export const toMaterialPalette = (color: string): MaterialPalette => {
    const hslPalette: HslPalette = materialPalette(hexToHSL(color));
    const palette = toPalette(hslPalette);
    const contrastPalette = toContrastPalette(palette);
    return {
        ...palette,
        contrast: contrastPalette,
    };
};

const toPalette = (palette: HslPalette): Palette => {
    return Object.entries(palette).reduce(
        (palette, [key, value]: [string | number, HSL]) => {
            palette[key] = hslToHex(value.h, value.s, value.l);
            return palette;
        },
        {} as Palette
    );
};

const toContrastPalette = (palette: Palette): Palette => {
    return Object.entries(palette).reduce(
        (palette, [key, value]: [string | number, string]) => {
            palette[key] = invert(value, true);
            return palette;
        },
        {} as Palette
    );
};

const hexToHSL = (hex: string) => {
    // Convert hex to RGB first
    let r: any = 0,
        g: any = 0,
        b: any = 0;
    if (hex.length == 4) {
        r = '0x' + hex[1] + hex[1];
        g = '0x' + hex[2] + hex[2];
        b = '0x' + hex[3] + hex[3];
    } else if (hex.length == 7) {
        r = '0x' + hex[1] + hex[2];
        g = '0x' + hex[3] + hex[4];
        b = '0x' + hex[5] + hex[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        h,
        s,
        l,
    };
};

const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r: any = 0,
        g: any = 0,
        b: any = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
};
