echo 'Starting'

git checkout develop
git pull 
sudo npm ci
sudo pm2 restart 0 --update-env

echo 'Finishing'

