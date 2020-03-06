/**
 * @Author : Bhargav Baleja
 */

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    documentName:['',[Validators.required]],
    ownerName:['',[Validators.required,Validators.pattern("[A-Za-z]+[' ]*[A-Za-z]+")]],
    activity:['',[Validators.required]],
    id:['']
    })
  }
}