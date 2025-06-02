import { User } from "./user";

export interface Activity {
    id? : number;
    id_user? : User;
    name: string;
    type: string;
    specifics? : string;
    picture? : string;
    fecha_acti?: string;
    archive? : number;
    state? : String;
}