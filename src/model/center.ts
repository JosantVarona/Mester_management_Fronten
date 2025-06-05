import { Client } from "./clients";

export interface Center{
    id:number;
    zipCode: string;
    location: string;
    address: string;
    telephone: string;
    client: Client;
    archive: number;
}