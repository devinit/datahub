#!/bin/bash
## gets run on host server
mkdir -p ~/datahub
cd ~/datahub || exit

rm -rf build.zip

tag=`git describe`

wget https://github.com/devinit/datahub/releases/download/$tag/build.zip

echo 'finished downloading tag: $tag'

cd build || exit

docker build -t datahub .

docker stop datahub-app

docker rm datahub-app

docker run -it -d -p 8080:8080 --name datahub-app datahub

# add pdf folder.
bash ~/pdf-prints/deploy.sh



