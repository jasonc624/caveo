import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SplashComponent} from './splash/splash.component';
import {LayoutModule} from './layout/layout.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {FirebaseService} from './_services/firebase.service';
import {RouterModule, Routes} from '@angular/router';
import {ListingsComponent} from './listings/listings.component';
import {LoginComponent} from './login/login.component';
import {ListingNotFoundComponent} from './listings/listing-not-found/listing-not-found.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'listings', children: [
    {path: ':address', component: ListingsComponent},
    {path: ':address/not-found', component: ListingNotFoundComponent},
  ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    HomeComponent,
    ListingsComponent,
    LoginComponent,
    ListingNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    LayoutModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule { }