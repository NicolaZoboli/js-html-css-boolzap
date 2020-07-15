function addSendListener() {
  var target = $("#new-message-input");
  target.keyup(sendKeyup);

  var button = $("#sendButton");
  button.click(sendClick);
}

function sendKeyup(event) {

  var key = event.which;
  var input = $(this);
  var txt = input.val();

  if (key === 13 && txt) {
    input.val("");

    sendMessage(txt);

    setTimeout(sendAnswer, 1000);
  }
}

function sendClick() {
  var input = $("#new-message-input");
  var txt = input.val();

  if (txt) {
    input.val("");

    sendMessage(txt);

    setTimeout(sendAnswer, 1000);
  }
}

function sendMessage(txt) {
  var template = $("#template-message-sent > div").clone();
  var target = $("#right-messages");

  template.find("#message-text-sent").text(txt);
  template.find("#message-time-sent").text(getActualHour());

  target.append(template);
}

function sendAnswer() {
  var template = $("#template-message-received > div").clone();
  var target = $("#right-messages");

  template.find("#message-time-received").text(getActualHour());

  target.append(template);
}

function dropdownMessageMenu() {
  $(document).on("mouseenter", ".message", function () {
    $(this).find(".message-options").show();
  });

  $(document).on("mouseleave", ".message", function () {
    $(this).find(".message-options").hide();
    $(this).find(".message-options-panel").hide();
  });

  $(document).on("click", ".message-options", function () {
    $(this).siblings(".message-options-panel").toggle();
  });

  $(document).on("click", ".message-destroy", function () {
    $(this).parents(".message").hide();
  });
}

function getActualHour() {
  var date = new Date();
  return date.getHours() + ":" + date.getMinutes();
}

function filter() {
  $("#search-chat-input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".chat-singola").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}


function init() {

  addSendListener();

  filter();

  dropdownMessageMenu();

}

$(document).ready(init);
