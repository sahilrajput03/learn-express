# I AM NOT USING ANY CUSTOM BUILD IMAGE FOR DEVELOPMENT COZ I CAN CUSTOMIZE ALL THIS SIMPLY VIA `docerk run` command line parameters.
# FROM node:12

# Using workdir is optional coz our directory mounting work irrespective of this setting.
# WORKDIR /mydir

# LEARN: Expose is nothing but the -p (alias of --expose) we use in the `docker run` command line api.
# EXPOSE 9229
# EXPOSE 8086

# LEARN: For development environment its best to mount our app's directory to the container instead of copying files in the image itself.
# COPY package*.json ./
# RUN npm i
# COPY . .

# LEARN: I am preferring to use all config in the ./startContainerAndGetTerminal.sh file like the mount-bind and thus including the run command i.e., `bash` along with the initial path makes much more sese to me. ~Sahil
# CMD bash

###### RUNNING CONTAINER AND GET A TERMINAL TO THE CONTAINER:
# FYI: You can use ./startContainerAndGetTerminal.sh script in this same folder to do below command as well.
