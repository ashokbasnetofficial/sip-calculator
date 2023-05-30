(function(){
    // form set 
    // array object for select item
const select = [
    {
    value:1,
    select_title:"Monthly",

    },
    {
        value:2,
        select_title:"Quarterly",
        
    },
    {
        value:3,
        select_title:"Semi-Annually",
        
    },
    {
        value:4,
        select_title:"Anually",
        
    }
  
];

select.forEach(select => {
    // create option element 
    const option = document.createElement('option');
    // set the array object value to the option 
    option.value=select.value;
    option.textContent=select.select_title;
    const selectbox = document.getElementById('selectbox');
    selectbox.appendChild(option);
});

// ---------------form setup dyanmically --------------
 

// form validate 
const select_input =document.querySelectorAll('.form-input');

const formValidate=(select_period,invest_amount,tot_return,tot_year)=>{
    // create paragraph tag
// function insertAfter(reference_element,new_element){
    //     reference_element.parentNode.insertBefore(new_element,reference_element.nextSibling);
    
    // }
    let flag =false;
    const erorr_message =document.querySelectorAll('.error_message');
console.log(erorr_message);
erorr_message.forEach((error_message)=>{
    error_message.style.color="red";
    error_message.innerHTML="";
})
if(select_period<1||select_period>5){
    erorr_message[0].innerHTML="select your investment period!"
    flag =true;
}
    //   bill validate 
    if(invest_amount==''||invest_amount<0){
         erorr_message[1].innerHTML="field blank or cannot be < zero!";
        flag =true;

    }
    // number of bill share validate 
    if(tot_return<0 || tot_return==''){
        erorr_message[2].innerHTML="return field blank or <0!"
        flag =true;
    }
    // select field validate 
    if(tot_year<0 || tot_year==''){
        erorr_message[3].innerHTML="total year is blank or <0!"
        flag =true;
    }
   
   
  return flag  ;
}
// calcuate the sip amount 
const results=(select_period,invest_amount,tot_return,tot_year)=>{
    let invest_period_type='';
    let total_return_per='';
    if(select_period==1){
        invest_period_type=12;
        total_return_per=tot_return/12;
    }
    if(select_period==2){
        invest_period_type=3;
        total_return_per=tot_return/3;
        
    }
    if(select_period==3){
        invest_period_type=2;
        total_return_per=tot_return/2;
    }
    if(select_period==4){
        invest_period_type=1;
        total_return_per=tot_return;
    }
    const total_invest_amount =Number(invest_amount)*invest_period_type*Number(tot_year);
       // sip formula break down 
    let interest_rate = Number((total_return_per)/100);
     let x =Number(1+interest_rate);
    let total_payments=Number(invest_period_type*tot_year);

    let y = Number((Math.pow(x,total_payments)-1)/interest_rate);
    console.log(interest_rate,+" "+x+ " "+ total_payments+" "+y);
    const total_receive = Number(Number(invest_amount)*x*y);
    const total_gain = total_receive-total_invest_amount;
return [total_invest_amount,total_gain,total_receive];
    
}
// form sumbit
const tip_form = document.querySelector('.sip-form');
tip_form.addEventListener('submit',(e)=>{
e.preventDefault();
const loader = document.querySelector('.loader');
let result = document.querySelector('.result');

let select_period= select_input[0].value;
let invest_amount =select_input[1].value;
let tot_return=select_input[2].value;
let tot_year =select_input[3].value;
console.log(select_period+" "+invest_amount+" "+tot_year+" "+tot_return)
const isTrue =formValidate(select_period,invest_amount,tot_return,tot_year)
if(!isTrue){
    const finalResult = results(select_period,invest_amount,tot_return,tot_year);
    result.classList.add('showloader');
       loader.classList.add('showloader');
       const resultsshow = document.querySelectorAll('.results');  
       resultsshow[0].textContent=``;
       resultsshow[1].textContent=``;
       resultsshow[2].textContent=``;
  setTimeout(()=>{   

    loader.classList.remove('showloader');
    
    resultsshow[0].textContent=`Total Investment :रु${finalResult[0].toFixed(2)}`;
    resultsshow[1].textContent=` Eastimated return :रु${finalResult[1].toFixed(2)}`;
    resultsshow[2].textContent=`Eastimated total return  :रु${finalResult[2].toFixed(2)}`;
    result.classList.add('showloader');
},2000);

}
});
})();