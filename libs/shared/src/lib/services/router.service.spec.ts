import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterService } from './router.service';

describe('RouterService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
        })
    );

    it('should be created', () => {
        const service: RouterService = TestBed.get(RouterService);
        expect(service).toBeTruthy();
    });
});
