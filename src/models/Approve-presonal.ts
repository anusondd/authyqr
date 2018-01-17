export class ApprovePersonal {
    key?:string;
    approver:string;
    statusApprove:boolean;
    namePersonal:string;
    description:string;
    constructor(
        approver:string,
        statusApprove:boolean,
        namePersonal:string,
        description:string
    ){
        this.approver       = approver;
        this.statusApprove  = statusApprove;
        this.description    = description;
        this.namePersonal   = namePersonal;
    }
}