import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"
import { Bank } from '../../../../models/catalog';



export function bankValid(val: Bank[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value != null && control.value != '') {
            const isValid = val.find(bank => bank.businessName.toLowerCase() == control.value.toLowerCase())
            if (!isValid) {
                return {
                    bankVal: true
                }
            }
        }
        return null
    }
}