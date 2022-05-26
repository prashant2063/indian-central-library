import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/book/add/add.component';
import { ListComponent } from './components/book/list/list.component';
import { ModifyComponent } from './components/book/modify/modify.component';

const routes: Routes = [
  {path: 'books/list', component: ListComponent},
  {path: 'books/modify', component: ModifyComponent},
  {path: 'books/add', component: AddComponent},
  {path: '', redirectTo: '/books/list', pathMatch: "full"},
  {path: "**", redirectTo: "/books/list", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
