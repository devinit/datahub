#!/bin/bash
## gets run on host server
mkdir -p ~/datahub/storybook
cd ~/datahub/storybook || exit

rm -rf datahub && \
  git clone --depth 1 -b master --single-branch git@github.com:devinit/datahub.git datahub

echo 'finished downloading new datahub for storybook'

cd datahub

# remove current docker file

rm -rf Dockerfile && cp -a tools/storybook/Dockerfile .

docker build -t datahub-storybook .

docker stop datahub-storybook-app

docker rm datahub-storybook-app

docker run -it -d -p 6006:6006 --name datahub-storybook-app datahub-storybook




