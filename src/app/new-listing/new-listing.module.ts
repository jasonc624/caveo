import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewListingComponent } from "./new-listing.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NewListingComponent],
  exports: [NewListingComponent]
})
export class NewListingModule { }
