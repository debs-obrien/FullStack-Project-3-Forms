//set focus to name field on load
document.getElementById('name').focus();

//add text field when Job Role of option is selected
const addTitle = () => {
  const title = document.getElementById('title');
  title.addEventListener('change', (e) => {
    if(title.value === 'other') {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'other-title';
      input.placeholder = 'Your Job Role';
      title.parentNode.insertBefore(input, title.nextSibling);
    }
  });
}

//hide all other colors only show ones we want
const hideColors = () => {
  const design = document.getElementById('design');
  const color = document.getElementById('color');
  const colorDiv = document.getElementById('colors-js-puns');

  color.innerHTML = ''; //set all color options to empty so can be refilled based on selection
  colorDiv.style.display = 'none';

  design.addEventListener('change', () => {
    if(design.value.includes('Select Theme')){
      colorDiv.style.display = 'none';
    }else{
      colorDiv.style.display = 'block';
      if(design.value.includes('js puns')){
        color.innerHTML = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
        color.innerHTML += '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
        color.innerHTML += '<option value="gold">Gold (JS Puns shirt only)</option>';

      }else if(design.value.includes('heart js')){
        color.innerHTML = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
        color.innerHTML += '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
        color.innerHTML += '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';
      }
    }

  });
}

const mainConference = document.getElementsByName('all')[0];
const jsFrameworks = document.getElementsByName('js-frameworks')[0];
const jsLibs = document.getElementsByName('js-libs')[0];
const express = document.getElementsByName('express')[0];
const node = document.getElementsByName('node')[0];
const buildTools = document.getElementsByName('build-tools')[0];
const npm = document.getElementsByName('npm')[0];
const price = document.createElement('div');
//dont allow selection if same date/time
const availableActivities = () => {

  let totalPrice = 0;
  let mainConfPrice = 200;
  let workshopPrice = 100;
  //create div to hold price
  const activitiesPrice = () => {
    price.id = 'price';
    price.innerHTML = '';
    npm.parentElement.after(price);
  }
  //print the price
  const printPrice = (totalPrice) => {
    price.innerHTML = 'Total Price: $' + totalPrice;
  }
  //calculate the price
  const calculatePrice = (option, price) => {
    if(option.checked){
      totalPrice += price;
      printPrice(totalPrice)
    }else{
      totalPrice -= price;
      printPrice(totalPrice)
    }
  }
//function to disable checkbox
  function disable(option){
    option.disabled = true;
  }
  //function to enable checkbox
  function enable(option){
    option.disabled = false;
  }
  //call the activitiesPrice function to create price div
    activitiesPrice();
    mainConference.addEventListener('change', () => {
      calculatePrice(mainConference, mainConfPrice);
    });
    jsFrameworks.addEventListener('change', () => {
      jsFrameworks.checked ? disable(express) : enable(express);
      jsFrameworks.checked ? disable(buildTools) : enable(buildTools);
      calculatePrice(jsFrameworks, workshopPrice);
    });
    express.addEventListener('change', () => {
      express.checked ? disable(jsFrameworks) : enable(jsFrameworks);
      express.checked ? disable(buildTools) : enable(buildTools);
      calculatePrice(express, workshopPrice);
    });
    buildTools.addEventListener('change', () => {
      buildTools.checked ? disable(jsFrameworks) : enable(jsFrameworks);
      buildTools.checked ? disable(express) : enable(express);
      calculatePrice(buildTools, workshopPrice);
    });
    jsLibs.addEventListener('change', () => {
      jsLibs.checked ? disable(node) : enable(node);
      jsLibs.checked ? disable(npm) : enable(npm);
      calculatePrice(jsLibs, workshopPrice);
    });
    node.addEventListener('change', () => {
      node.checked ? disable(jsLibs) : enable(jsLibs);
      node.checked ? disable(npm) : enable(npm);
      calculatePrice(node, workshopPrice);
    });
    npm.addEventListener('change', () => {
      npm.checked ? disable(node) : enable(node);
      npm.checked ? disable(jsLibs) : enable(jsLibs);
      calculatePrice(npm, workshopPrice);
    });
};






//prevent user from sending the form
//form.preventDefault()
$('#cc-num').after('<div class="cc_num-toosmall">CardNumber should have a min of 13 numbers</div>')
$('#cc-num').after('<div class="cc_num-toolong">credit cards should only have a max of 16 numbers</div>');
$('#cc-num').after('<div class="cc_num-number">Emm it should be numbers only</div>');
$('.cc_num-toosmall').hide();
$('.cc_num-toolong').hide();
$('.cc_num-number').hide();


function ccNumberEvent(){
  const ccValue = $('#cc-num').val().length;
  if(ccValue >=13 && ccValue <=16){
    $('.cc_num-toosmall').hide();
    $('.cc_num-toolong').hide();
    $('.cc_num-number').hide();
  }else if(ccValue < 13){
    $('.cc_num-toosmall').show();
  }else if(ccValue > 16){
    $('.cc_num-toolong').show();
    $('.cc_num-toosmall').hide();
    $('.cc_num-number').hide();
  }else if($(this).val().isInteger(false)){
    $('.cc_num-toolong').hide();
    $('.cc_num-toosmall').hide();
    $('.cc_num-number').show();
  }
}


//call all functions
hideColors();
addTitle();
availableActivities();

$('#cc-num').focus(ccNumberEvent).keyup(ccNumberEvent);
