export class Personal {
    key?:string;
    titleName:string;
    firstName:string;
    lastName:string;
    birthday:string;
    address:string;
    personalNumber:string;
    metier:string;
    phoneNumber:string;
    pictureProfile:string;
    picturePersonalCard:string;
    uid:string;
    token:string;

    constructor(
        titleName:string,
        firstName:string,
        lastName:string,
        birthday:string,
        address:string,
        personalNumber:string,
        metier:string,
        phoneNumber:string,
        pictureProfile:string,
        picturePersonalCard:string,        
        uid:string,
        token:string
        
    ){
        this.titleName=titleName;
        this.firstName=firstName;
        this.lastName=lastName;
        this.birthday=birthday;
        this.address=address;
        this.personalNumber=personalNumber;
        this.metier=metier;
        this.phoneNumber=phoneNumber;
        this.pictureProfile=pictureProfile;
        this.picturePersonalCard=picturePersonalCard;
        this.uid = uid;
        this.token = token;    
    }
}