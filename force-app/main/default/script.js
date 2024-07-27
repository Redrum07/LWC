function beforesubmit(){
let outputDate = document.querySelector('.outputdate');
let inputDate = document.querySelector('.inputdate');
console.log(inputDate.value)
let formattedDate = new Date(inputDate.value).toLocaleDateString("en-IN");
outputDate.value = formattedDate;
console.log(outputDate);
}