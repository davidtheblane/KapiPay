echo 'Starting'

git checkout main
git pull 
sudo npm ci
sudo pm2 restart 0 --update-env

echo 'Finishing'

