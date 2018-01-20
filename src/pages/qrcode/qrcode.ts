import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {

  option : BarcodeScannerOptions;
  results: {};
  qrcodeId: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private afAuth: AngularFireAuth,
    private PersonalService:PersonalServiceProvider,
    public Tost:TostServiceProvider,
    public app:App,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  async scan(){
    
    this.option = {
      prompt: 'Scan barcode'
    }
    //this.results = await 
    await this.barcodeScanner.scan(this.option).then(res=>{
      this.results  = res;
      this.qrcodeId = res.text;
      this.Tost.presentToast(this.qrcodeId.toString());
     
    });
    
    console.log(this.results);
  }

  async endCode(){
    let id = localStorage.getItem('UID');
    console.log(id);
    const results = await this.barcodeScanner.encode(
      this.barcodeScanner.Encode.TEXT_TYPE,id
    );
  }

}
