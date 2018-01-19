import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { ApprovePersonalServiceProvider } from '../../providers/approve-personal-service/approve-personal-service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  statusApprove:boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    //private formBuilder: FormBuilder,
    //private VerifyPhonenumber:VerifyPhonenumberServiceProvider,
    public alertCtrl: AlertController,
    private Auth:AngularFireAuth,
    private PersonalService:PersonalServiceProvider,
    public Tost:TostServiceProvider,
    public app:App,
    private ApprovePersonalService:ApprovePersonalServiceProvider
  ) {
    let uid = localStorage.getItem('UID');
    this.PersonalService.getPersonal(uid).subscribe(user=>{
      if(user.phoneNmener==''){
        console.log('toVerifyPhonenumber');
        this.navCtrl.setRoot('VerifyPhonenumberPage');    
        const root = this.app.getRootNav();
          root.popToRoot();
      }else{
        if(user.firstName==''){
            console.log('VerifyPhonenumber Pass');
            this.navCtrl.setRoot('AddPersonalPage');    
            const root = this.app.getRootNav();
              root.popToRoot();
        }else{
            this.ApprovePersonalService.getApprovePersonal(uid).subscribe(approve=>{
                console.log('Approve',approve);
                this.statusApprove = approve.statusApprove;
                if(approve.statusApprove==true){
                  this.navCtrl.setRoot('TabPage');    
                  const root = this.app.getRootNav();
                  root.popToRoot();
                }
                
            })
        }            
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut(){
    this.Auth.auth.signOut().then(result=>{
        console.log('pass',result);
        localStorage.clear();
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
              root.popToRoot();
        
    }).catch(error=>{
      console.log('error',error);
    })
   
  }

}
