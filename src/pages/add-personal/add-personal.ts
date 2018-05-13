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
import { ApprovePersonalServiceProvider } from '../../providers/approve-personal-service/approve-personal-service';
import { ApprovePersonal } from '../../models/Approve-presonal';

@IonicPage()
@Component({
  selector: 'page-add-personal',
  templateUrl: 'add-personal.html',
})
export class AddPersonalPage {

  personal:Personal;
  approvePersonal:ApprovePersonal;
  personalFrom:FormGroup;

  pictureProfile:string='';
  picturePersonalCard:string='';

  options:CameraOptions;
  message:string;
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

    this.form();
    
  }

  form(){
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
    check:['',Validators.compose([Validators.required])],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonalPage');
    this.form();
    //console.log(this.personalFrom.valid);     
  }

  checkPersonalNumber(){

    let personalNumber =  this.personalFrom.controls['personalNumber'].value;
    console.log(personalNumber);
    if(personalNumber.length == 13){
      this.PersonalService.searchPersonalNumber(personalNumber).subscribe(person=>{
        if(person.length>0){
          console.log('person',person);
          this.personalFrom.controls['check'].setValue('');
          this.message = 'This PersonalNumber is already used.';
          this.Tost.presentToast(this.message);
        }else{
          console.log('person = 0',person);
          this.personalFrom.controls['check'].setValue('pass');
          this.message = '';
          this.Tost.presentToast('This PersonalNumber is Usable.');
        } 
      });
    }else{
      this.personalFrom.controls['check'].setValue('');
      this.Tost.presentToast("Number 13 digits only");
    }
    
    
  }

  async takePictureProfile(){
    //this.loadpictureProfile();
    try {
        let uid = localStorage.getItem('UID');
        const result = await this.camera.getPicture(this.options);
        const image = 'data:image/jpeg;base64,'+result;
        const picture = storage().ref().child('images/personal/'+uid+'.jpg');
        picture.putString(image,'data_url').then(data=>{
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
    let uid = localStorage.getItem('UID');
    let file =  storage().ref().child('images/personal/'+uid+'.jpg');
    await file.getDownloadURL().then(url=>{
      this.pictureProfile = url;
      this.personalFrom.controls['pictureProfile'].setValue(url);
      console.log('Url :',url);
      this.Tost.presentToast('url :'+url);
      
    });
  }

  async takePicturePersonalCard(){
    //this.loadpicturePersonalCard();
    try {
        let uid = localStorage.getItem('UID');
        const result = await this.camera.getPicture(this.options);
        const image = 'data:image/jpeg;base64,'+result;
        const picture = storage().ref().child('images/personal_card/'+uid+'.jpg');
        picture.putString(image,'data_url').then(data=>{          
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
    let uid = localStorage.getItem('UID');
    let file =  storage().ref().child('images/personal_card/'+uid+'.jpg');
    await file.getDownloadURL().then(url=>{
      this.picturePersonalCard = url;
      this.personalFrom.controls['picturePersonalCard'].setValue(url);
      console.log('Url :',url);
      this.Tost.presentToast('url :'+url);
      
    });
  }

  addPersonal(personalFrom:FormGroup){
      let uid = localStorage.getItem('UID');
      this.personal =  personalFrom.value;
      console.log(this.personal);
      this.PersonalService.updatePersonal(uid,this.personal).then(result=>{
        console.log('sucess'+result);
        this.Tost.presentToast('sucess'+result);
        this.PersonalService.getPersonal(uid).subscribe(person=>{
          this.personal = person;
        })
        this.approvePersonal = new ApprovePersonal('',false,this.personal,'Request Approve');
        this.ApprovePersonalService.addApprovePersonal(uid,this.approvePersonal).then(result=>{
          console.log('sucess'+result);
          this.Tost.presentToast('sucess'+result); 
          this.navCtrl.setRoot('HomePage');    
          const root = this.app.getRootNav();
                root.popToRoot();             
        }).catch(error=>{
          console.log('err'+error);
          this.Tost.presentToast('err'+error);          
      })
            
      }).catch(error=>{
          console.log('err'+error);
          this.Tost.presentToast('err'+error);          
      })
      
  }

  logOut(){
    this.Auth.auth.signOut().then(result=>{
        console.log('pass',result);
        localStorage.clear();        
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
              root.popToRoot();
        
    }).catch(error=>{
      console.log('error',error);
    })
   
  }

}
