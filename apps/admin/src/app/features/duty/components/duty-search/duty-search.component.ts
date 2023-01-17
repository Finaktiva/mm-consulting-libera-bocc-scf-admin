import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NUMBER_REGEX, ONLY_NUMBER_REGEX } from '@libera/constants';
import { FormBase } from '@mediomelon/ng-core';
import * as moment from 'moment';
import { catchError, tap } from 'rxjs/operators';
import { DutyStoreService } from '@libera/state'
import { MatButton, MatInput } from '@angular/material';
import { DutyNumberTest } from '@libera/models/duty';
import { of } from 'rxjs';

@Component({
    selector: 'duty-search',
    templateUrl: './duty-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DutySearchComponent extends FormBase{

    @Output() duty = new EventEmitter();

    @ViewChild(MatInput, { static: false }) input: MatInput;

    @ViewChild(MatButton, { static: false }) buttonC: MatButton;

    today = moment().format('DD/MM/YYYY');

    showNotFound: boolean;

    showInvalidProduct: boolean;

    showErrorConnection: boolean;

    searchedValue: string = '';

    searching: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private dutyStoreService: DutyStoreService,
    ) {
        super();

        this.form = formBuilder.group({
            dutyNumber: [
                '',
                [
                    Validators.required,
                    Validators.pattern(NUMBER_REGEX),
                    Validators.maxLength(11)
                ],
            ],
            consultationDate: [
                { value: this.today, disabled: true},
                [
                    Validators.required,
                ],
            ],
        });
    }


    ngOnInit(): void {

        this.form.get('dutyNumber').valueChanges.pipe(
            tap(value => {
                if (value && !value.match(NUMBER_REGEX)) {
                    value = value.match(ONLY_NUMBER_REGEX);
                    this.form.get('dutyNumber').patchValue(value, { emitEvent: false });
                }
                this.searchedValue = value;
            })
        ).subscribe();
    }

    search() {
        const field = this.form.get('dutyNumber');
        const value = field.value;
        field.setErrors(null);
        this.showInvalidProduct = false;
        this.showNotFound = false;
        this.showErrorConnection = false;
        if(value){
            this.searching = true;
            this.dutyStoreService.getByDutyNumber(value)
                .pipe(
                    catchError( err => {
                        return of(err)
                    })
                )
                .subscribe( response => {
                    if(response && response.dutyNumber){
                            this.duty.emit(response);
                    }else if(response && response.error && response.error.code){
                        this.clean();
                        const code = response.error.code;
                        switch (code) {
                            case 'SCF.LIBERA.383':
                                this.showInvalidProduct = true;
                                field.setErrors( { error: true });
                                break;
                        
                            case 'SCF.LIBERA.384':
                                this.showNotFound = true;
                                field.setErrors( { error: true });
                                break;
                        }
                    }else{
                        this.clean();
                        this.showErrorConnection = true;
                        field.setErrors( { error: true });
                    }
                    this.searching = false;
                    this.input.focus();
                    field.markAsTouched();
                    this.buttonC.focus();
                });
        }else{
            this.duty.emit(null);
            field.setErrors({ required: true});
        }
    }

    clean(){
        this.form.get('dutyNumber').patchValue(null, { emitEvent: false });
        this.duty.emit(null);
        this.form.markAsUntouched();
    }
}
