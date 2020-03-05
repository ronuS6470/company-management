import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListContainer } from './company-list-container/company-list.container';
import { CompanyFormContainer } from './company-form-container/company-form.container';
import { CompanyFilterPresentation } from './company-list-container/company-list-presentation/company-filter-presentation/company-filter.presentation';


const routes: Routes = [
  {
    path: 'list',
    component: CompanyListContainer
  },
  {
    path: 'filter',
    component: CompanyFilterPresentation
  },
  {
    path: 'add',
    component: CompanyFormContainer
  },
  {
    path: 'edit/:id',
    component: CompanyFormContainer
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
export class CompanyRoutingModule { }
