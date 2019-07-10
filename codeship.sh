#!/bin/sh

if [ "$CI_BRANCH" = "master" ];
then
  NODE_ENV='production'
  yarn esanar:build:production
elif [ "$CI_BRANCH" = "staging" ]
then
  NODE_ENV='staging'
  yarn esanar:build:staging
else
  NODE_ENV='development'
  yarn esanar:build:development
fi

export NODE_ENV