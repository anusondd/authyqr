import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Personal } from '../../models/Presonal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonalServiceProvider } from '../../providers/personal-service/personal-service';
import { TostServiceProvider } from '../../providers/tost-service/tost-service';
import { storage ,initializeApp } from 'firebase';
//import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseConfig } from '../../app/firebae-Config';

@IonicPage()
@Component({
  selector: 'page-add-personal',
  templateUrl: 'add-personal.html',
})
export class AddPersonalPage {

  personal:Personal;
  personalFrom:FormGroup;

  pictureProfile:string='';
  picturePersonalCard:string='';

  options:CameraOptions;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private Auth:AngularFireAuth,
    private PersonalService:PersonalServiceProvider,
    public Tost:TostServiceProvider,
    public app:App,
    public camera: Camera
  ) {
    
    //initializeApp(FirebaseConfig);
    //this.loadpictureProfile();
    this.options  = {
      quality:100,
      targetHeight:300,
      targetWidth:300,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      cameraDirection:1
    };

    this.personalFrom = this.formBuilder.group({
      titleName:['Mr.',Validators.compose([Validators.required])],
      firstName:['Anusorn',Validators.compose([
          Validators.required,  
          Validators.maxLength(255)
        ])
      ],
      lastName:['Duangsri',Validators.compose([
        Validators.required,  
        Validators.maxLength(255)
        ])
      ],
      birthday:[,Validators.compose([Validators.required])],
      metier:['Studen',Validators.compose([
        Validators.required,  
        Validators.maxLength(255)
        ])
      ],
      address:['169/37 Vassiri Village Tambon Lak Hok, Amphoe Mueang Pathum Thani, Chang Wat Pathum Thani 12000',Validators.compose([
        Validators.required,  
        Validators.maxLength(255)
        ])
      ],
      personalNumber:['1471300077128',Validators.compose([
        Validators.required,
        Validators.maxLength(13),  
        Validators.maxLength(13)
      ])
    ],
    pictureProfile:['',Validators.compose([Validators.required])],
    picturePersonalCard:['',Validators.compose([Validators.required])],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonalPage');
  }

  async takePictureProfile(){
    
    //this.personalFrom.controls['picturePersonalCard'].setValue('data');
    try {
        let uid = localStorage.getItem('UID');
        const result = await this.camera.getPicture(this.options);
        const image = 'data:image/jpeg;base64,'+result;
        const picture = storage().ref().child('images/personal/'+'token'+'.jpg');
        picture.putString(image,'data_url').then(data=>{
          this.personalFrom.controls['pictureProfile'].setValue(data.downloadURL);
          this.loadpictureProfile();
          this.Tost.presentToast('up :'+data.state);
        }).catch(e=>{
          this.Tost.presentToast('e :'+e);
        });

    }catch(error){
      this.Tost.presentToast('e :'+error);
    }
    
    

  }

  async loadpictureProfile(){
    let file =  storage().ref().child('images/personal/token.jpg');
    await file.getDownloadURL().then(url=>{
      this.pictureProfile = url;
      console.log('Url :',url);
      this.Tost.presentToast('url :'+url);
      
    });
  }

  async takePicturePersonalCard(){
    
    //this.personalFrom.controls['picturePersonalCard'].setValue('data');
    try {
        let uid = localStorage.getItem('UID');
        const result = await this.camera.getPicture(this.options);
        const image = 'data:image/jpeg;base64,'+result;
        const picture = storage().ref().child('images/personal_card/'+'token'+'.jpg');
        picture.putString(image,'data_url').then(data=>{
          this.personalFrom.controls['picturePersonalCard'].setValue(data.downloadURL);
          this.loadpicturePersonalCard();
          this.Tost.presentToast('up :'+data.state);
        }).catch(e=>{
          this.Tost.presentToast('e :'+e);
        });

    }catch(error){
      this.Tost.presentToast('e :'+error);
    }
    
    

  }

  async loadpicturePersonalCard(){
    let file =  storage().ref().child('images/personal_card/token.jpg');
    await file.getDownloadURL().then(url=>{
      this.picturePersonalCard = url;
      console.log('Url :',url);
      this.Tost.presentToast('url :'+url);
      
    });
  }

  addPersonal(personalFrom:FormGroup){
      this.personal =  personalFrom.value;
      console.log(this.personal);
      
  }

  logOut(){
    this.Auth.auth.signOut().then(result=>{
        console.log('pass',result);
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
              root.popToRoot();
        
    }).catch(error=>{
      console.log('error',error);
    })
   
  }

}
