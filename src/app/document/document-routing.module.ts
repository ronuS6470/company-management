import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentListContainer } from './document-list-container/document-list.container';


const routes: Routes = [
  {
    path: 'list',
    component: DocumentListContainer
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
