import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentListContainer } from './document-list-container/document-list.container';
import { DocumentFilterPresentation } from './document-list-container/document-list-presentation/document-filter-presentation/document-filter.presentation';


const routes: Routes = [
  {
    path: 'list',
    component: DocumentListContainer
  },
  {
    path: 'filter',
    component: DocumentFilterPresentation
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
