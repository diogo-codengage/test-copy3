#!/bin/sh

PS3="Choose version: "
select OPT in major minor patch
do
    case $OPT in
        major)
            echo "you chose major"
            break
            ;;
        minor)
            echo "you chose minor"
            break
            ;;
        patch)
            echo "you chose patch"
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done

yarn release-resmed --$OPT
yarn release-esanar --$OPT
yarn release-sanarflix --$OPT
yarn release-sanarrm --$OPT
yarn release-components --$OPT
yarn release-utils --$OPT
yarn release-sanarui --$OPT
yarn release-it --$OPT
yarn postrelease