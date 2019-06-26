#!/bin/sh

if [ "$CI_BRANCH" = "master" ];
then
NODE_ENV='production'
echo 'production environment'
else
NODE_ENV='development'
echo 'development environment'
fi

export NODE_ENV
