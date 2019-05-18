
#! /bin/bash

PACKAGE_VERSION=`node -p -e "require('./package.json').version"`

if [[ -z $1 ]]; then
  echo "Enter new version (currently $PACKAGE_VERSION): "
  read VERSION
else
  VERSION=$1
fi

if [ $VERSION = $PACKAGE_VERSION ]; then 
  echo "No version change, exiting"
  exit 1
fi

read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r

echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo
  echo "* * * * * * * Releasing $VERSION * * * * * * *"
  echo

  # update package.json version to be used in the build
  npm version $VERSION --message "Release $VERSION"

  # build
  npm run build

  # push
  git push origin v$VERSION
  git push
  
  # publish
  npm publish
fi