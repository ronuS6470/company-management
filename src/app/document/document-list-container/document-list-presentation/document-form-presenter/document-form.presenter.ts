import { Injectable } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class DocumentFormPresenter {

    public documentForm:FormGroup;
    
  constructor(private fb:FormBuilder){}

  /**
   * Creates a new Employee Form
   */
  public createEmployeeForm():FormGroup
  {
    return this.documentForm=this.fb.group({
    documentName:['',[Validators.required,Validators.minLength(4)]],
    documentOwner:['',[Validators.required]],
    activity:['',[Validators.required]],
    })
  }
}