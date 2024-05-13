import { LightningElement ,api} from 'lwc';

export default class ChildComponent extends LightningElement {

    @api fName 
    @api lName
    displayFullName;

    handleClick(){
        this.displayFullName = this.fName.toUpperCase() + " " + this.lName.toUpperCase();
        let e = new CustomEvent('messagetoparent',
        {detail : this.displayFullName});
        this.dispatchEvent(e);
    }
    

}