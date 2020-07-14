function addSendListener() {
  var target = $("#new-message-input");
  target.keyup(sendKeyup);

  var button = $("#sendButton");
  button.click(sendClick);
}

function sendKeyup(event) {
  console.log(event.which);

  var key = event.which;
  var input = $(this);
  var txt = input.val();

  if (key === 13 && txt) {
    input.val("");

    sendMessage(txt);
  }
}

function sendClick() {
  var input = $("#new-message-input");
  var txt = input.val();

  if (txt) {
    input.val("");

    sendMessage(txt);
  }
}

function sendMessage(txt) {
  var template = $("#template-message-sent > div").clone();
  var target = $("#right-messages");

  template.find("#message-text").text(txt);
  template.find("#message-time").text(getActualHour());

  target.append(template);
}

function getActualHour() {
  var date = new Date();
  return date.getHours() + ":" + date.getMinutes();
}

function init() {

  addSendListener();
}

$(document).ready(init);
