#!/bin/bash

git pull
rm -rf frontend/build
npm run --prefix frontend build
docker-compose build --pull
docker-compose up -d
