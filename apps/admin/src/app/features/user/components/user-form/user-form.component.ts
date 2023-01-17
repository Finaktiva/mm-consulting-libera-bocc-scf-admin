import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User, UserRole } from '@libera/models/user';
import { alphaWithSpaceValidator, FormBase } from '@mediomelon/ng-core';
import { whitespaceValidator } from '@libera/shared';
import { UserRoleQuery, UserRolesService } from '@libera/state';
import { Observable, of } from 'rxjs';
import { EMAIL_REGEX } from '@libera/constants';
import { UserStoreService } from '../../state/user.store.service';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent extends FormBase implements OnInit {
    @Input() user: User;
    userRoles: UserRole[];
    isLoading$: Observable<boolean> = this.query.selectLoading()
    checkingEmail = of(false);

    constructor(
            formBuilder: FormBuilder, 
            private query: UserRoleQuery,
            private userRoleServices: UserRolesService,
            private storeService: UserStoreService,
            private translateService: TranslateService,
            private snackbar: MatSnackBar,
        ) {
        super();

        this.form = formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    alphaWithSpaceValidator,
                    whitespaceValidator,
                ],
            ],
            firstSurname: [
                '',
                [
                    Validators.required,
                    alphaWithSpaceValidator,
                    whitespaceValidator,
                ],
            ],
            secondSurname: [
                null,
                [alphaWithSpaceValidator, whitespaceValidator],
            ],
            email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            roles: [[], Validators.required],
        });
    }

    ngOnInit() {
        this.userRoleServices.fetchAll('LIBERA_USER').subscribe(data => {
            this.userRoles = data;
            if (!this.user) return;
            const payload = {...this.user, roles: this.user.roles[0]}
            this.form.patchValue(payload, {emitEvent: false});
            this.form.get('email').disable({emitEvent: false});
        })

        const emailField = this.form.get('email');
        emailField.valueChanges.pipe(
            debounceTime(1000),
            switchMap(value => {
                if (!emailField.hasError('pattern') && !emailField.hasError('required')) {
                    this.checkingEmail = of(true);
                    this.form.disable({ emitEvent: false });
                    return this.storeService.getByFilter({filter_by: 'EMAIL', q: value })
                }
                return of({total:0, items:[]});
            }),
            tap( response => {
                if(response.total > 10)
                    throw new Error("Too many coincidences");
            }),
            map( response => response.items.filter( user => user.email === emailField.value)),
            catchError(err => {
                this.snackbar.open(
                    this.translateService.instant(
                        'COMMON.ERRORS.CONNECTION'
                    ),
                    'OK'
                );
                return of([1]);
            })
        ).subscribe( users => {
            this.checkingEmail = of(false);
            this.form.enable({ emitEvent: false });
            if(users.length >= 1){
                emailField.setErrors({ registered: true });
            }
        });
    }

    compareWith(o1: { code: string }, o2: { code: string }) {
        return o1 && o2 ? o1.code == o2.code : o1 == o2;
    }
}
