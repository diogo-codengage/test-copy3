#!/bin/sh

if [ "$CI_BRANCH" = "master" ];
then
  NODE_ENV='production'
  echo 'production environment'
elif [ "$CI_BRANCH" = "staging" ]
then
  NODE_ENV='staging'
  echo 'production environment'
else
  NODE_ENV='development'
  yarn esanar:build:development
fi

export NODE_ENV

# if [ $CI_BRANCH = "master" ];
# then
# yarn esanar:build:production
# elif [$CI_BRANCH = "staging"]
# then
# yarn esanar:build:staging
# else
# yarn esanar:build:development
# fi