import {AbstractControl} from '@angular/forms';

export const ValidatePercentage = (control: AbstractControl) => {
    if (control.value >= 50 && control.value <= 100) {
      return null ;
    }
    return { validPercentage: true };
};
