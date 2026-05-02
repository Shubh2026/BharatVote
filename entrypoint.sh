#!/bin/sh
# Start the Node.js proxy server in the background
node server.js &
# Start Nginx in the foreground
nginx -g 'daemon off;'
