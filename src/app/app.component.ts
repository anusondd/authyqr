import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { FCM } from '@ionic-native/fcm';
import { PersonalServiceProvider } from '../providers/personal-service/personal-service';
import { LoadingServiceProvider } from '../providers/loading-service/loading-service';
import { NotificationProvider } from '../providers/notification/notification';

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
    private notification:NotificationProvider
  ) {
     
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.checkUser();
    });
    this.loading.presentLoading(2000);
    let To = "anusonddgmailcom";
    this.notification.sendNotificetionTo(To,'Hi','hello').then(res=>{
      console.log(res);      
    }).catch(e=>{
      console.log(e);      
    });
  }

  firebaseNotificetion(email){
    //let uid = localStorage.getItem('UID');
    this.fcm.subscribeToTopic(email).then(res=>{
      this.tost('Topic :'+res);
    }).catch(e=>{
      this.tost('Error :'+e);
    });
    this.fcm.onNotification().subscribe(data=>{
        if(data.wasTapped){
          this.showToastWithCloseButton('Notification foreground :'+data.wasTapped);
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
          this.showToastWithCloseButton('Notification foreground : Fail'+data.wasTapped);
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

  showToastWithCloseButton(messages) {
      const toast = this.toastCtrl.create({
        message: messages,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
  }

  // async getToken(){
  //   let uid = localStorage.getItem('UID');
  //   await this.fcm.getToken().then(token=>{
  //     this.PersonalService.updateToken(uid,token).then(res=>{
  //       console.log(res);               
  //     })
  //     this.firebaseNotificetion(token); 
  //     localStorage.setItem('TOKEN',token);
  //   })
    
  // }

  async checkUser(){

    this.Auth.authState.subscribe(user=>{
        if(!user){
          this.rootPage = 'LoginPage';
        }else{
          this.rootPage = 'HomePage';
          localStorage.setItem('UID',user.uid);
          if (this.platform.is('android')) {
            //this.getToken();
            let topic = user.email.replace('@','').replace('.','');
            this.firebaseNotificetion(topic); 
            this.showToastWithCloseButton(topic);
            console.log('I am an android device!');
          }          
          
        }
    });

  }


}

