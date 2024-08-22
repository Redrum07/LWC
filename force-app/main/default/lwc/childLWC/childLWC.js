import { LightningElement ,api } from 'lwc';

export default class ChildLWC extends LightningElement {
    @api name;
    w;
    @api welcome(message){
        this.w = `${message.toUpperCase()}, ${this.name.toUpperCase()}`;

    }
}