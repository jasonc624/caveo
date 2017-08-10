///<reference path="../../node_modules/ng-gapi/lib/GoogleApiService.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SplashComponent} from './splash/splash.component';
import {LayoutModule} from './layout/layout.module';
import {environment} from '../environments/environment';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {FirebaseService} from './_services/firebase.service';
import {RouterModule, Routes} from '@angular/router';
import {ListingsComponent} from './listings/listings.component';
import {LoginComponent} from './login/login.component';
import {ListingNotFoundComponent} from './listings/listing-not-found/listing-not-found.component';
import {ModalService} from './_services/modal.service';
import {LoginModule} from "./login/login.module";
import {ClientConfig, GoogleApiModule, NG_GAPI_CONFIG} from 'ng-gapi';

const gapiClientConfig: ClientConfig = {
  clientId: 'CLIENT_ID',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics'
  ].join(' ')
};

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'landing', component: SplashComponent},
  // {path: 'login', component: LoginComponent},
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
    ListingNotFoundComponent,
  ],
  exports: [LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    FormsModule,
    LayoutModule,
    LoginModule
  ],
  providers: [FirebaseService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
