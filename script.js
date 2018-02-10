var $inputTitle = $('.form__input-title');
var $inputBody = $('.form__input-body');
var $saveBtn = $('.form__button-save')
// var $quality = 'swill';

$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);
$('.section__ideas').on('click', '.delete-x', deleteIdeas);
$('.section__ideas').on('click', '.upvote', upvoteIdea);
$('.section__ideas').on('click', '.downvote', downvoteIdea);

function saveIdea(event) {
  event.preventDefault();
  $('.section__ideas').prepend(`<article class="idea-cards">
    <h2 class="idea-title">${$inputTitle.val()}</h2>
    <article class="delete-x"></article>
    <p class="idea-body">${$inputBody.val()}</p>
    <article class="upvote"></article>
    <article class="downvote"></article>
    <h3 class="quality">quality: swill</h3>
    </article>`);
  // console.log($inputTitle.val());
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

function deleteIdeas() {
  $(this).closest('.idea-cards').fadeOut();
  console.log(this)
}

function upvoteIdea() {
  console.log(this)
  if ($(this).siblings('h3').text() === 'quality: swill') {
    $(this).siblings('h3').text('quality: plausible')
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: genius')
  }
}

function downvoteIdea() {
  console.log(this)
  if ($(this).siblings('h3').text() === 'quality: genius') {
    $(this).siblings('h3').text('quality: plausible')
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: swill')
  }
}