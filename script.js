var $inputTitle = $('.title');
var $inputBody = $('.input-text');
var $saveBtn = $('.save-btn')
var $quality = 'quality: swill';
var $showCompletedBtn = $('.show-completed');
var $hideCompletedBtn = $('.hide-completed');

$(window).on('load', prependIncompleteIdeas);
$saveBtn.on('click', saveIdea);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);
$showCompletedBtn.on('click', prependCompletedIdeas);
$hideCompletedBtn.on('click', hideCompletedIdeas);
$('.ideas-list').on('click', '.delete', deleteIdeas);
$('.ideas-list').on('click', '.upvote', upvoteIdea);
$('.ideas-list').on('click', '.downvote', downvoteIdea);
$('.ideas-list').on('input', '.idea-title', saveEditedTitle);
$('.ideas-list').on('input', '.idea-body', saveEditedBody);
$('.ideas-list').on('click', '.completed-checkbox', updateCompleted);
$('.ideas-list').on('click', '.completed-checkbox', addCompletedClass);
$('.search-field').on('keyup', search);

function ConstructIdeas(id, title, body, quality, completed) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.completed = '';
  this.checked = '';
}

function saveIdea(event) {
  event.preventDefault();
  var newIdea = new ConstructIdeas((jQuery.now()), $inputTitle.val(), $inputBody.val(), $quality)
  sendToStorage(newIdea)
  formReset();
  clearInputs();
}

function sendToStorage(idea) {
  var stringifiedIdea = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringifiedIdea);
  getFromStorage(idea);
}

function getFromStorage(idea) {
  var storedIdea = JSON.parse(localStorage.getItem(idea.id));
  prependIdea(storedIdea);
}

function prependIdea(storedIdea) {
    $('.ideas-list').prepend(`<article class="idea-card ${storedIdea.completed}" id="${storedIdea.id}">
      <h2 class="idea-title" contenteditable="true">${storedIdea.title}</h2>
      <article class="delete" aria-label="Button to delete idea"></article>
      <p class="idea-body" contenteditable="true">${storedIdea.body}</p>
      <section class="quality-completed">
        <article class="upvote"></article>
        <article class="downvote"></article>
        <h3 class="quality">${storedIdea.quality}</h3>
        <article class  ="completed-task">
          <input type="checkbox" name="completed-todo-checkbox" id="completed-checkbox" class="completed-checkbox" value="value" ${storedIdea.checked}>
          <label for="completed-todo-checkbox">Completed Task</label>
        </article>
        </article>
      </section>
      </article>`);
  }


function prependIncompleteIdeas() {
  $('.ideas-list').html('');
  var ideas = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
  var storedIdea = JSON.parse(localStorage.getItem(keys[i]));
  ideas.push(storedIdea);
  if (ideas[i].completed === '') {
    $('.ideas-list').prepend(`<article class="idea-card ${ideas[i].completed}" id="${ideas[i].id}">
      <h2 class="idea-title" contenteditable="true">${ideas[i].title}</h2>
      <article class="delete" aria-label="Button to delete idea"></article>
      <p class="idea-body" contenteditable="true">${ideas[i].body}</p>
      <section class="quality-completed">
        <article class="upvote"></article>
        <article class="downvote"></article>
        <h3 class="quality">${ideas[i].quality}</h3>
        <article class  ="completed-task">
          <input type="checkbox" name="completed-todo-checkbox" id="completed-checkbox" class="completed-checkbox" value="value" ${ideas[i].checked}>
          <label for="completed-todo-checkbox">Completed Task</label>
        </article>
        </article>
      </section>
      </article>`);
  }
}

}

function prependCompletedIdeas() {
  var ideas = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
  var storedIdea = JSON.parse(localStorage.getItem(keys[i]));
  ideas.push(storedIdea);
  if (ideas[i].completed === 'completed') {
    $('.ideas-list').prepend(`<article class="idea-card ${ideas[i].completed}" id="${ideas[i].id}">
      <h2 class="idea-title" contenteditable="true">${ideas[i].title}</h2>
      <article class="delete" aria-label="Button to delete idea"></article>
      <p class="idea-body" contenteditable="true">${ideas[i].body}</p>
      <section class="quality-completed">
        <article class="upvote"></article>
        <article class="downvote"></article>
        <h3 class="quality">${ideas[i].quality}</h3>
        <article class  ="completed-task">
          <input type="checkbox" name="completed-todo-checkbox" id="completed-checkbox" class="completed-checkbox" value="value" ${ideas[i].checked}>
          <label for="completed-todo-checkbox">Completed Task</label>
        </article>
        </article>
      </section>
      </article>`);
  }
}
toggleCompletedBtn();
}

function toggleCompletedBtn() {
  var showHideBtnText = $('.show-hide-btn').text();
  if (showHideBtnText === 'Show Completed') {
    $('.show-hide-btn').text('Hide Completed').removeClass('show-completed').addClass('hide-completed');
  } else {
     hideCompletedIdeas();
  }
}

function hideCompletedIdeas() {
  $('.completed').addClass('hide');
  $('.show-hide-btn').text('Show Completed').removeClass('hide-completed').addClass('show-completed');
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

function saveQuality(newThis) {
  var key = $(newThis).closest('.idea-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(stringifiedIdea);
  parsedIdea.quality = $(voteBtn).siblings('h3').text();
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
  var $input = $('.search-field').val().toLowerCase();
  $(".idea-card").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf($input) > -1)
  }); 
}


function updateCompleted() {
  var key = $(this).closest('.idea-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  idea = JSON.parse(stringifiedIdea);
  if (idea.completed === '') {
    idea.completed = 'completed';
    idea.checked = 'checked'; 
  } else {
    idea.completed = '';
    idea.checked = '';
  }
  var changedIdea = JSON.stringify(idea);
  localStorage.setItem(key, changedIdea);
}

function addCompletedClass() {
  $(this).closest('.idea-card').toggleClass('completed');
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

function toggleDisableState() {
  if ($inputBody.val() && $inputTitle.val()) {
    $saveBtn.prop('disabled', false);
  } else {
    $saveBtn.prop('disabled', true);
  }
}

