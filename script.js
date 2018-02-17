var $inputTitle = $('.form__input-title');
var $inputBody = $('.form__input-body');
var $saveBtn = $('.form__button-save')
var $quality = 'quality: swill';

$(window).on('load', prependIdeas);
$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);
$('.section__ideas').on('click', '.delete-x', deleteIdeas);
$('.section__ideas').on('click', '.upvote', upvoteIdea);
$('.section__ideas').on('click', '.downvote', downvoteIdea);
$('.section__ideas').on('input', '.idea-title', persistTitle);
$('.section__ideas').on('input', '.idea-body', persistBody);
$('.section__search-field').on('keyup', searchIdeas);

function ConstructIdeas(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
}

// save idea should be a function, append should be another
function saveIdea(event) {
  event.preventDefault();
  var newIdea = new ConstructIdeas((jQuery.now()), $inputTitle.val(), $inputBody.val(), $quality)
  sendToStorage(newIdea);
  // prependIdea(newIdea);
  prependIdeas();
}

function sendToStorage(idea) {
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringifiedIdea)
}

// only need one append
function prependIdeas() {
  $('.section__ideas').html("");
  var ideas = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
  var storedIdea = JSON.parse(localStorage.getItem(keys[i]));
  ideas.push(storedIdea);
    $('.section__ideas').prepend(`<article class="idea-cards" id="${ideas[i].id}">
      <h2 class="idea-title" contenteditable="true">${ideas[i].title}</h2>
      <article class="delete-x" aria-label="Button to delete idea"></article>
      <p class="idea-body" contenteditable="true">${ideas[i].body}</p>
      <article class="upvote"></article>
      <article class="downvote"></article>
      <h3 class="quality">${ideas[i].quality}</h3>
      </article>`);
  }
}

 function formReset(){
    clearInputs();
    toggleDisableState();
}

function clearInputs() {
  $inputTitle.val('');
  $inputBody.val('');
  $inputTitle.focus();
}

// need to grey out when disabled
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
}

// change names
function saveQuality() {
  var key = $(newthis).closest('.idea-cards').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(stringifiedIdea);
  idea.quality = $(newthis).siblings('h3').text();
  var stringifiedIdea = JSON.stringify(idea)
  localStorage.setItem(id, stringifiedIdea);
}

// should be able to grab class .quality instead of h3
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

// change names
// not saving the last character
// not sure what e.keyode is doing
function persistTitle(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    $inputTitle.focus();
  }
  var id = $(this).closest('.idea-cards').attr('id');
  var idea = localStorage.getItem(id);
  idea = JSON.parse(idea);
  idea.title = $(this).text();
  var stringifiedIdea = JSON.stringify(idea)
  localStorage.setItem(id, stringifiedIdea);
}

// change names
// not saving the last character
// not sure what e.keyode is doing
function persistBody(e) {
  if (e.keyCode === 13) {
  e.preventDefault();
  $inputTitle.focus();
  }
  var id = $(this).closest('.idea-cards').attr('id');
  var idea = localStorage.getItem(id);
  idea = JSON.parse(idea);
  idea.body = $(this).text();
  var stringifiedIdea = JSON.stringify(idea)
  localStorage.setItem(id, stringifiedIdea);
}

// should only need to call search for entire idea
// not saving the last character
function searchIdeas() {
   $('.idea-cards').hide();
  search('.quality');
  search('.idea-body');
  search('.idea-title');

}

function search(selector) {
  console.log(selector)
  var $input = $('.section__search-field').val();
  $input = $input.toUpperCase();
  var array = $(selector);
  for (var i = 0; i < array.length; i++) {
    if ($(array[i]).text().toUpperCase().includes($input)) {
      $(array[i]).closest('article').show();
    }
  }
}

