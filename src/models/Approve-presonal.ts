import { Personal } from "./Presonal";
import { Approver } from "./Approver";

export class ApprovePersonal {
    $key:string;
    personal:Personal;
    approver:Approver;
    statusApprove:boolean;
}