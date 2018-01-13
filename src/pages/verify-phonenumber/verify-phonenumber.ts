import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-verify-phonenumber',
  templateUrl: 'verify-phonenumber.html',
})
export class VerifyPhonenumberPage {
  phoneNumber:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder
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
    console.log(Numberp.number)
    
  }

}
