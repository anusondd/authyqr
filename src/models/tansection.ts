import { Personal } from "./Presonal";

export class Tansection {
    $key:string;
    block_ID:string;
    time_stamp:string;
    uid_request:string;
    personal_request:Personal;
    uid_approve:string;
    personal_approve:Personal;
    status_tansection:string;
    constructor(
        block_ID:string,
        time_stamp:string,
        uid_request:string,
        personal_request:Personal,
        uid_approve:string,
        personal_approve:Personal,
        status_tansection:string
    ){
        this.block_ID           = block_ID;
        this.time_stamp         = time_stamp;
        this.uid_request        = uid_request;
        this.personal_request   = personal_request;
        this.uid_approve        = uid_approve;
        this.personal_approve   = personal_approve;
        this.status_tansection  = status_tansection;

    }


}