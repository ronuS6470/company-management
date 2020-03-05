import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modified'
})
export class ModifiedPipe implements PipeTransform {

  transform(createdDate:Date,modifiedDate:Date): void {
    
    console.log(createdDate,modifiedDate);
    
    // return `${createdDate.getTime()-modifiedDate.getTime()}`
  }

}
