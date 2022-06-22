#!/bin/bash
# stop any old running servers 
# killall -s KILL node -q || echo 'no node process was running'
# sudo pm2 stop backend
sudo npm install pm2@latest -g
