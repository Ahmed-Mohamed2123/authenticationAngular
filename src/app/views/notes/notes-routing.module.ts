import { CreateComponent } from './create/create.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'notesList', component: NotesListComponent },
  { path: 'createList', component: CreateComponent },
  { path: 'edit/:postId', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
