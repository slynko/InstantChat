require.config({
  paths : {
    'jquery' : "lib/jquery-1.10.2.min",
    'backbone' : "lib/backbone-min",
    'underscore' : "lib/underscore-min",
    'template': '../template',
    'text' : 'lib/text',
    'require': 'lib/require.js'
  },
  map : {
    '*' : {
    }
  }
});

define(function(require) {
    'use strict';

    var LoginView = require('view/view.login');
    
    var loginViewContainer = $('.chat-main-wrapper');
    var loginView = new LoginView();
    loginView.setElement(loginViewContainer);
    loginView.render();

    var wsocket;
    // var serviceLocation = "ws://" + window.location.host + "/chat/";
    var $nickName;
    var $message;
    var $chatWindow;
    var room = '';

    function onMessageReceived(evt) {
      var msg = JSON.parse(evt.data); // native API
      var $messageLine = $('<tr><td class="received">' + msg.received
        + '</td><td class="user label label-info">' + msg.sender
        + '</td><td class="message badge">' + msg.message
        + '</td></tr>');
      $chatWindow.append($messageLine);
    }
    function sendMessage() {
      var msg = '{"message":"' + $message.val() + '", "sender":"'
        + $nickName.val() + '", "received":""}';
      wsocket.send(msg);
      $message.val('').focus();
    }

    // function connectToChatserver() {
    //   room = $('#chatroom option:selected').val();
    //   wsocket = new WebSocket(serviceLocation + room + "?nickname=" + $nickName.val());
    //   wsocket.onmessage = onMessageReceived;
    // }

    function leaveRoom() {
      wsocket.close();
      $chatWindow.empty();
      $('.chat-wrapper').hide();
      $('.chat-signin').show();
      $nickName.focus();
    }

    $(document).ready(function() {
      // $nickName = $('#nickname');
      // $message = $('#message');
      // $chatWindow = $('#response');
      // $('.chat-wrapper').hide();
      // $nickName.focus();

      // $('#enterRoom').click(function(evt) {
      //   evt.preventDefault();
      //   connectToChatserver();
      //   $('.chat-wrapper h2').text('Chat name: ' + room + '. Your nick name: ' +$nickName.val());
      //   $('.chat-signin').hide();
      //   $('.chat-wrapper').show();
      //   $message.focus();
      // });
      
      $('#do-chat').submit(function(evt) {
        evt.preventDefault();
        sendMessage()
      });

      $('#leave-room').click(function(){
        leaveRoom();
      });
    });
  }
);

