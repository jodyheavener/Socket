# Socket

It's a really simple wrapper script for managing multiple Socket.io connections. I made it for me, but you can use it too.

Cool.

### Class `Socket`

**Config:** Requires HTTP server `Object` as argument so Socket.io can listen to it

**Methods:**
- `on(eventName{String}, callback{Function})` and `trigger(eventName{String}, data{Array})` to listen to and trigger events
- `find(key{String}, value{Mixed})` to retrieve a Connection by alias
- `remove(socket{Object})` to remove a specific Connection

**Events**
- `message(data{Object}, socket{Object})` a socket Connection recieves a message
- `disconnect(aliases{Object})` a socket Connection is disconnected; passes the Connection's aliases for identification purposes
- `connection(connection{Object})` a new socket Connection is created.

### Class `Socket.Connection`

**Config:** Requires Socket.io Connection `Object`

**Methods:**
- `on(eventName{String}, callback{Function})` and `trigger(eventName{String}, data{Array})` to listen to and trigger events
- `addAlias(key{String}, value{Mixed})` to add a new identifying property to the current Connection
- `hasAlias(key{String}, value{Mixed})` returns Boolean for if the current Connection has the specified alias
- `send(data{Object})` send a message from the current Connection
- `isConnected()` returns Boolean for if the current Connection is still connected

**Events**
- `message(data{Object}, socket{Object})` the current socket Connection recieves a message
