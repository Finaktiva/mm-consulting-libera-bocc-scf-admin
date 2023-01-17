import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function departamentValid(val: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value != null && control.value != ''){
            const isValid = val.find(depart => depart.departmentName.toLowerCase() == control.value.toLowerCase())
            if(!isValid){
                return {
                    departamentVal: true
                }
            }
        }
        return null
    }
  }

  export function cityValid(cityList: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if(control.value != null && control.value != ''){
            const isValid = cityList.find(city => city.cityName.toLowerCase() == control.value.toLowerCase())
            if(!isValid){
                return {
                    cityVal: true
                }
            }
        }
        return null
    }
  }