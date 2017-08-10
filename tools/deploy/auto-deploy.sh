#!/bin/bash
## gets run on host server
mkdir -p ~/datahub-2
cd ~/datahub-2 || exit

rm -rf datahub.git && \
  git clone --depth 1 -b master --single-branch git@github.com:devinit/datahub.git datahub.git

echo 'finished clonning'

cd datahub.git || exit # go into application directory

rm -rf datahub.git/.git # no need for git history

echo 'rebuilding datahub docker containers'

docker build -t datahub .

docker stop datahub-app

docker rm datahub-app

docker run -it -d -p 9090:9090 --name datahub-app datahub




