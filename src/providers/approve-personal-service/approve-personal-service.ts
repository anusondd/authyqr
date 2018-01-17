import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ApprovePersonal } from '../../models/Approve-presonal';

@Injectable()
export class ApprovePersonalServiceProvider {

  approvePersonal = this.Database.object('/approve_personal');

  constructor(
    public http: HttpClient,
    private Database:AngularFireDatabase
  ) {
    console.log('Hello ApprovePersonalServiceProvider Provider');
  }

  addApprovePersonal(uid:string,persoanal:ApprovePersonal){
    return this.Database.object('/approve_personal/'+uid).set(persoanal);
    
  }

  getApprovePersonal(key:string):FirebaseObjectObservable<ApprovePersonal>{
    return this.Database.object('/approve_personal/'+key);
    
  }



}
