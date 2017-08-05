import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [NavigationComponent, FooterComponent, ModalComponent],
  exports: [NavigationComponent, FooterComponent, ModalComponent]
})
export class LayoutModule { }
