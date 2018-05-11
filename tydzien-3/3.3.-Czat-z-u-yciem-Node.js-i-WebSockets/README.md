# A Node.js and WebSocket-based local network chat application

**Assignment**

+ Create a chat that will use a server created using the Node.js platform, as well as the WebSockets protocol, and will enable two-way data transfer.
+ Allow users to provide their nickname. 
+ Implement status display when someone joins or leaves the chat.
+ All sent messages, as well as statuses, should be visible to all connected clients.

## Used npm packages

* WebSocket server: [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)
* HTTP server: Node HTTP, OS, URL, PATH, FS modules

## API

Default port is `3000`. To set custom port use 3rd command line argument:
```
node chat-server <port>
```
or
```
npm start -- <port>
```