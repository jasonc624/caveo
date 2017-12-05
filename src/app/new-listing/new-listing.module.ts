import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewListingComponent } from "./new-listing.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NewListingComponent],
  exports: [NewListingComponent]
})
export class NewListingModule { }
