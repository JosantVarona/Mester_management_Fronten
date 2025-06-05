import { Center } from "./center";

export interface Client{
    id: number;
    cif: String;
    name: string;
    email: string;
    archive: number;
    centers : Center[];
}