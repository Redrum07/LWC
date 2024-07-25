import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {

fname = '';
lname = '';

changeHandler(event){
    let {label , value } = event.target;
    if(label === 'First Name') {this.fname = value;}
    else if(label === 'Last Name'){this.lname = value;}
}

handleMessage(e){
    if (e.detail === this.fname.toUpperCase + ' ' + this.lname.toUpperCase){
        this.fname='';
        this.lname= '';
    }
}

}