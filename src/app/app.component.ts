import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { FCM } from '@ionic-native/fcm';
import { PersonalServiceProvider } from '../providers/personal-service/personal-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:string;
  //rootPage:string="AddPersonalPage";

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    Auth:AngularFireAuth,
    private fcm: FCM,
    public toastCtrl: ToastController,
    private PersonalService:PersonalServiceProvider,
    public loading:LoadingServiceProvider
  ) {
     let subscribe =  Auth.authState.subscribe(user=>{
        if(!user){
          this.rootPage = 'LoginPage';
        }else{
          this.rootPage = 'HomePage';
          localStorage.setItem('UID',user.uid);          
          this.getToken();
        }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.loading.presentLoading(2000);
  }

  firebaseNotificetion(token){
    //let uid = localStorage.getItem('UID');
    this.PersonalService.getPersonal(token).subscribe(peson=>{      
      this.fcm.subscribeToTopic(peson.uid);
    });
    
    this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          this.tost(data.wasTapped);
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
          this.tost(data.wasTapped);
        };
      });
  }

  tost(messages){
    let toast = this.toastCtrl.create({
      message: messages,
      duration: 3000
    });
    toast.present();
  }

  getToken(){
    let uid = localStorage.getItem('UID');
    this.fcm.getToken().then(token=>{
      this.PersonalService.updateToken(uid,token).then(res=>{
        console.log(res);               
      })
      this.firebaseNotificetion(token); 
      localStorage.setItem('TOKEN',token);
    })
  }


}

