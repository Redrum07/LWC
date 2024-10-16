import { LightningElement , wire} from 'lwc';
import {
    subscribe,
    unsubscribe,
    MessageContext,
} from 'lightning/messageService';
import movieSelected from '@salesforce/messageChannel/movieDetails__c';

export default class MovieDetails extends LightningElement {

    movieID;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){

        if(!this.subsciption){
            this.subscription = subscribe(
                this.messageContext,
                movieSelected,
                (message) => this.handleMessage(message),
            
            )
        }
    }

    disconnectedCallback(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.movieID = message.movieId;
        this.getSelectedMovieDetails();
    }


    async getSelectedMovieDetails(){
        const url = `http://www.omdbapi.com/?i=${this.movieID}&plot=full&apikey=776741e`;
        const result = await fetch(url);
        const data = await result.json();
        
        console.log('data' , data);
    
      }
}