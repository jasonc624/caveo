import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertySearchComponent } from './property-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [PropertySearchComponent],
  exports: [PropertySearchComponent]
})
export class PropertySearchModule { }
