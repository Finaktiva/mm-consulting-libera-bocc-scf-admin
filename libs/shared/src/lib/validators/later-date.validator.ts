import { AbstractControl, ValidatorFn } from '@angular/forms';


export const isValidDate = (valor: AbstractControl) => {
    if(valor.value != null){
        const date = new Date(valor.value)
        const hoy = new Date(Date.now());
        if(date > hoy){
            return {
                isValideDate: true
            }
        }
    }
    return null
}
