$(document).ready(function () {
  console.log('ready, steady, go!');
  const maxCharLength = 140;
  const errorClass = 'error';

  $("textarea").on ('input', function() {
    let counter = $(this).siblings('.counter')
    let currentText = $(this).val().length;
    let subtract = maxCharLength - currentText;
    counter.text(subtract);

    if(subtract < 0) {
      counter.addClass(errorClass);
    } else {
      counter.removeClass(errorClass);
    }
  });

  });



// console.log("SUP MY TWEETERZ!");