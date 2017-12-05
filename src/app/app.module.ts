import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {SplashComponent} from './splash/splash.component';
import {LayoutModule} from './layout/layout.module';
import {environment} from '../environments/environment';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireAuthModule} from 'angularfire2/auth';

import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {ListingsComponent} from './listings/listings.component';
import {LoginComponent} from './login/login.component';
import {ListingNotFoundComponent} from './listings/listing-not-found/listing-not-found.component';
import {ModalService} from './_services/modal.service';
import {LoginModule} from './login/login.module';
import {PropertySearchModule} from './property-search/property-search.module';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import {RegisterModule} from "./register/register.module";
import {AuthService} from "./_services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./_guards/auth.guard";
import {AppRoutingModule} from "./app-routing.module";
import { ProfileComponent } from './profile/profile.component';
import {ImageUploadModule} from "angular2-image-upload";
import {PropertyService} from "./_services/property.service";
import { PropertyLandingComponent } from './property-landing/property-landing.component';




@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HomeComponent,
    ListingsComponent,
    ListingNotFoundComponent,
    SearchComponent,
    ProfileComponent,
    PropertyLandingComponent
  ],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ImageUploadModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    LayoutModule,
    LoginModule,
    RegisterModule,
    PropertySearchModule
  ],
  providers: [ModalService, PropertyService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
