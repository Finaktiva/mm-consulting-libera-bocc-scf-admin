import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ValidateStatusGuard } from './validate-status.guard';

xdescribe('ValidateStatusGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [ValidateStatusGuard],
        });
    });

    it('should ...', inject(
        [ValidateStatusGuard],
        (guard: ValidateStatusGuard) => {
            expect(guard).toBeTruthy();
        }
    ));
});
