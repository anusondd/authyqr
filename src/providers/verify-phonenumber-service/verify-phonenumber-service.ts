import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerifyPhonenumber } from '../../models/verify-Phone';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VerifyPhonenumberServiceProvider {

  apiKey    = 'af6269c4';
  apiSecret = '071c66570685a8ca';
  verifyPhonenumber:VerifyPhonenumber;

  constructor(public http: HttpClient) {
    console.log('Hello VerifyPhonenumberServiceProvider Provider');
  }

  verify(phoneNumber:string){
    const massage     = "Your OTP";
    console.log('phoneNumber',phoneNumber);
    return this.http.post('/verify/json',{
                                          api_key:this.apiKey,
                                          api_secret:this.apiSecret,
                                          number:phoneNumber,
                                          brand:massage
                                        }  
                          );
  }

  check(id:string,otp:string){
    return this.http.post('/verify/check/json',{
                                                api_key:this.apiKey,
                                                api_secret:this.apiSecret,
                                                request_id:id,
                                                code:otp
                                              }
                          );

  }

}
