import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams } from 'ionic-angular';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { TansectionServiceProvider } from '../../providers/tansection-service/tansection-service';
import { Tansection } from '../../models/tansection';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';

/**
 * Generated class for the TansectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tansections',
  templateUrl: 'tansections.html',
})
export class TansectionsPage {

  friends: string = "add";
  tansection:Tansection;
  tansectionsRequest:Tansection[];
  tansectionsApprove:Tansection[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App,
    private Auth:AngularFireAuth,
    public Tost:TostServiceProvider,
    private tansectionService:TansectionServiceProvider,
    private PersonalService:PersonalServiceProvider
  ) {
    let uid = localStorage.getItem('UID');
    console.log('uid',uid);
    
    if(uid){
      this.tansectionService.getListTansectionRequest(uid).subscribe(tansec=>{
        console.log('tansecRequest',tansec);
        this.tansectionsRequest = tansec;      
      });
          
      this.tansectionService.getListTansectionApprove(uid).subscribe(tansec=>{
          console.log('tansecApprove',tansec);
          this.tansectionsApprove = tansec;
      });
    }
    
    
  }

  approveTansection(tansection:Tansection){
    //console.log(tansection);
    let time_stamp = new Date().toTimeString();
    
    this.tansection = new Tansection(
      0,
      time_stamp,
      tansection.uid_request,
      tansection.personal_request,
      tansection.uid_approve,
      tansection.personal_approve,
      'Allowed'
    );
    console.log(this.tansection);
    
    //Wait, Allowed, Disallow
    //this.tansectionService.updateTansection(tansection.key,)
  }

  rejectTansection(tansection:Tansection){
    console.log('get',tansection);
    //console.log('get',tansection.$key);
    this.tansection = new Tansection(
      0,
      '',
      tansection.uid_request,
      tansection.personal_request,
      tansection.uid_approve,
      tansection.personal_approve,
      'Disallow'
    );
    console.log(this.tansection);
    this.tansectionService.rejectTansection(tansection.$key,this.tansection).then(result=>{
      this.Tost.presentToast('Sucess :'+result);
    }).catch(error=>{
      this.Tost.presentToast('Error :'+error);
    });
  }

  viewTansection(tansection:Tansection){
    console.log(tansection);    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TansectionsPage');
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
