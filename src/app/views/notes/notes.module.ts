import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreateComponent } from './create/create.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotesListComponent, CreateComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class NotesModule { }
