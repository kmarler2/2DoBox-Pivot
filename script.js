var $inputTitle = $('.title');
var $inputBody = $('.input-text');
var $saveBtn = $('.save-btn')
var $importance = 'Importance: Normal';
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
$('.task-list').on('input', '.task-title', saveEditedTitle);
$('.task-list').on('input', '.task-body', saveEditedBody);
$('.task-list').on('click', '.completed-button', updateCompleted);
$('.task-list').on('click', '.completed-button', addCompletedClass);
$('.search-field').on('keyup', search);

function Task(id, title, body, importance, completed) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.importance = importance;
  this.completed = '';
  this.checked = '';
}

function saveTask(event) {
  event.preventDefault();
  var newTask = new Task((jQuery.now()), $inputTitle.val(), $inputBody.val(), $importance)
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

function prependTask(storedTask) {
    $('.task-list').prepend(`<article class="task-card ${storedTask.completed}" id="${storedTask.id}">
      <h2 class="task-title" contenteditable="true">${storedTask.title}</h2>
      <article class="delete" aria-label="Button to delete task"></article>
      <p class="task-body" contenteditable="true">${storedTask.body}</p>
      <section class="importance-completed">
        <article class="upvote"></article>
        <article class="downvote"></article>
        <h3 class="importance">${storedTask.importance}</h3>
        <article class="completed-task">
          <button for="completed-task-button" class="completed-button">Completed Task</button>
        </article>
        </article>
      </section>
      </article>`);
  }


function prependIncompleteTasks() {
  $('.task-list').html('');
  var tasks = [];
  var keys = Object.keys(localStorage);
  var i = 0;
  while (tasks.length < 10) {
    var storedTask = JSON.parse(localStorage.getItem(keys[i]));
    i++;
    if (storedTask.completed === '') {
      prependTask(storedTask);
      tasks.push(storedTask); 
    }
  }
createButton();
}

  function createButton() {
$('.task-list').append('<button class="show-more-button">Show More</button>');
}


function prependCompletedTasks() {
  var tasks = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var storedTask = JSON.parse(localStorage.getItem(keys[i]));
    tasks.push(storedTask);
    if (tasks[i].completed === 'completed') {
      prependTask(storedTask);
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
  prependIncompleteTasks();
}

function upvoteTask() {
  if ($(this).siblings('h3').text() === 'Importance: None') {
    $(this).siblings('h3').text('Importance: Low');
  } else if ($(this).siblings('h3').text() === 'Importance: Low') {
    $(this).siblings('h3').text('Importance: Normal');
  } else if ($(this).siblings('h3').text() === 'Importance: Normal') {
    $(this).siblings('h3').text('Importance: High');
  } else {
    $(this).siblings('h3').text('Importance: Critical');
  }
  saveImportance(this)
}

function downvoteTask() {
  if ($(this).siblings('h3').text() === 'Importance: Critical') {
    $(this).siblings('h3').text('Importance: High');
  } else if ($(this).siblings('h3').text() === 'Importance: High') {
    $(this).siblings('h3').text('Importance: Normal');
  } else if ($(this).siblings('h3').text() === 'Importance: Normal') {
    $(this).siblings('h3').text('Importance: Low');
  } else {
    $(this).siblings('h3').text('Importance: None');
  }
  saveImportance(this)
}

function saveImportance(newThis) {
  var key = $(newThis).closest('.task-card').attr('id');
  var stringifiedTask = localStorage.getItem(key);
  var parsedTask = JSON.parse(stringifiedTask);
  parsedTask.importance = $(newThis).siblings('h3').text();
  var stringifiedTask = JSON.stringify(parsedTask)
  localStorage.setItem(key, stringifiedTask);
}

function saveEditedTitle() {
  var key = $(this).closest('.task-card').attr('id');
  var stringifiedTask = localStorage.getItem(key);
  task = JSON.parse(stringifiedTask);
  task.title = $(this).text();
  var changedTask = JSON.stringify(task)
  localStorage.setItem(key, changedTask);
}

function saveEditedBody() {
  var key = $(this).closest('.task-card').attr('id');
  var stringifiedTask = localStorage.getItem(key);
  task = JSON.parse(stringifiedTask);
  task.body = $(this).text();
  var changedTask = JSON.stringify(task)
  localStorage.setItem(key, changedTask);
}

function search() {
  var $input = $('.search-field').val().toLowerCase();
  $(".task-card").filter(function() {
  $(this).toggle($(this).text().toLowerCase().indexOf($input) > -1)
  }); 
}


function updateCompleted() {
  var key = $(this).closest('.task-card').attr('id');
  var stringifiedTask = localStorage.getItem(key);
  task = JSON.parse(stringifiedTask);
  if (task.completed === '') {
    task.completed = 'completed';
    task.checked = 'checked'; 
  } else {
    task.completed = '';
    task.checked = '';
  }
  var changedTask = JSON.stringify(task);
  localStorage.setItem(key, changedTask);
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

