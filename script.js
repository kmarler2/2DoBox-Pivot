var $inputTitle = $('.form__input-title');
var $inputBody = $('.form__input-body');
var $saveBtn = $('.form__button-save')

$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);

function saveIdea(event) {
  event.preventDefault();
  $('.section__ideas').prepend(`<article class="idea-cards">
    <h2 class="idea-title">${$inputTitle.val()}</h2>
    <article class="delete-x"></article>
    <p class="idea-body">${$inputBody.val()}</p>
    <article class="upvote"></article>
    <article class="downvote"></article>
    <h3 class="quality">quality:</h3>
    </article>`);
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

$('.section__ideas').on('click', '.delete-x', deleteIdeas);

function deleteIdeas() {
  $(this).closest('.idea-cards').fadeOut();
  console.log(this)
}