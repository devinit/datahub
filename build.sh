#!/bin/bash
rm -rf build.zip build

npm run build-workers
npm run build-fragment
npm run build:next

echo "build complete... bundling"

mkdir build && mv .next build/ && mv lib/* build/ && mv package.json build/ && mv static build/ && mv Dockerfile build/ && mv nginx build/ && mv docker-compose.yml build/ && mv process.yml build/

zip -q -r build.zip build

echo "bundling complete... returning repo to original state"

git reset .
git checkout .

rm -rf build

echo "DONE!"
