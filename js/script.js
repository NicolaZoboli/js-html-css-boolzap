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
  var target = $(".right-messages.active");

  template.find("#message-text-sent").text(txt);
  template.find("#message-time-sent").text(getActualHour());

  target.append(template);
}

function sendAnswer() {
  var template = $("#template-message-received > div").clone();
  var target = $(".right-messages.active");

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

function addContactClickListener() {
  var contacts = $('.contacts .contact');
  contacts.click(contactClick);
}

function contactClick() {

  var clickedContact = $(this);
  var id = clickedContact.data('id');
  var contacts = $('.contacts .contact');

  var conversations = $('.right-messages');
  var selectedConv = $('.right-messages[data-id=' + id + ']');

  var contactsInfo = $('.container-info-contatto');
  var selectedContactInfo = $('.container-info-contatto[data-id=' + id + ']');

  contacts.removeClass('active');
  clickedContact.addClass('active');

  conversations.removeClass('active');
  selectedConv.addClass('active');

  contactsInfo.removeClass('active');
  selectedContactInfo.addClass('active');

  console.log('id', id);
}

function getActualHour() {
  var date = new Date();
  return date.getHours() + ":" + date.getMinutes();
}

function filter() {
  $("#search-chat-input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".contact").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}


function init() {

  addSendListener();

  filter();

  dropdownMessageMenu();

  addContactClickListener();
}

$(document).ready(init);
