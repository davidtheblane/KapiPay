#!/bin/bash

git pull origin main
sudo npm install
sudo pm2 restart api-production

# sudo pm2 stop 0
# sudo npm install
# sudo pm2 start 0
