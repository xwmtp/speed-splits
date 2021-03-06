#!/bin/bash

git pull
rm -rf frontend/build
npm install --prefix frontend
npm run --prefix frontend build
docker-compose build --pull
docker-compose up -d
