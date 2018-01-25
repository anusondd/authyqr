import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ApprovePersonalServiceProvider } from '../../providers/approve-personal-service/approve-personal-service';
import { Personal } from '../../models/Presonal';
import { ApprovePersonal } from '../../models/Approve-presonal';
import { Tansection } from '../../models/tansection';


@IonicPage()
@Component({
  selector: 'page-view-tansection',
  templateUrl: 'view-tansection.html',
})
export class ViewTansectionPage {
  personal:Personal;
  tansection:Tansection;

  pictureProfile:string='';
  picturePersonalCard:string='';
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private Auth:AngularFireAuth,
    private PersonalService:PersonalServiceProvider,
    public Tost:TostServiceProvider,
    public app:App,
    public camera: Camera,
    private ApprovePersonalService:ApprovePersonalServiceProvider
  ) {
    this.tansection = this.navParams.get("tansec");
    console.log(this.tansection.uid_approve);
    this.personal  = this.tansection.personal_approve;
    this.pictureProfile = this.personal.pictureProfile;
    this.picturePersonalCard = this.personal.picturePersonalCard;
      

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTansectionPage');
  }

}
