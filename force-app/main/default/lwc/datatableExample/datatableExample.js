import { LightningElement, wire } from "lwc";
import getContactsLimited from "@salesforce/apex/ContactBrowserController.getContactsLimited";

const columns = [
  { label: "Name", fieldName: "Name", type: "text", sortable: true },
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
  records;
  columns = columns;
  currentPage = 1;
  totalPages = 1;
  numberPerPage = 10;

  sortedBy;
  sortedDirection;

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

  get showBar() {
    return this.totalPages > 1;
  }

  get disableNext() {
    return this.currentPage >= this.totalPages;
  }

  get disablePrev() {
    return this.currentPage <= 1;
  }

  handleFirst(event) {
    this.currentPage = 1;
    this.loadRecords();
  }

  handleLast(event) {
    this.currentPage = this.totalPages;
    this.loadRecords();
  }

  handlePrev(event) {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRecords();
    }
  }

  handleNext(event) {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadRecords();
    }
  }

  loadRecords() {
    let begin = (this.currentPage - 1) * this.numberPerPage;
    let end = begin + this.numberPerPage;

    this.contacts = this.records.slice(begin, end);
  }

  handleSort(event) {
    this.sortedBy = event.detail.fieldName;
    this.sortedDirection = event.detail.sortDirection;
    this.records = [...this.records].sort((a, b) => {
      let val1 = String(a[this.sortedBy] || "");
      let val2 = String(b[this.sortedBy] || "");

      return this.sortedDirection === "asc"
        ? val1.localeCompare(val2)
        : val2.localeCompare(val1);
    });

    this.loadRecords();
  }
}
