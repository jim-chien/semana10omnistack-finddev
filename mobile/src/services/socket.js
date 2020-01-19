import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.20:8080', { autoConnect: false });

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs
  };
  socket.connect();

  socket.on('message', text => {
    console.log(text);
  });
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

function subscribeToNewDevs(subscribeFunction) {
  socket.on('new-dev', subscribeFunction);
}

export { connect, disconnect, subscribeToNewDevs };
