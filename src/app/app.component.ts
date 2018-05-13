import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { FCM } from '@ionic-native/fcm';
import { PersonalServiceProvider } from '../providers/personal-service/personal-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { NotificationProvider } from '../providers/notification/notification';
import { TostServiceProvider } from '../providers/tost-service/tost-service';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:string;
  //rootPage:string="AddPersonalPage";

  constructor(
    public platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public Auth:AngularFireAuth,
    private fcm: FCM,
    public toastCtrl: ToastController,
    private PersonalService:PersonalServiceProvider,
    public loading:LoadingServiceProvider,
    private notification:NotificationProvider,
    private tostService:TostServiceProvider,
    private backgroundMode: BackgroundMode
  ) {
     
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkUser();
    });
    this.loading.presentLoading(2000,'Please wait...');
    // this.backgroundMode.enable();
    // let To = "anusonddgmailcom";
    // this.notification.sendNotificetionTo(To,'Hi','hello').then(res=>{
    //   console.log(res);      
    // }).catch(e=>{
    //   console.log(e);      
    // });
  }

  firebaseNotificetion(email){
    //let uid = localStorage.getItem('UID');
    this.fcm.subscribeToTopic(email).then(res=>{
      //this.tostService.presentToast('Topic :'+res);
    }).catch(e=>{
      this.tostService.presentToast('Error :'+e);
    });
    this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          //this.tostService.showToastWithCloseButton('Notification foreground :'+data.wasTapped);
          //console.log("Received in background");
        } else {
          //console.log("Received in foreground");
          //this.tostService.showToastWithCloseButton('Notification foreground : Fail'+data.wasTapped);
        };
      });
  }

  async getToken(uid,email){
    let token = email.replace('@','').replace('.','');
    this.PersonalService.updateToken(uid,token).then(res=>{
      console.log(res);               
    })
    
  }

  async checkUser(){

    this.Auth.authState.subscribe(user=>{
        if(!user){
          this.rootPage = 'LoginPage';
        }else{
          this.getToken(user.uid,user.email);
          this.rootPage = 'HomePage';
          localStorage.setItem('UID',user.uid);
          if (this.platform.is('android')) {
            //this.getToken();
            let topic = user.email.replace('@','').replace('.','');
            this.firebaseNotificetion(topic); 
            //this.tostService.showToastWithCloseButton(topic);
            console.log('I am an android device!');
          }          
          
        }
    });

  }


}

