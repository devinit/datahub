## gets run on host server
mkdir -p ~/datahub-2
cd ~/datahub-2 || exit

rm -rf datahub.git && \
  git clone --depth 1 -b master --single-branch git@github.com:devinit/datahub.git datahub.git

echo 'finished clonning'

cd datahub.git || exit # go into application directory

rm -rf datahub.git/.git # no need for git history

echo 'rebuilding datahub docker containers'

docker build -t datahub-2 .

docker stop datahub-2-app

docker rm datahub-2-app

docker run -it -d -p 7777:9090 --name datahub-2-app datahub-2




