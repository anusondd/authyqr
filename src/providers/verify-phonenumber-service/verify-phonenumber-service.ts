import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerifyPhonenumber } from '../../models/verify-Phone';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

@Injectable()
export class VerifyPhonenumberServiceProvider {

  partUrl = '';
  apiKey    = 'af6269c4';
  apiSecret = '071c66570685a8ca';
  verifyPhonenumber:Promise<VerifyPhonenumber>;
  

  constructor(
    public http: HttpClient,
    public plt: Platform
  ) {
    console.log('Hello VerifyPhonenumberServiceProvider Provider');
    if(this.plt.is('ios')||this.plt.is('android')){
        this.partUrl = 'https://api.nexmo.com';
    }
  }

  verify(phoneNumber:string){
    const massage     = "Your OTP";
    console.log('phoneNumber',phoneNumber);
    return new Promise((resolve, reject)=>{
      this.http.post(this.partUrl+'/verify/json',
                    {api_key:this.apiKey,api_secret:this.apiSecret,number:phoneNumber,brand:massage}  
                  ).subscribe(res => {
                    resolve(res);
                  }, (err) => {
                    reject(err);
                  });
    }); 
    
    //return this.verifyPhonenumber;
  }

  check(id:string,otp:string){
    return new Promise((resolve, reject)=>{
      this.http.post(this.partUrl+'/verify/check/json',
                          {api_key:this.apiKey,api_secret:this.apiSecret,request_id:id,code:otp}
                          ).subscribe(res => {
                            resolve(res);
                          }, (err) => {
                            reject(err);
                          });
    });
    

  }

}
