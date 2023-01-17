import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
    LenderQuotaRequest,
    LENDER_QUOTA_REQUEST_RATE,
    LENDER_QUOTA_REQUEST_STATUS,
} from '@libera/models/lender-quota-request';
import {
    clean,
    currencyToNumber,
    parseInputCurrency,
    parseNumber,
} from '@libera/shared';
import { FormBase } from '@mediomelon/ng-core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'lender-quota-request-form',
    templateUrl: './lender-quota-request-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LenderQuotaRequestFormComponent extends FormBase
    implements OnInit {
    @Input() request: LenderQuotaRequest;

    @Output() assign = new EventEmitter();

    @Output() reject = new EventEmitter();

    LENDER_QUOTA_REQUEST_RATE = LENDER_QUOTA_REQUEST_RATE;

    private prevValue: number;

    private subscription: Subscription;

    constructor(private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        const request = this.request;
        const shouldDisable =
            request && request.requestType == 'PAYMENT';

        let quota: any =
            request.status ==
            LENDER_QUOTA_REQUEST_STATUS.PENDING_LENDER_APPROVAL
                ? request.requestedQuota
                : request.grantedQuota;

        const rateType = (request && request.rateType) || null;
        const rate = (request && request.rate) || null;

        this.form = this.formBuilder.group({
            grantedQuota: [
                parseNumber(quota.toString()),
                [Validators.required, Validators.min(1)],
            ],
            rateType: [
                {
                    value: rateType,
                    disabled: shouldDisable,
                },
                Validators.required,
            ],
            rate: [
                {
                    value: rate,
                    disabled: shouldDisable,
                },
                [Validators.required, Validators.min(0)],
            ],
            comments: '',
        });

        this.prevValue = quota;
    }

    onBlur() {
        const control = this.form.get('grantedQuota');
        parseInputCurrency(control);
    }

    getFormValue() {
        const { grantedQuota, ...rest } = this.form.getRawValue();
        return clean({
            grantedQuota: currencyToNumber(grantedQuota),
            ...rest,
        });
    }

    onAssign() {
        if (super.isFormValid()) {
            this.assign.emit(this.getFormValue());
        }
    }

    onReject() {
        this.reject.emit();
    }

    get wasModified() {
        return this.form.value.grantedQuota != this.prevValue;
    }
}
