import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ScalarQuery, FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Tansection } from '../../models/tansection';


@Injectable()
export class TansectionServiceProvider {


  opts: FirebaseListFactoryOpts;

  constructor(
    public http: HttpClient,
    private Database:AngularFireDatabase
  ){
    console.log('Hello TansectionServiceProvider Provider');
  }

  requestTansection(tansection:Tansection){
    return this.Database.list('/tansection/').push(tansection);
  }

  approveTansection(key:string,tansection:Tansection){
    return this.Database.object('/tansection/'+key).update(tansection);
  }

  rejectTansection(key:string,tansection:Tansection){
    return this.Database.object('/tansection/'+key).update(tansection);
  }

  getTansection(key:string):FirebaseObjectObservable<Tansection>{      
    return this.Database.object('/tansection/'+key);
  }

  getListTansectionRequest(uid_request:string):FirebaseListObservable<Tansection[]>{
    this.opts = {
      query:{
        orderByChild:'uid_request',
        equalTo:uid_request
      }
    };      
    return this.Database.list('/tansection/',this.opts);
  }

  getListTansectionApprove(uid_approve:string):FirebaseListObservable<Tansection[]>{
    this.opts = {
      query:{
        orderByChild:'uid_approve',
        equalTo:uid_approve
      }
    };      
    return this.Database.list('/tansection/',this.opts);
  }

}
