/**
 * Author : Bhargav Baleja
 */

import { Injectable } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class DocumentFormPresenter {
  
  //Contains fields of document in form 
    public documentForm:FormGroup;
    
  constructor(private fb:FormBuilder){}

  /**
   * Creates a new Employee Form
   */
  public createEmployeeForm():FormGroup
  {
    return this.documentForm=this.fb.group({
    documentName:['',[Validators.required,Validators.minLength(4)]],
    ownerName:['',[Validators.required]],
    activity:['',[Validators.required]],
    })
  }
}