# node-sdn

This project is an attempt to create a SDN framework written in JavaScript on top of nodejs.  The project can operate as both a simulator in a virtual environment, as well as an actual packet processor on real ethernet devices.

# Installation

git clone / npm install

# Usage

For now, you have to define and construct your network graph manually in index.js.  Eventually this might move to some other file and/or syntax, but clearly I'm not there yet.

To start, just run:
    
    node index.js

If you have defined components using real ethernet devices, you have to run the command as root, since all sockets are opened as [AF_PACKET][AF_PACKET] sockets.

# Testing

This project uses nodeunit for testing.  Run the following from the root directory:

    nodeunit test

[AF_PACKET]: http://man7.org/linux/man-pages/man7/packet.7.html "AF_PACKET"