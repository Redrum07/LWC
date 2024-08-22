import { LightningElement } from 'lwc';

export default class GenerateMessage extends LightningElement {

    firstName = '';
    lastName = '';

    handleChange(event){
        if(event.target.label === 'First Name'){
            this.firstName = event.target.value;
        }else if(event.target.label === 'Last Name'){
            this.lastName = event.target.value;
        }
    }

    handleClick(){

        this.dispatchEvent(new CustomEvent('message',{
            detail : { fullname : `${this.firstName} ${this.lastName}`.toUpperCase()}
        }))
    }

}