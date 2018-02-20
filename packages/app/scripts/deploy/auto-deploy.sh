#!/bin/bash
## gets run on host server
mkdir -p ~/datahub
cd ~/datahub || exit

rm -rf build.zip build

wget https://github.com/devinit/datahub/releases/download/$1/build.zip

echo "finished downloading tag: $tag"

unzip build.zip

cd build || exit

docker-compose build

docker-compose up -d

# add pdf folder.
bash ~/pdf-prints/deploy.sh



