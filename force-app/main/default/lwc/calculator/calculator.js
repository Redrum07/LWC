import { LightningElement } from 'lwc';

export default class Calculator extends LightningElement {
    input1 = ""
    input2 = ""
    result = 0;
    changeHandler(event){

        let {label, value} = event.target;
        if(label === "Number 1"){
            this.input1 = value;
        }else if (label === "Number 2"){
            this.input2 = value;
        }
    }
    
    calculate(event){
        let label = event.target.label;
        if(label === "+"){
            this.result = parseInt(this.input1) + parseInt(this.input2);
        } else if( label === "-"){
            this.result = parseInt(this.input1) - parseInt(this.input2);
        } else if( label === "*"){
            this.result = parseInt(this.input1) * parseInt(this.input2);
        } else if (label === "/"){
            this.result = parseInt(this.input1)/ parseInt(this.input2);

        }
        
        this.input1 = "";
        this.input2 = "";
        
    }

}