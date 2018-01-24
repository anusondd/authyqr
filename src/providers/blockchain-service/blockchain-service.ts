import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ScalarQuery, FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Blockchain } from '../../models/blockchain';
import { Tansection } from '../../models/tansection';

@Injectable()
export class BlockchainServiceProvider {


  opts: FirebaseListFactoryOpts;
  constructor(
    public http: HttpClient,
    private Database:AngularFireDatabase
  ){
    console.log('Hello BlockchainServiceProvider Provider');
  }

  generateBlock(blockchain:Blockchain){
    return this.Database.object('blockchain/node_1/'+blockchain.block_number).set(blockchain);
  }

  getlastBlock():FirebaseListObservable<Blockchain[]>{    
    return this.Database.list('blockchain/node_1/');
  }

  commitTansection(number_block:string,tansection:Tansection){
    return this.Database.list('blockchain/node_1/'+number_block+'/'+'tansection').push(tansection);
  }

}
