import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertySearchComponent } from './property-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PropertySearchComponent],
  exports: [PropertySearchComponent]
})
export class PropertySearchModule { }
