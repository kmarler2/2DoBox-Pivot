var $inputTitle = $('.title');
var $inputBody = $('.input-text');
var $saveBtn = $('.save-button')
var $importance = 'importance: Normal';

$(window).on('load', prependIdeas);
$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);
$('.section-ideas').on('click', '.delete', deleteIdeas);
$('.section-ideas').on('click', '.upvote', upvoteIdea);
$('.section-ideas').on('click', '.downvote', downvoteIdea);
$('.section-ideas').on('input', '.idea-title', persistTitle);
$('.section-ideas').on('input', '.idea-body', persistBody);
$('.search-field').on('keyup', searchIdeas);

function ConstructIdeas(id, title, body, importance) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.importance = importance;
}

// save idea should be a function, append should be another
function saveIdea(event) {
  event.preventDefault();
  var newIdea = new ConstructIdeas((jQuery.now()), $inputTitle.val(), $inputBody.val(), $importance)
  sendToStorage(newIdea);
  // prependIdea(newIdea);
  prependIdeas();
  clearInputs()
}

function sendToStorage(idea) {
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringifiedIdea)
}

// only need one append
function prependIdeas() {
  $('.section-ideas').html("");
  var ideas = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
  var storedIdea = JSON.parse(localStorage.getItem(keys[i]));
  ideas.push(storedIdea);
    $('.section-ideas').prepend(`<article class="idea-card" id="${ideas[i].id}">
      <h2 class="idea-title" contenteditable="true">${ideas[i].title}</h2>
      <article class="delete" aria-label="Button to delete idea"></article>
      <p class="idea-body" contenteditable="true">${ideas[i].body}</p>
      <article class="upvote"></article>
      <article class="downvote"></article>
      <h3 class="importance">${ideas[i].importance}</h3>
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
  $(this).closest('.idea-card').fadeOut();
  var id = $(this).closest('.idea-card').attr('id');
  localStorage.removeItem(id);
}

// change names
function saveImportance() {
  var key = $(newthis).closest('.idea-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(stringifiedIdea);
  idea.importance = $(newthis).siblings('h3').text();
  var stringifiedIdea = JSON.stringify(idea)
  localStorage.setItem(id, stringifiedIdea);
}

// should be able to grab class .importance instead of h3
function upvoteIdea() {
  if ($(this).siblings('h3').text() === 'importance: None') {
    $(this).siblings('h3').text('importance: Low');
  } else if ($(this).siblings('h3').text() === 'importance: Low') {
    $(this).siblings('h3').text('importance: Normal');
  } else if ($(this).siblings('h3').text() === 'importance: Normal') {
    $(this).siblings('h3').text('importance: High');
  } else if ($(this).siblings('h3').text() === 'importance: High') {
    $(this).siblings('h3').text('importance: Critical');
  }
  saveImportance(this)
}

function downvoteIdea() {
  if ($(this).siblings('h3').text() === 'importance: Critical') {
    $(this).siblings('h3').text('importance: High')
  } else if ($(this).siblings('h3').text() === 'importance: High') {
    $(this).siblings('h3').text('importance: Normal')
  } else if ($(this).siblings('h3').text() === 'importance: Normal') {
    $(this).siblings('h3').text('importance: Low')
  } else if ($(this).siblings('h3').text() === 'importance: Low') {
    $(this).siblings('h3').text('importance: None')
  }
  saveImportance(this)
}

// change names
// not saving the last character
// not sure what e.keyode is doing
function persistTitle(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    $inputTitle.focus();
  }
  var id = $(this).closest('.idea-card').attr('id');
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
  var id = $(this).closest('.idea-card').attr('id');
  var idea = localStorage.getItem(id);
  idea = JSON.parse(idea);
  idea.body = $(this).text();
  var stringifiedIdea = JSON.stringify(idea)
  localStorage.setItem(id, stringifiedIdea);
}

// should only need to call search for entire idea
// not saving the last character
function searchIdeas() {
   $('.idea-card').hide();
  search('.importance');
  search('.idea-body');
  search('.idea-title');

}

function search(selector) {
  console.log(selector)
  var $input = $('.search-field').val();
  $input = $input.toUpperCase();
  var array = $(selector);
  for (var i = 0; i < array.length; i++) {
    if ($(array[i]).text().toUpperCase().includes($input)) {
      $(array[i]).closest('article').show();
    }
  }
}

