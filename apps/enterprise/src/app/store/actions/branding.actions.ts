import { Branding, UpdateLogoOrFaviconPayload, UpdateThemePayload } from '@libera/models/branding';
import { Action } from '@ngrx/store';

export enum BrandingActionTypes {
    FetchBranding = '[Branding] Fetch Branding',
    GetBranding = '[Branding] Get Branding',
    GetBrandingSuccess = '[Branding] Get Branding Success',
    GetBrandingError = '[Branding] Get Branding Error',
    UpdateTheme = '[Branding] Update Theme',
    UpdateThemeSuccess = '[Branding] Update Theme Success',
    UpdateThemeError = '[Branding] Update Theme Error',
    UpdateLogo = '[Branding] Update Logo',
    UpdateLogoSuccess = '[Branding] Update Logo Success',
    UpdateLogoError = '[Branding] Update Logo Error',
    UpdateFavicon = '[Branding] Update Favicon',
    UpdateFaviconSuccess = '[Branding] Update Favicon Success',
    UpdateFaviconError = '[Branding] Update Favicon Error',
    DeleteBranding = '[Branding] Delete Branding',
    DeleteBrandingSuccess = '[Branding] Delete Branding Success',
    DeleteBrandingError = '[Branding] Delete Branding Error',
}

export class FetchBranding implements Action {
    readonly type = BrandingActionTypes.FetchBranding;
}

export class GetBranding implements Action {
    readonly type = BrandingActionTypes.GetBranding;
}

export class GetBrandingSuccess implements Action {
    readonly type = BrandingActionTypes.GetBrandingSuccess;

    constructor(public payload: Branding) {}
}

export class GetBrandingError implements Action {
    readonly type = BrandingActionTypes.GetBrandingError;

    constructor(public payload: any) {}
}

export class UpdateTheme implements Action {
    readonly type = BrandingActionTypes.UpdateTheme;

    constructor(public payload: UpdateThemePayload) {}
}

export class UpdateThemeSuccess implements Action {
    readonly type = BrandingActionTypes.UpdateThemeSuccess;

    constructor(public payload: UpdateThemePayload) {}
}

export class UpdateThemeError implements Action {
    readonly type = BrandingActionTypes.UpdateThemeError;

    constructor(public payload: any) {}
}

export class UpdateLogo implements Action {
    readonly type = BrandingActionTypes.UpdateLogo;

    constructor(public payload: File) {}
}

export class UpdateLogoSuccess implements Action {
    readonly type = BrandingActionTypes.UpdateLogoSuccess;

    constructor(public payload: UpdateLogoOrFaviconPayload) {}
}

export class UpdateLogoError implements Action {
    readonly type = BrandingActionTypes.UpdateLogoError;

    constructor(public payload: any) {}
}

export class UpdateFavicon implements Action {
    readonly type = BrandingActionTypes.UpdateFavicon;

    constructor(public payload: File) {}
}

export class UpdateFaviconSuccess implements Action {
    readonly type = BrandingActionTypes.UpdateFaviconSuccess;

    constructor(public payload: UpdateLogoOrFaviconPayload) {}
}

export class UpdateFaviconError implements Action {
    readonly type = BrandingActionTypes.UpdateFaviconError;

    constructor(public payload: any) {}
}

export class DeleteBranding implements Action {
    readonly type = BrandingActionTypes.DeleteBranding;
}

export class DeleteBrandingSuccess implements Action {
    readonly type = BrandingActionTypes.DeleteBrandingSuccess;
}

export class DeleteBrandingError implements Action {
    readonly type = BrandingActionTypes.DeleteBrandingError;

    constructor(public payload: any) {}
}

export type ActionTypesUnion =
    | UpdateTheme
    | UpdateThemeSuccess
    | UpdateThemeError
    | UpdateLogo
    | UpdateLogoSuccess
    | UpdateLogoError
    | UpdateFavicon
    | UpdateFaviconSuccess
    | UpdateFaviconError
    | DeleteBranding
    | DeleteBrandingSuccess
    | DeleteBrandingError
    | GetBranding
    | GetBrandingSuccess
    | GetBrandingError;
