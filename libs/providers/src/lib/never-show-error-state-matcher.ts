import { ErrorStateMatcher } from '@angular/material/core';

export class NeverShowErrorStateMatcher implements ErrorStateMatcher {
    isErrorState() {
        return false;
    }
}
