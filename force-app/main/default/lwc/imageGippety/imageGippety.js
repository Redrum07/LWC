import { LightningElement } from 'lwc';

export default class ImageGippety extends LightningElement {


    handleClick(){

        let input = (this.template.querySelector('lightning-input')).value;

        if(input == null || input.length ==0){
            return 
        }
    }
    
     

}