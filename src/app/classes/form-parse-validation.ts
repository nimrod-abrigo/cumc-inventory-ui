import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export class FormParseValidation {
    static validateDate(group: FormGroup) {
        const invalid = group.get('start_date').value > group.get('end_date').value;
      
        return invalid ? { 'invalidDate': true } : null;
    }  

    static convertDateJson(date){
        var tmp_date = new Date(date);
        tmp_date.setDate(tmp_date.getDate() + 1);
        return tmp_date.toJSON();
    }
}
