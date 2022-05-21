#!/bin/bash
alias dk=docker
shopt -s expand_aliases

# LEARN: The container would be stopped as soon as you exit the container's shell with below command as it is.

# LEARN: The reason I am using this as variable coz it would be much conveninent to copy this file to some other project and run this file to start the development mode in seconds without additional configuration needed (FYI: Do use correct image with appropriate node version which suits your application needs though). Yo!
app_path=mydir
IMAGE=node:12

# LEARN : You may choose to mount any directory instead of /mydir, i.e., /somedir and somedir will be automicatically created when the container is started. YO!
dk run -it -v $(pwd):/$app_path -p 8086:8086 -p 9229:9229 $IMAGE sh -c "cd /$app_path; bash"

#LEARN: Port 9229 is for sharing the debugging port. Port 9229 is used default by nodejs, but we can change this by passing debugPortNumber via `nodemon` or `node` cli parameters easily and configure vscode(changing port number in `launch.json` configuration in `port` property) to work with that as well very easily.

# OLD:NOTES:Older command which I was using earlier for custom build image which was completely STUPID!
# dk run -it -v $(pwd):/$app_path -p 8086:8086 -p 9229:9229 debug1_img sh -c "cd /$app_path; bash"
