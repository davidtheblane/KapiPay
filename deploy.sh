#!/bin/bash

cd KapiPay
git pull
npm ci
NODE_ENV=development pm2 restart 0 --update-env
