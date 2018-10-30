#!/bin/sh

if [[ -z "$1" ]]; then
    SHORT_COMMIT_SHA=$(git rev-parse --verify HEAD | cut -c1-8)
    docker build -t gunsluo/kfb-fe:${SHORT_COMMIT_SHA} .
else
    docker build -t gunsluo/kfb-fe:$1 .
fi
