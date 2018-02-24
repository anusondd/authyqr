import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { User } from '../../models/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';

/**
 * Generated class for the LoginApproverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-approver',
  templateUrl: 'login-approver.html',
})
export class LoginApproverPage {

  user:User ={
    email:'anusondd@gmail.com',
    password:'21519097'
  };
  message:string;
  personal:{};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private Auth:AngularFireAuth,
    public Tost:TostServiceProvider,
    private Database:AngularFireDatabase,
    private PersonalService:PersonalServiceProvider,
    public app:App
  ) {
    //this.PersonalService.httpGet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginApproverPage');
  }


  Login(user:User){
    this.Auth.auth.signInWithEmailAndPassword(user.email,user.password).then(result=>{
      console.log('pass',result.uid);
      this.PersonalService.getPersonal(result.uid).subscribe(res=>{
        console.log(res.phoneNumber);
        if(res.phoneNumber==''){
          console.log('toVerifyPhonenumber');
          this.navCtrl.setRoot('VerifyPhonenumberPage');    
          const root = this.app.getRootNav();
            root.popToRoot();
        }else{
          if(res.firstName==''){
              console.log('VerifyPhonenumber Pass');
              this.navCtrl.setRoot('AddPersonalPage');    
              const root = this.app.getRootNav();
                root.popToRoot();
          }else{
              console.log('Pass');
              this.navCtrl.setRoot('HomePage');    
              const root = this.app.getRootNav();
                root.popToRoot();
          }            
        }          
      });
    });
}

gotoLoginApprover(){
  this.navCtrl.setRoot('LoginPage');    
          const root = this.app.getRootNav();
            root.popToRoot();

}

}
