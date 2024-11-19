import { LightningElement, wire } from "lwc";
import getContactsLimited from "@salesforce/apex/ContactBrowserController.getContactsLimited";

const columns = [
  { label: "Name", fieldName: "Name", type: "Name" },
  {
    label: "Account",
    fieldName: "accountLink",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "accountName"
      }
    }
  },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Email", fieldName: "Email", type: "email" }
];
export default class DatatableExample extends LightningElement {
  contacts;
  records
  columns = columns;
  currentPage = 1;
  totalPages = 1;
  numberPerPage = 10; 
  disablePrev = true;
  disableNext = false;

  @wire(getContactsLimited)
  wiredContacts({ data, error }) {
    if (data) {
      this.records = data.map((record) => {
        let accountLink = "/" + record.AccountId;
        let accountName = record.Account.Name;
        return { ...record, accountLink, accountName };
      });
      this.totalPages = Math.ceil(data.length / this.numberPerPage);
      this.loadRecords();
    } else if (error) {
      console.log(error);
    }
  }
  

  get showBar(){
    return this.totalPages>1;
  }

  getSelectedName(event) {
    console.log(event.detail);
  }

  handleFirst(event) {
    this.currentPage = 1 ;
    this.loadRecords();
    this.disablePrev = true;
    this.disableNext = false;
  }

  handleLast(event) {
    this.currentPage = this.totalPages;
    this.loadRecords();
    this.disablePrev = false;
    this.disableNext = true;
    
  }

  handlePrev(event) {  
    if(this.currentPage<=1){
      this.disablePrev = true;
      return;
    }
    if(this.currentPage <= this.totalPages){
      this.disableNext = false;
    }
      this.currentPage--;
      this.loadRecords();
      
  }

  handleNext(event) {
    if(this.currentPage == this.totalPages){
      this.disableNext = true;
      return;
    }
    if(this.currentPage >= 1){
      this.disablePrev = false;
    }
    this.currentPage++;
    this.loadRecords();
  }

  loadRecords(){
    let begin = (this.currentPage - 1 )*this.numberPerPage;
    let end = begin + this.numberPerPage;

    this.contacts = this.records.slice(begin,end);

  }
}
