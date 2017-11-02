#!/bin/bash
## gets run on host server
mkdir -p ~/datahub
cd ~/datahub || exit

rm -rf datahub.git && \
  git clone --depth 1 -b master --single-branch git@github.com:devinit/datahub.git datahub.git

echo 'finished clonning'

cd datahub.git || exit # go into application directory

rm -rf datahub.git/.git # no need for git history

echo 'rebuilding datahub docker containers'

docker build -t datahub .

docker stop datahub-new

docker rm datahub-new

docker run -it -d -p 8080:8080 --name datahub-new datahub

# add pdf folder.
bash ~/pdf-prints/deploy.sh



