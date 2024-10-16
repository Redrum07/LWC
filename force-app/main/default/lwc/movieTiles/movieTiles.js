import { LightningElement,  api} from 'lwc';

export default class MovieTiles extends LightningElement {

    @api movie;
    @api selectedId;
    clickHandler(event){
        
        this.dispatchEvent( new CustomEvent( 'selectedmovie',
            {
                detail : this.movie.imdbID
            }
        ))
    }

    get highLight(){

        return this.movie.imdbID === this.selectedId ? 'tileSelected' : 'tile';
    
        }
    
}