import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database-deprecated';
import { Personal } from '../../models/Presonal';


@Injectable()
export class PersonalServiceProvider {

  
  personal: FirebaseObjectObservable<Personal> = null;
  constructor(
    public http: HttpClient,
    private Database:AngularFireDatabase
  ) {
    console.log('Hello PersonalServiceProvider Provider');
    
  }

  persoanal = this.Database.object('/personal');

  addPersonal(persoanal:Personal){
    
  }

  getPersonal(key:string):FirebaseObjectObservable<Personal>{      
      return this.Database.object('personal/'+key);
  }

  updatePersonal(key:string,personal:Personal){
    return this.Database.object('personal/'+key).update(personal);
  }
}
