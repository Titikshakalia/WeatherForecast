
module.exports=getDate;
//can write only  exports=getData
function getDate(){
    let today=new Date();
//let currentDay=today.getDay();//today is a object so can access Date members
let options={
    weekday: "long",
    day:"numeric",
    month: "long"
}
let day=today.toLocaleDateString("en-US",options);
return day;
}
//or if you want to export two functions suppose getdate and getday
//module.exports.getDay=getDay;
//module.exports.getDate=getDate;
////////////////as module is a javascript object////////////////////////