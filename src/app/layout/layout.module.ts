import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { LoginModule } from '../login/login.module';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RegisterModule} from "../register/register.module";
import {FormsModule} from "@angular/forms";
import { NewListingModule } from "../new-listing/new-listing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    RegisterModule,
    NewListingModule,
    NgbModule,
    FormsModule
  ],
  declarations: [NavigationComponent, FooterComponent, ModalComponent],
  exports: [NavigationComponent, FooterComponent, ModalComponent]
})
export class LayoutModule { }
