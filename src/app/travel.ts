import { Owner } from "./owner";

export class Travel {
    id: string = '';
    destination: string = '';
    price: number = 0;
    date: string = '';
    ownerid: string = '';
    owner: Owner | null = new Owner();
}
