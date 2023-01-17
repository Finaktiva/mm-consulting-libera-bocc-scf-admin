import { async, TestBed } from '@angular/core/testing';

import { AuthenticationStoreModule } from './authentication-store.module';

describe('AuthenticationStoreModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AuthenticationStoreModule],
        }).compileComponents();
    }));

    it('should create', () => {
        expect(AuthenticationStoreModule).toBeDefined();
    });
});
