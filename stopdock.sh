#!/bin/bash

# if you mounted before, you can use this
# sudo umount /mnt
docker stop db samba-server
docker rm  samba-server db home-vol 
#docker rm db-vol
boot2docker stop
