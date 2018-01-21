import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { FirebaseConfig } from './firebae-Config';

import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
//import { AngularFireDatabase } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
//import { AngularFireAuth } from 'angularfire2/auth';
import { TostServiceProvider } from '../providers/tost-service/tost-service';
import { HttpClientModule } from '@angular/common/http';
import { PersonalServiceProvider } from '../providers/personal-service/personal-service';
import { VerifyPhonenumberServiceProvider } from '../providers/verify-phonenumber-service/verify-phonenumber-service';

import { Camera } from '@ionic-native/camera';
import { ApprovePersonalServiceProvider } from '../providers/approve-personal-service/approve-personal-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TansectionServiceProvider } from '../providers/tansection-service/tansection-service';



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TostServiceProvider,
    PersonalServiceProvider,
    VerifyPhonenumberServiceProvider,
    Camera,
    ApprovePersonalServiceProvider,
    BarcodeScanner,
    TansectionServiceProvider
  ]
})
export class AppModule {}
