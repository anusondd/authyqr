import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { VerifyPhonenumberServiceProvider } from '../../providers/verify-phonenumber-service/verify-phonenumber-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { Personal } from '../../models/Presonal';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { VerifyPhonenumber } from '../../models/verify-Phone';

@IonicPage()
@Component({
  selector: 'page-verify-phonenumber',
  templateUrl: 'verify-phonenumber.html',
})
export class VerifyPhonenumberPage {
  phoneNumber:FormGroup;
  code='';
  id='';
  personal:Personal;
  number:string;
  
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private VerifyPhonenumber:VerifyPhonenumberServiceProvider,
    public alertCtrl: AlertController,
    private Auth:AngularFireAuth,
    private PersonalService:PersonalServiceProvider,
    public Tost:TostServiceProvider,
    public app:App
  ) {
    
    this.phoneNumber = this.formBuilder.group({
      number:['',Validators.compose([
          Validators.required, 
          Validators.minLength(10), 
          Validators.maxLength(10)
        ])
      ]
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPhonenumberPage');
        
  }

  sendOTP(phoneNumber:FormGroup){
    let Numberp = phoneNumber.value;
    let sub = Numberp.number;
    this.number = Numberp.number;
    let str = sub.substring(1, 10);
    //console.log(str)
    this.VerifyPhonenumber.verify('66'+str).then(result=>{
      const verifyPhonenumber:any = result;
      console.log(result)
      console.log(verifyPhonenumber.request_id)
      sessionStorage.setItem('request_id',verifyPhonenumber.request_id);
      if(verifyPhonenumber.status=="0"){
        this.promptAlerts();
      }else{
        this.Tost.presentToast(verifyPhonenumber.error_text);
      }
    })
    
    
    
  }

  promptAlerts(){
      let prompt = this.alertCtrl.create({
        title: 'Confirmation OTP',
        message: "Please enter the 4 digit  OTP code Valid for 5 minutes",
        inputs: [
          {
            name: 'OTP',
            placeholder: '0000'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: data => {
              let request_id = sessionStorage.getItem('request_id');
              console.log('Saved clicked',data.OTP);
              this.VerifyPhonenumber.check(request_id,data.OTP).then(result=>{
                console.log('resultOTP',result);
                const verifyPhonenumber:any = result;
                if(verifyPhonenumber.status=="0"){ 
                  console.log('OK');
                  this.Auth.authState.subscribe(user=>{
                      this.personal = new Personal('','','','','','','',this.number,'','');
                      this.PersonalService.updatePersonal(user.uid,this.personal).then(res=>{
                        this.Tost.presentToast('VerifyPhonenumber Success');
                        this.navCtrl.push('AddPersonalPage');
                      }).catch(error=>{
                        this.Tost.presentToast(error);
                        this.navCtrl.push('VerifyPhonenumberPage');
                      })
                  })                
                }else{
                  this.promptAlerts();
                }
              })
            }
          }
        ]
      });
      prompt.present();

  }

  logOut(){
    this.Auth.auth.signOut().then(result=>{
        console.log('pass',result);
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
              root.popToRoot();
        
    }).catch(error=>{
      console.log('error',error);
    })
   
  }

}
