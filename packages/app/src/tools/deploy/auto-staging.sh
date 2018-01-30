#!/bin/bash
## gets run on host server
mkdir -p ~/datahub
cd ~/datahub || exit

rm -rf build.zip build

wget https://github.com/devinit/datahub/releases/download/$1/build.zip

echo 'finished downloading tag: $tag'

unzip build.zip

cd build || exit

docker build -t datahub .

docker stop datahub-new

docker rm datahub-new

docker run -it -d -p 8080:8080 --name datahub-new datahub

# add pdf folder.
bash ~/pdf-prints/deploy.sh



