import { LightningElement,  api} from 'lwc';

export default class MovieTiles extends LightningElement {

    @api movie;
    @api selectedId;
    clickHandler(event){
        this.dispatchEvent( new CustomEvent( click,
            {
                detail : this.movie.imdbID
            }
        ))
    }

    get highLight(){

        return this.imddID === this.selectedId ? 'tileSelected' : 'tile';
    
        }
    
}