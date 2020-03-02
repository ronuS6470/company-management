import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Injectable()
export class DocumentFilterPresenter {

    constructor(
        private fb: FormBuilder
    ) { }

    buildForm(): FormGroup {
        return this.fb.group({
            name: new FormControl(''),
            owner: new FormControl(''),
            activity: new FormControl(''),
            agefrom: new FormControl(''),
            ageto: new FormControl('')
        });
    }
}
