#!/bin/bash

git pull
sudo npm ci
sudo pm2 restart 0 --update-env

# sudo pm2 stop 0
# sudo npm install
# sudo pm2 start 0
