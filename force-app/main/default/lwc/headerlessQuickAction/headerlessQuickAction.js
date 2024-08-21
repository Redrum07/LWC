import { LightningElement , api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class HeaderlessQuickAction extends NavigationMixin(LightningElement ){

@api invoke(){
    this[NavigationMixin.Navigate]({
        
            type: 'standard__app',
            attributes: {
                appTarget: 'c__LWC_Recipes',
            }
        
    })
}

}