var socket = io.connect();
$(document).ready(function() {
    var chatApp = new Chat(socket);
    socket.on('nameResult', function(result) {
        var message;
        if (result.success) {
            message = 'You are now as ' + result.name + '.';
        } else {
            message = result.message;
        }
        $('#message').append(divSystemContentElement(message));
    });
    socket.on('joinResult', function(result) {
        $('#room').text(result.room);
        $('#message').append(divSystemContentElement('room changed'));
    });
    socket.on('message', function(message) {
    	console.log(message);
        var newElement = $('<div></div>').text(message.text);
        $('#message').append(newElement);
    });
    socket.on('rooms', function(rooms) {
        $('#room-list').empty();
        for (var room in rooms) {
            room = room.substring(1, room.length);
            if (room != '') {
                $('#room-list').append(divEscapedContentElement(room));
            }
        }
        $('#room-list div').click(function() {
            chatApp.processCommand('/join ' + $(this).text());
            $('#message').focus();
        });
    });
    setInterval(function() {
        socket.emit('rooms');
    }, 1000);
    $('#message').focus();
    $('#send-form').submit(function() {
        var message = $('#send-message').val();
        processUserInput(chatApp, socket);
        return false;
    })

})

function divEscapedContentElement(message) {
    return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
    return $('<div></div>').html(message);
}

function processUserInput(chatApp, socket) {
    var message = $('#send-message').val();
    console.log(message);
    var systemMessage;
    if (message.charAt(0) == '/') {
    	alert(message);
        systemMessage = chatApp.processCommand(message);
        if (systemMessage) {
            $('#message').append(divSystemContentElement(systemMessage));
        }
    } else {
        chatApp.sendMessage($('#room').text(), message);
        $('#message').append(divEscapedContentElement(systemMessage));
        $('#message').scrollTop($('#message').prop('scrollHeight'));
    }
    $('#send-message').val('');
}
