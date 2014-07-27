assessdb
========

An academic assessment database project

Getting Started
---------------

Note all this is now in two shell scripts in this directory:

startdock.sh (to get going on development)

Then mount the samba share as described below

and 

stopdock.sh (to end, be sure to checkin and push changes first!)

Below are the manual steps
---------------------------------

When I'm developing (rather than deploying) here's what I'm doing:

1) Start up postgres:

	docker run -d -v /data:/var/lib/postgresql/data --name=db -P postgres

2) Start a dummy 'busybox' instance with a '/home' volume

    docker run -v /home --name home-vol busybox true

3) Run a samba server to share the home directory

    docker run --rm -v $(which docker):/docker -v /var/run/docker.sock:/docker.sock svendowideit/samba home-vol

Now, on your dev machine mount the home directory just shared (e.g., here's what I see)

    Your data volume (/home) should now be accessible at \\<docker ip>\ as 'guest' user (no password)

    For example, on OSX, using a typical boot2docker vm:
        goto Go|Connect to Server in Finder
        enter 'cifs://192.168.59.103
        hit the 'Connect' button
        select the volumes you want to mount
        choose the 'Guest' radiobox and connect

    Or on Linux:
        mount -t cifs //192.168.59.103/data /mnt/data -o username=guest

    Or on Windows:
        Enter '\\192.168.59.103\data' into Explorer
        Log in as Guest - no password

4) cd to the shared home directory. Checkout and/or copy the code:

    $ cd /Volumes/home
    $ git clone git@github.com:sspickle/assessdb.git  (or copy a recent checkout to /Volumes/home)

5) Launch an assessdb container to run the code:

   $ docker run --rm -t -i --volumes-from home-vol --link db:db --name=app --entrypoint="/bin/bash" -p 6543:6543 sspickle/assessdb:0.01 -i

6) Initialize the db stuff (if you haven't yet):

    root@e4f89c93098e:/# cd /home/assessdb/src/
    root@e4f89c93098e:/home/assessdb/src# sh -v dbsetup.sh 
    #!/bin/bash

    createuser -h db -U postgres -d webuser
    createdb -h db -U webuser assessdev

    root@be072c1236c3:/home/assessdb/src# initialize_assessdb_db development.ini 

    (lots of output)

7) Run the tests, and setup for development:

    root@e4f89c93098e:/home/assessdb/src# python setup.py develop

   root@e4f89c93098e:/home/assessdb/src# python setup.py test -q
   
   (see what passes and fails. Of course, everything should pass!)
   
8) Run the server and point browser to port 6543!

   root@be072c1236c3:/home/assessdb/src# pserve development.ini 
   Starting server in PID 18.
   serving on http://0.0.0.0:6543

   open http://192.168.59.103:6543 in your fave browser
