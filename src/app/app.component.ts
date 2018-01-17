import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:string="AddPersonalPage";

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    Auth:AngularFireAuth
  ) {
     let subscribe =  Auth.authState.subscribe(user=>{
        if(!user){
          //this.rootPage = 'LoginPage';
        }else{
          //this.rootPage = 'TabPage';
          localStorage.setItem('UID',user.uid);
        }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

