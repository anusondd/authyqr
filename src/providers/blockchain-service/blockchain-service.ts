import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ScalarQuery, FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Blockchain } from '../../models/blockchain';
import { Tansection } from '../../models/tansection';

let max = 2;
@Injectable()
export class BlockchainServiceProvider {


  blockchain:Blockchain;
  Now:number;
  row:Number;
  opts: FirebaseListFactoryOpts;
  constructor(
    public http: HttpClient,
    private Database:AngularFireDatabase
  ){
    console.log('Hello BlockchainServiceProvider Provider');
  }

  
  resetBlock(){
    this.Database.object('blockchain/block_now').set(0);
    this.Database.object('blockchain/node_1/').set(null);
    this.newBlock(0);
  }
  
  blockNow(){
    return this.Database.object('blockchain/block_now');
  }

  commitTansection(number_block:string,tansection:Tansection){
    this.Database.list('blockchain/node_1/'+number_block+'/'+'tansection').push(tansection);
    this.checkBlock();
  }
  

  newBlock(blockNumber){

    let time_stamp = new Date().toTimeString();
    console.log(time_stamp);
    // privateKey = เข้ารหัส base64(Blockchain+เวลา+จำนวนบล๊อคล่าสุด)
    let privateKey = btoa('Blockchain:'+time_stamp+':'+blockNumber);
    console.log('btoa',privateKey);
    //let decode = atob(privateKey);
    //console.log('atob',decode);

    this.blockchain = new Blockchain(blockNumber,privateKey,time_stamp,null);
    console.log(this.blockchain);
    this.Database.object('blockchain/node_1/'+this.blockchain.block_number).set(this.blockchain);

  }

  checkBlock(){
    this.blockNow().subscribe(block=>{
        this.Now = block.$value;  

    });

    this.Database.list('blockchain/node_1/'+this.Now+'/tansection').subscribe(list=>{
      this.row = list.length;
      console.log('BlockList',this.row);    
    });

    if(this.row>max){
      let nextBlock = 1 + this.Now;
      this.Database.object('blockchain/block_now').set(nextBlock);
      this.newBlock(nextBlock);
    }else if(this.row<=max){
      this.Database.object('blockchain/block_now').set(this.Now);
    }

    this.blockNow().subscribe(block=>{
        this.Now = block.$value;
    });

    this.Database.list('blockchain/node_1/'+this.Now+'/tansection').subscribe(list=>{
      this.row = list.length;
      console.log('BlockList',this.row);    
    });

    
  }

}
