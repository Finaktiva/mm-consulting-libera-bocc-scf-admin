import { async, TestBed } from '@angular/core/testing';

import { AppProvidersModule } from './providers.module';

describe('AppProvidersModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppProvidersModule],
        }).compileComponents();
    }));

    it('should create', () => {
        expect(AppProvidersModule).toBeDefined();
    });
});
