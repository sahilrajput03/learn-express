Notes:

## Rockinng nodemon with curl simply rocks!

Simply use one of the curl request like this:

```bash
./watchRequest req_users_GET.sh
./watchRequest req_users_POST.sh
# And leave them running so whenever you modify the request or restart the server after making changes it'll send the request after 1 second as set in the watchRequest file. Yikes!

# Below works as well:
nodemon --delay 1000ms -e sh -x ./req_users_PUT.sh
# Nodemon TIP: `--delay` can be used like `-d` as well.
```

**Happy node-hot-api-testing!!**

### Also you can :

- Installing file as dependency: https://github.com/sahilrajput03/sahilrajput03/blob/master/README.md#install-file-as-depencdency-in-nodejs

- Live Server Web Extension (Good for only get requests): Web based auto-request makes sense for only get requests as browser makes get request by default. For learning the Live Server Web extension settings, find [here](https://github.com/sahilrajput03/learning-php). NOTE(IMPORTANT): You need to refresh the page for ONCE yourself so that Live Server Web extension gets updated.
