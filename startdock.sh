#!/bin/bash

boot2docker start
docker run -v /home --name home-vol busybox true
docker run -d -v /data:/var/lib/postgresql/data --name=db -P postgres
# use command below to mount pg director to edit config file
#docker run -v -t -i/data:/data --name db-vol busybox sh 
docker run --rm -v $(which docker):/docker -v /var/run/docker.sock:/docker.sock svendowideit/samba home-vol
# for the following line to work first: "sudo mkdir /mnt" only once
# sudo mount -t smbfs //guest@192.168.59.103/home /mnt
docker run --rm -t -i --volumes-from home-vol --link db:db --name=app --entrypoint="/bin/bash" -p 6543:6543 sspickle/assessdb:0.01 -i
