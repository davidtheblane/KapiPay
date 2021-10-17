#!/bin/bash

git pull
npm ci
pm2 restart 0 --update-env
