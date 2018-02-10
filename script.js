var $inputTitle = $('.form__input-title');
var $inputBody = $('.form__input-body');
var $saveBtn = $('.form__button-save')

$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);

function saveIdea(event) {
  event.preventDefault();
  $('.section__ideas').prepend(`<article><h2>${$inputTitle.val()}</h2><img src="" />
    <p>${$inputBody.val()}</p><img src="" /><img src="" /><h3>quality:</h3></article>`);
  console.log($inputTitle.val());
  clearInputs();
  toggleDisableState();
}

function clearInputs() {
  $inputTitle.val('');
  $inputBody.val('');
  $inputTitle.focus();
}

function toggleDisableState() {
  if ($inputBody.val() && $inputTitle.val()) {
    $saveBtn.prop('disabled', false);
  } else {
    $saveBtn.prop('disabled', true);
  }
}