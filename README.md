# Setup Guide

## Dependency

Conference signaling server from [Samvad](https://github.com/namdu1radio/samvad) project.

## Setting up client

1. Move to a temporary directory by issuing `cd /tmp` in terminal.
2. Clone this repository by issuing `git clone https://github.com/namdu1radio/prasna.git` command in terminal, internet connection is necessary for this step.
3. Nginx setup,
  * If Nginx (or Apache) is not installed already, install it using `sudo apt-get install nginx`
  * Now create a `quiz` directory in Nginx's `www` folder by issuing `sudo mkdir /var/www/html/quiz` command in terminal
  * Now enable write permission to this directory by issuing `sudo chown <YOURUSERNAME>:www-data /var/www/html/quiz` command in terminal
4. Copy the contents of `/tmp/prasna/client` to `quiz` directory by issuing `cp -r /tmp/prasna/client/* /var/www/html/quiz/` command in terminal.
5. Open `/var/www/html/quiz/js/quiz.js` in your favorite text editor and change line number `51` and replace the IP `192.168.1.15` with IP address of your current machine, this can be found by issuing `ifconfig` command in the terminal. Leave everything else including `http` protocol and `1337` port unchanged. Once you have made the changes, make sure the file is saved.
6. Open `/var/www/html/quiz/js/audio-stream.js` in your favorite text editor and change line number `20` and replace the IP `192.168.1.15` with IP address of your current machine, this can be found by issuing `ifconfig` command in the terminal. Leave everything else including `http` protocol and `443` port unchanged. Once you have made the changes, make sure the file is saved.

## Setting up admin dashboard

1. Move to the clone repository directory from earlier steps, by issuing `cd /tmp/prasna` in terminal.
2. Copy the contents of `/tmp/prasna/admin` to `quiz` directory by issuing `cp -r /tmp/prasna/admin/ /var/www/html/quiz/` command in terminal.
3. Open `/var/www/html/quiz/admin/js/admin.js` in your favorite text editor and change line number `45` and replace the IP `127.0.0.1` with IP address of your current machine, this can be found by issuing `ifconfig` command in the terminal. Leave everything else including `http` protocol and `1337` port unchanged. Once you have made the changes, make sure the file is saved.
4. Open `/var/www/html/quiz/admin/js/audio-broadcast.js` in your favorite text editor and change line number `22` and replace the IP `192.168.1.15` with IP address of your current machine, this can be found by issuing `ifconfig` command in the terminal. Leave everything else including `http` protocol and `443` port unchanged. Once you have made the changes, make sure the file is saved.

## Setting up server

1. Install NodeJS in your Raspberry Pi, if it's not already installed, issue following commands in the given sequence
  * `sudo apt-get update`
  * `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
  * `sudo apt-get install -y nodejs`
2. Copy the `/tmp/prasna/server` directory to your home directory by issuing `cp -r /tmp/prasna/server ~/quizServer`
3. Change directory in terminal to this directory, by issuing `cd ~/quizServer` in terminal.
4. Install the dependency of the server by issuing `npm install` command, internet connection is necessary for this step. The server is ready after this step.

# Launching

## Starting the server
1. Change directory to `quizServer` directory by issuing `cd ~/quizServer` in terminal.
2. Start the server by issuing `sudo node app.js` command in terminal.
3. Minimize the terminal so that the server keeps running in background inside the terminal.

## Accessing the quiz webpage

1. First launch the Quiz admin dashboard by visiting `http://xxx.xxx.xxx.xxx/quiz/admin` and entering default password `123`. After that allow mic permission.
2. In client devices open Quiz client webpage by visiting `http://xxx.xxx.xxx.xxx/quiz` in any modern web-browser. Client can join the Quiz by entering their name and age and clicking Join button.

Replae `xxx.xxx.xxx.xxx` with the IP of the machine where Nginx and quiz are setup. The accessing device, and the Nginx, the Conference server and the Quiz server - should be all part of same network.
