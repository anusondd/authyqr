import { ApprovePersonal } from "./Approve-presonal";

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
    }
}