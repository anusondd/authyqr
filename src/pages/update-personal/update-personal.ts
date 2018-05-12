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
import { storage ,initializeApp } from 'firebase';
import { LoadingServiceProvider } from '../../providers/loading-service/loading-service';

@IonicPage()
@Component({
  selector: 'page-update-personal',
  templateUrl: 'update-personal.html',
})
export class UpdatePersonalPage {
  
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
    private ApprovePersonalService:ApprovePersonalServiceProvider,
    public loading:LoadingServiceProvider
  ) {
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

    let uid = localStorage.getItem('UID');
    this.PersonalService.getPersonal(uid).subscribe(person=>{
      console.log(person);
      this.personal = person;
      this.pictureProfile = this.personal.pictureProfile;
      this.picturePersonalCard = this.personal.picturePersonalCard;
      
    })

    this.personalFrom = this.formBuilder.group({
      titleName:[this.personal.titleName,Validators.compose([Validators.required])],
      firstName:[this.personal.firstName,Validators.compose([
          Validators.required,  
          Validators.maxLength(255)
        ])
      ],
      lastName:[this.personal.lastName,Validators.compose([
        Validators.required,  
        Validators.maxLength(255)
        ])
      ],
      birthday:[this.personal.birthday,Validators.compose([Validators.required])],
      metier:[this.personal.metier,Validators.compose([
        Validators.required,  
        Validators.maxLength(255)
        ])
      ],
      address:[this.personal.address,Validators.compose([
        Validators.required,  
        Validators.maxLength(255)
        ])
      ],
      personalNumber:[this.personal.personalNumber,Validators.compose([
        Validators.required,
        Validators.maxLength(13),  
        Validators.maxLength(13)
      ])
    ],
    pictureProfile:[this.personal.pictureProfile,Validators.compose([Validators.required])],
    picturePersonalCard:[this.personal.picturePersonalCard,Validators.compose([Validators.required])],
    check:['pass',Validators.compose([Validators.required])],
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePersonalPage');
  }

  checkPersonalNumber(){

    let personalNumber =  this.personalFrom.controls['personalNumber'].value;
    console.log(personalNumber);
    
    this.PersonalService.searchPersonalNumber(personalNumber).subscribe(person=>{
      if(person.length>0){
        console.log('person',person);
        this.personalFrom.controls['check'].setValue('');
        this.message = 'This PersonalNumber is already used.';
      }else{
        console.log('person = 0',person);
        this.personalFrom.controls['check'].setValue('pass');
        this.message = '';
      } 
    })
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

  updatePersonal(personalFrom:FormGroup){
      let uid = localStorage.getItem('UID');
      this.personal =  personalFrom.value;
      console.log(this.personal);
      this.PersonalService.updatePersonal(uid,this.personal).then(result=>{
        console.log('sucess'+result);
        this.Tost.presentToast('sucess'+result);
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
        this.loading.presentLoading(2000,'Update Data Sucess...');
      }).catch(error=>{
          console.log('err'+error);
          this.Tost.presentToast('err'+error);  
          this.loading.presentLoading(2000,'Update Data Error...');        
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
