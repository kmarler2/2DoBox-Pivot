getFromStorage();

var $inputTitle = $('.form__input-title');
var $inputBody = $('.form__input-body');
var $saveBtn = $('.form__button-save')
var $quality = 'quality: swill';

$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);
$('.section__ideas').on('click', '.delete-x', deleteIdeas);
$('.section__ideas').on('click', '.upvote', upvoteIdea);
$('.section__ideas').on('click', '.downvote', downvoteIdea);

function saveIdea(event) {
  event.preventDefault();
  var newIdea = new ConstructIdeas((jQuery.now()), $inputTitle.val(), $inputBody.val(), $quality)
  sendToStorage(newIdea);
  $('.section__ideas').prepend(`<article class="idea-cards" id="${newIdea.id}">
    <h2 class="idea-title" contenteditable="true">${newIdea.title}</h2>
    <article class="delete-x"></article>
    <p class="idea-body" contenteditable="true">${newIdea.body}</p>
    <article class="upvote"></article>
    <article class="downvote"></article>
    <h3 class="quality">${newIdea.quality}</h3>
    </article>`);
  clearInputs();
  toggleDisableState();
}

function ConstructIdeas(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function sendToStorage(idea) {
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringifiedIdea)
}

function getFromStorage() {
  var values = [];
  var keys = Object.keys(localStorage);
for (var i = 0; i < keys.length; i++) {
  values.push(JSON.parse(localStorage.getItem(keys[i])));
  console.log(values[i]);
  $('.section__ideas').prepend(`<article class="idea-cards" id="${values[i].id}">
    <h2 class="idea-title" contenteditable="true">${values[i].title}</h2>
    <article class="delete-x"></article>
    <p class="idea-body" contenteditable="true">${values[i].body}</p>
    <article class="upvote"></article>
    <article class="downvote"></article>
    <h3 class="quality">${values[i].quality}</h3>
    </article>`);
}
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
  var id = $(this).closest('.idea-cards').attr('id');
  localStorage.removeItem(id);
  console.log(this)
}

function upvoteIdea() {
  if ($(this).siblings('h3').text() === 'quality: swill') {
    $(this).siblings('h3').text('quality: plausible');
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: genius');
  }

  var id = $(this).closest('.idea-cards').attr('id');
  console.log(id);
  var idea = localStorage.getItem(id);
  idea = JSON.parse(idea);
  idea.quality = $(this).siblings('h3').text();
  var stringifiedIdea = JSON.stringify(idea)
  localStorage.setItem(id, stringifiedIdea);

}

function downvoteIdea() {
  console.log(this)
  if ($(this).siblings('h3').text() === 'quality: genius') {
    $(this).siblings('h3').text('quality: plausible')
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: swill')
  }
  var id = $(this).closest('.idea-cards').attr('id');
  console.log(id);
  var idea = localStorage.getItem(id);
  idea = JSON.parse(idea);
  idea.quality = $(this).siblings('h3').text();
  var stringifiedIdea = JSON.stringify(idea)
  localStorage.setItem(id, stringifiedIdea);
}
