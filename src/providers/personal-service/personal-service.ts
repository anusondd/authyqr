import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { Personal } from '../../models/Presonal';
import { ScalarQuery, FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { HttpParams } from '@angular/common/http/src/params';


@Injectable()
export class PersonalServiceProvider { 

  
  opts: FirebaseListFactoryOpts;
  persoanal = this.Database.object('/personal');
  constructor(
    public http: HttpClient,
    private Database:AngularFireDatabase
  ) {
    console.log('Hello PersonalServiceProvider Provider');    
  }

  httpGet(){
    let data = {data:'data'};
    

    // this.http.post('http://ddetabi.com/Home/api',JSON.stringify(data)).subscribe(data=>{
    //   console.log(data);      
    // });

    this.http.get('http://ddetabi.com/Home/api',{params:{'id':'7','username':'anusondd'}}).subscribe(data=>{
      console.log(data);      
    });
  
  
    
  }

  

  searchPhonenumber(number:string):FirebaseListObservable<Personal[]>{
    this.opts = {
      query:{
        orderByChild:'phoneNmener',
        equalTo:number
      }
    };
    return this.Database.list('personal',this.opts);
  }

  searchPersonalNumber(personalNumber:string):FirebaseListObservable<Personal[]>{
    this.opts = {
      query:{
        orderByChild:'personalNumber',
        equalTo:personalNumber
      }
    };
    return this.Database.list('personal',this.opts);
  }

  addPersonal(key:string,persoanal:Personal){
    return this.Database.object('personal/'+key).set(persoanal);
  }

  getPersonal(key:string):FirebaseObjectObservable<Personal>{      
      return this.Database.object('personal/'+key);
  }

  updatePersonal(key:string,personal:Personal){
    return this.Database.object('personal/'+key).update(personal);
  }
}
