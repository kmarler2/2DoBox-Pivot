var $inputTitle = $('.form__input-title');
var $inputBody = $('.form__input-body');
var $saveBtn = $('.form__button-save')
var $quality = 'quality: swill';

$(window).on('load', prependIdeas);
$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);
$('.section__ideas').on('click', '.delete', deleteIdeas);
$('.section__ideas').on('click', '.upvote', upvoteIdea);
$('.section__ideas').on('click', '.downvote', downvoteIdea);
$('.section__ideas').on('input', '.idea-title', saveEditedTitle);
$('.section__ideas').on('input', '.idea-body', saveEditedBody);
$('.section__search-field').on('keyup', search);

function InitiateIdea(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

function saveIdea(event) {
  event.preventDefault();
  var newIdea = new InitiateIdea((jQuery.now()), $inputTitle.val(), $inputBody.val(), $quality)
  sendToStorage(newIdea);
  formReset();
  prependIdeas();
}

function sendToStorage(idea) {
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringifiedIdea)
}

function prependIdeas() {
  $('.section__ideas').html("");
  var ideas = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
  var storedIdea = JSON.parse(localStorage.getItem(keys[i]));
  ideas.push(storedIdea);
    $('.section__ideas').prepend(`<article class="idea-card" id="${ideas[i].id}">
      <h2 class="idea-title" contenteditable="true">${ideas[i].title}</h2>
      <article class="delete" aria-label="Button to delete idea"></article>
      <p class="idea-body" contenteditable="true">${ideas[i].body}</p>
      <article class="upvote"></article>
      <article class="downvote"></article>
      <h3 class="quality">${ideas[i].quality}</h3>
      </article>`);
  }
}

function deleteIdeas() {
  $(this).closest('.idea-card').fadeOut();
  var id = $(this).closest('.idea-card').attr('id');
  localStorage.removeItem(id);
}

function upvoteIdea() {
  if ($(this).siblings('h3').text() === 'quality: swill') {
    $(this).siblings('h3').text('quality: plausible');
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: genius');
  }
  saveQuality(this)
}

function downvoteIdea() {
  if ($(this).siblings('h3').text() === 'quality: genius') {
    $(this).siblings('h3').text('quality: plausible')
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: swill')
  }
  saveQuality(this)
}

function saveQuality(newQuality) {
  var key = $(newQuality).closest('.idea-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(stringifiedIdea);
  parsedIdea.quality = $(newQuality).siblings('h3').text();
  var stringifiedIdea = JSON.stringify(parsedIdea)
  localStorage.setItem(key, stringifiedIdea);
}

function saveEditedTitle() {
  var key = $(this).closest('.idea-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  idea = JSON.parse(stringifiedIdea);
  idea.title = $(this).text();
  var changedIdea = JSON.stringify(idea)
  localStorage.setItem(key, changedIdea);
}

function saveEditedBody() {
  var key = $(this).closest('.idea-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  idea = JSON.parse(stringifiedIdea);
  idea.body = $(this).text();
  var changedIdea = JSON.stringify(idea)
  localStorage.setItem(key, changedIdea);
}

function search() {
  var $input = $('.section__search-field').val().toLowerCase();
  $(".idea-card").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf($input) > -1)
  }); 
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

function formReset(){
  clearInputs();
  toggleDisableState();
}
