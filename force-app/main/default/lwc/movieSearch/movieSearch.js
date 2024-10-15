import { LightningElement, api } from "lwc";
const DELAY = 500;
export default class MovieSearch extends LightningElement {
  selectedOption = "";
  searcKey = "";
  pageNum = "1";
  loading = false;
  timer;
  movieResults = [];
  selectedId = "";
  get options() {
    return [
      { label: "None", value: "" },
      { label: "Movie", value: "movie" },
      { label: "Series", value: "series" },
      { label: "Episode", value: "episode" }
    ];
  }

  handleChange(event) {
    let { name, value } = event.target;
    if (name === "type") {
      this.selectedOption = value;
    }
    else if (name === "page") {
      this.pageNum = value;
      
    }
    else if (name === "search") {
      this.searcKey = value;
      this.loading = true;
    }

    if (this.searcKey !== "") {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getResults();
      }, DELAY);
    }
  }

  async getResults() {
    const url = `http://www.omdbapi.com/?apikey=776741e&s=${this.searcKey}&type=${this.selectedOption}&page=${this.pageNum}`;

    const res = await fetch(url);
    const data = await res.json();

    this.loading = false;
    console.log("data", data);
    if (data.Response === "True") {
      this.movieResults = data.Search;
    }
  }

  get displaySearchResults() {
    return this.movieResults.length > 0;
  }


  handleSelectedItem(event){
    this.selectedId = event.detail;
  }
}
