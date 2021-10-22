#!/bin/bash

git pull
sudo pm2 stop 0
sudo npm install
sudo pm2 start 0

# npm ci
# pm2 restart 0 --update-env
