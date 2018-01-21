import { Personal } from "./Presonal";

export class ApprovePersonal {
    key?:string;
    approver:string;
    statusApprove:boolean;
    Personal:Personal;
    description:string;
    constructor(
        approver:string,
        statusApprove:boolean,
        Personal:Personal,
        description:string
    ){
        this.approver       = approver;
        this.statusApprove  = statusApprove;
        this.description    = description;
        this.Personal       = Personal;
    }
}