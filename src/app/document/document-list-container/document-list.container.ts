import { Component } from '@angular/core';

@Component({
  selector: 'cmp-document-list-container',
  templateUrl: './document-list.container.html'
})
export class DocumentListContainer {
  constructor() {}

  patchDocument(documentDetails:Document)
  {
    if(documentDetails.id)
    {
      this.documentService.editData(documentDetails,documentDetails.id).subscribe(()=>
      {
        this.documentDetails$=this.documentService.getAllData()
      })
    }
    else
    {
      this.documentService.addData(documentDetails).subscribe(()=>
      {
        this.documentDetails$=this.documentService.getAllData()
      })
    }
}
