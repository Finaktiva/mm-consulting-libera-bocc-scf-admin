export interface Branding {
    primaryColor: string;
    accentColor: string;
    brandingLogoURL: string;
    brandingFaviconURL: string;
}

export interface UpdateThemePayload {
    primaryColor: string;
    accentColor: string;
}

export interface UpdateLogoOrFaviconPayload {
    brandingLogoURL?: string;
    brandingFaviconURL?: string;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
}

export interface HslPalette {
    50: HSL;
    100: HSL;
    200: HSL;
    300: HSL;
    400: HSL;
    500: HSL;
    600: HSL;
    700: HSL;
    800: HSL;
    900: HSL;
    A100: HSL;
    A200: HSL;
    A400: HSL;
    A700: HSL;
}

export interface Palette {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
}

export interface MaterialPalette extends Palette {
    contrast: Palette;
}
