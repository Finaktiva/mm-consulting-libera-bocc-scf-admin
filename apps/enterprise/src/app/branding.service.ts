import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    Inject,
    Injectable,
    PLATFORM_ID,
    Renderer2,
    RendererFactory2,
} from '@angular/core';
import { MaterialPalette } from '@libera/models/branding';
import { toMaterialPalette } from './utils';

@Injectable({
    providedIn: 'root',
})
export class BrandingService {
    private renderer: Renderer2;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: Object,
        rendererFactory: RendererFactory2
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    setTheme(primary: string, accent: string) {
        if (!isPlatformBrowser(this.platformId)) return;

        const primaryPalette = toMaterialPalette(primary);

        const accentPalette = toMaterialPalette(accent);

        const styleElement = this.getStyleElement();

        if (styleElement) this.removeStyleElement(styleElement);

        this.insertStyleElement(
            this.createStyleElement(
                this.getStyles(primaryPalette, accentPalette)
            )
        );
    }

    setFavicon(url: string) {
        // const href =
        //     url.indexOf('?') === -1
        //         ? `${url}?cacheBust=${Date.now()}`
        //         : `${url}&cacheBust=${Date.now()}`;

        this.removeAllFaviconElements();

        this.insertFaviconElement(this.createFaviconElement(url));
    }

    reset() {
        const styleElement = this.getStyleElement();

        if (styleElement) this.removeStyleElement(styleElement);

        this.setFavicon('favicon.ico');
    }

    private removeAllFaviconElements() {
        const elements = this.document.head.querySelectorAll<HTMLLinkElement>(
            'link[rel*="icon"]'
        );

        Array.from(elements).forEach(element =>
            this.renderer.removeChild(this.document.head, element)
        );
    }

    private createFaviconElement(url: string) {
        const element: HTMLLinkElement = this.renderer.createElement('link');

        this.renderer.setAttribute(element, 'rel', 'icon');
        this.renderer.setAttribute(element, 'type', 'image/x-icon');
        this.renderer.setAttribute(element, 'href', url);

        return element;
    }

    private insertFaviconElement(element: HTMLLinkElement) {
        this.renderer.appendChild(this.document.head, element);
    }

    private getStyleElement() {
        return this.document.querySelector<HTMLStyleElement>('style#branding');
    }

    private createStyleElement(styles: string) {
        const styleElement: HTMLStyleElement = this.renderer.createElement(
            'style'
        );
        styleElement.id = 'branding';
        styleElement.type = 'text/css';

        const text: Text = this.renderer.createText(styles);

        this.renderer.appendChild(styleElement, text);
        return styleElement;
    }

    private insertStyleElement(element: HTMLStyleElement) {
        this.renderer.appendChild(this.document.head, element);
    }

    private removeStyleElement(element: HTMLStyleElement) {
        this.renderer.removeChild(this.document.head, element);
    }

    private getStyles(primary: MaterialPalette, accent: MaterialPalette) {
        return `
            .mat-toolbar.mat-primary, .mat-flat-button.mat-primary:not([disabled]) {
                background-color: ${primary[500]} !important;
                color: ${primary.contrast[500]} !important;
            }
            .mat-progress-bar-background {
                fill: ${primary[100]} !important;
            }
            .mat-progress-bar-buffer {
                background-color: ${primary[100]} !important;
            }
            .mat-progress-bar-fill::after {
                background-color: ${primary[500]} !important;
            }
            .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
                color: ${primary[500]} !important;
            }
            .mat-form-field.mat-focused .mat-form-field-label {
                color: ${primary[500]} !important;
            }
            .mat-input-element {
                caret-color: ${primary[500]} !important;
            }
            .mat-slide-toggle.mat-primary.mat-checked .mat-slide-toggle-thumb{
                background-color: ${primary[500]} !important;
            }
            .mat-slide-toggle.mat-primary.mat-checked .mat-slide-toggle-bar {
                background-color: ${primary[100]} !important;
            }
            .mat-form-field.mat-focused.mat-primary .mat-select-arrow {
                color: ${primary[500]} !important;
            }
            .mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {
                color: ${primary[500]} !important;
            }
            .mat-primary .mat-pseudo-checkbox-checked, .mat-primary .mat-pseudo-checkbox-indeterminate {
                background: ${primary[500]} !important;
            }
            .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {
                background-color: ${accent[500]} !important;
                color: ${accent.contrast[500]} !important;
            }
            .mat-form-field.mat-focused .mat-form-field-ripple {
                background-color: ${primary[500]} !important;
            }
            .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element{
                background-color: ${accent[500]} !important;
            }
            .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .mat-checkbox-checked.mat-accent .mat-checkbox-background {
                background-color: ${accent[500]} !important;
            }
            .mat-tab-group.mat-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary .mat-ink-bar {
                background-color: ${primary[500]} !important;
            }
            .ngez-file-dropzone.active {
                border: 1px solid ${primary[500]} !important;
            }
            .mat-flat-button.mat-accent:not(:disabled) {
                background-color: ${accent[500]} !important;
                color: ${accent.contrast[500]} !important;
            }
        `;
    }
}
