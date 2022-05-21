# README

The example is contrived(i.e., the project has only one script i.e., `npm run debug`) to make debugging example with docker pretty straight forward. Although all your older debug scripts with nodemon should work as it and don't need to have a dockerfile at all, yo!

This is super amazing demonstration that you can maintain a image just for development purpose and keep using that for development only for all the projects coz the image doesn't share any project's code as its only on your hardisk only (its never put in the image but the directory is only mounted in the container whenever you run the container). Phenomenal development experiece for people like me who don't want to clutter their host pc for every single version of nodejs for any legacy or different build say frontend and backends that run on different nodejs environment. ~Sahil

Source: 

- https://code.visualstudio.com/docs/remote/containers

- https://code.visualstudio.com/docs/containers/debug-common

- https://blog.risingstack.com/how-to-debug-a-node-js-app-in-a-docker-container/

- https://www.section.io/engineering-education/how-to-debug-a-nodejs-application-running-in-a-docker-container/
