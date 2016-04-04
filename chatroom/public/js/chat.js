var Chat = function(socket) {
    this.socket = socket;
};
Chat.prototype.sendMessage = function(room, text) {
    var message = {
        room: room,
        text: text
    };

    this.socket.emit('message', message);
};
Chat.prototype.changeRoom = function(room) {
    this.socket.emit('join', {
        newRoom: room
    });
};
Chat.prototype.processCommand = function(command) {
    var words = command.split(' ');
    var com = words[0].substring(1, words[0].length).toLowerCase();
    console.log('com:'+com);
    switch (com) {
        case 'join':
            words.shift(); //删除数组的第一个元素
            var room = words.join(' ');     
            this.changeRoom(room);
            break;
        case "nick":
            words.shift();
            var name = words.join(' ');
            this.socket.emit('nameAttempt', name);
            break;
        default:
            message = 'Unrecognized command';
            break;
    }
    //return message;
}
