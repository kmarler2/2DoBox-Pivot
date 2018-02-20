var $inputTitle = $('.title');
var $inputBody = $('.input-text');
var $saveBtn = $('.save-btn')
var $quality = 'quality: swill';
var $showCompletedBtn = $('.show-completed');
var $hideCompletedBtn = $('.hide-completed');

$(window).on('load', prependIncompleteTasks);
$saveBtn.on('click', saveTask);
$inputBody.on('keyup', toggleDisableState);
$inputTitle.on('keyup', toggleDisableState);
$showCompletedBtn.on('click', prependCompletedTasks);
$hideCompletedBtn.on('click', hideCompletedTasks);
$('.task-list').on('click', '.delete', deleteTasks);
$('.task-list').on('click', '.upvote', upvoteTask);
$('.task-list').on('click', '.downvote', downvoteTask);
$('.task-list').on('input', '.idea-title', saveEditedTitle);
$('.task-list').on('input', '.idea-body', saveEditedBody);
$('.task-list').on('click', '.completed-checkbox', updateCompleted);
$('.task-list').on('click', '.completed-checkbox', addCompletedClass);
$('.search-field').on('keyup', search);

function Task(id, title, body, quality, completed) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality;
  this.completed = '';
  this.checked = '';
}

function saveTask(event) {
  event.preventDefault();
  var newTask = new Task((jQuery.now()), $inputTitle.val(), $inputBody.val(), $quality)
  sendToStorage(newTask)
  formReset();
  clearInputs();
}

function sendToStorage(task) {
  var stringifiedTask = JSON.stringify(task);
  localStorage.setItem(task.id, stringifiedTask);
  getFromStorage(task);
}

function getFromStorage(task) {
  var storedTask = JSON.parse(localStorage.getItem(task.id));
  prependTask(storedTask);
}

// Before reload the ideas are prepended without needing to loop through each task
function prependTask(storedTask) {
    $('.task-list').prepend(`<article class="task-card ${storedTask.completed}" id="${storedTask.id}">
      <h2 class="task-title" contenteditable="true">${storedTask.title}</h2>
      <article class="delete" aria-label="Button to delete task"></article>
      <p class="task-body" contenteditable="true">${storedTask.body}</p>
      <section class="quality-completed">
        <article class="upvote"></article>
        <article class="downvote"></article>
        <h3 class="quality">${storedTask.quality}</h3>
        <article class="completed-task">
          <input type="checkbox" name="completed-task-checkbox" id="completed-checkbox" class="completed-checkbox" value="value" ${storedTask.checked}>
          <label for="completed-task-checkbox">Completed Task</label>
        </article>
        </article>
      </section>
      </article>`);
  }


function prependIncompleteTasks() {
  $('.task-list').html('');
  var tasks = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
  var storedIdea = JSON.parse(localStorage.getItem(keys[i]));
  tasks.push(storedIdea);
  if (tasks[i].completed === '') {
    $('.task-list').prepend(`<article class="task-card ${tasks[i].completed}" id="${tasks[i].id}">
      <h2 class="task-title" contenteditable="true">${tasks[i].title}</h2>
      <article class="delete" aria-label="Button to delete idea"></article>
      <p class="task-body" contenteditable="true">${tasks[i].body}</p>
      <section class="quality-completed">
        <article class="upvote"></article>
        <article class="downvote"></article>
        <h3 class="quality">${tasks[i].quality}</h3>
        <article class="completed-task">
          <input type="checkbox" name="completed-task-checkbox" id="completed-checkbox" class="completed-checkbox" value="value" ${tasks[i].checked}>
          <label for="completed-task-checkbox">Completed Task</label>
        </article>
        </article>
      </section>
      </article>`);
  }
}

}

function prependCompletedTasks() {
  var tasks = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
  var storedIdea = JSON.parse(localStorage.getItem(keys[i]));
  tasks.push(storedIdea);
  if (tasks[i].completed === 'completed') {
    $('.task-list').prepend(`<article class="task-card ${tasks[i].completed}" id="${tasks[i].id}">
      <h2 class="task-title" contenteditable="true">${tasks[i].title}</h2>
      <article class="delete" aria-label="Button to delete idea"></article>
      <p class="task-body" contenteditable="true">${tasks[i].body}</p>
      <section class="quality-completed">
        <article class="upvote"></article>
        <article class="downvote"></article>
        <h3 class="quality">${tasks[i].quality}</h3>
        <article class="completed-task">
          <input type="checkbox" name="completed-task-checkbox" id="completed-checkbox" class="completed-checkbox" value="value" ${tasks[i].checked}>
          <label for="completed-task-checkbox">Completed Task</label>
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
     hideCompletedTasks();
  }
}

function hideCompletedTasks() {
  $('.completed').addClass('hide');
  $('.show-hide-btn').text('Show Completed').removeClass('hide-completed').addClass('show-completed');
}

function deleteTasks() {
  $(this).closest('.task-card').fadeOut();
  var id = $(this).closest('.task-card').attr('id');
  localStorage.removeItem(id);
}

function upvoteTask() {
  if ($(this).siblings('h3').text() === 'quality: swill') {
    $(this).siblings('h3').text('quality: plausible');
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: genius');
  }
  saveQuality(this)
}

function downvoteTask() {
  if ($(this).siblings('h3').text() === 'quality: genius') {
    $(this).siblings('h3').text('quality: plausible')
  } else if ($(this).siblings('h3').text() === 'quality: plausible') {
    $(this).siblings('h3').text('quality: swill')
  }
  saveQuality(this)
}

function saveQuality(newThis) {
  var key = $(newThis).closest('.task-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  var parsedIdea = JSON.parse(stringifiedIdea);
  parsedIdea.quality = $(voteBtn).siblings('h3').text();
  var stringifiedIdea = JSON.stringify(parsedIdea)
  localStorage.setItem(key, stringifiedIdea);
}

function saveEditedTitle() {
  var key = $(this).closest('.task-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  idea = JSON.parse(stringifiedIdea);
  idea.title = $(this).text();
  var changedIdea = JSON.stringify(idea)
  localStorage.setItem(key, changedIdea);
}

function saveEditedBody() {
  var key = $(this).closest('.task-card').attr('id');
  var stringifiedIdea = localStorage.getItem(key);
  idea = JSON.parse(stringifiedIdea);
  idea.body = $(this).text();
  var changedIdea = JSON.stringify(idea)
  localStorage.setItem(key, changedIdea);
}

function search() {
  var $input = $('.search-field').val().toLowerCase();
  $(".task-card").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf($input) > -1)
  }); 
}


function updateCompleted() {
  var key = $(this).closest('.task-card').attr('id');
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
  $(this).closest('.task-card').toggleClass('completed');
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

