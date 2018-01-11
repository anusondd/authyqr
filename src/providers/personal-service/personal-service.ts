import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  AngularFireDatabase } from 'angularfire2/database';
import { Personal } from '../../models/Presonal';


@Injectable()
export class PersonalServiceProvider {

  

  constructor(
    public http: HttpClient,
    private Database:AngularFireDatabase
  ) {
    console.log('Hello PersonalServiceProvider Provider');
    
  }

  persoanal = this.Database.list('Personal');

  addPersonal(persoanal:Personal){
    
  }
}
