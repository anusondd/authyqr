import { Tansection } from "./tansection";

export class Blockchain{    
    block_number:string;
    privateKey:string;
    time_stamp:string;
    tansection:Tansection[];

    constructor(
        block_number:string,
        privateKey:string,        
        time_stamp:string,
        tansection:Tansection[]
    ){
        
        this.block_number   = block_number;
        this.privateKey = privateKey;
        this.time_stamp = time_stamp;
        this.tansection = tansection;

    }
}