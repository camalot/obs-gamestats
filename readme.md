# OBS-TRACKERNETWORK

This provides OBS overlay of data from The Tracker Network

### ENDPOINTS

#### FORTNITE

- /api/fortnite/{platform}/{epic-name}

### ENVIRONMENT VARIABLES

#### FORTNITE
- `TN_FORTNITE_API_KEY` : Fortnite Tracker API Key [See documentation to create API Key](https://fortnitetracker.com/site-api)
- `TN_FORTNITE_POLL_DELAY` : Delay in seconds to poll for stats. (Default 60)

---

### RUN IN HEROKU

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### RUN IN DOCKER

The conainer exposes port 3000. `-P` will map the port on the host.

```shell
$ docker build --pull --tag camalot/obs-trackernetwork -f "./Dockerfile" .
$ docker run -d -P \
	--restart unless-stopped \
	--name "obs-octoprint" \
	-e TN_FORTNITE_API_KEY="${TN_FORTNITE_API_KEY}" \
	-e TN_FORTNITE_POLL_DELAY="${TN_FORTNITE_POLL_DELAY}" \
	-t camalot/obs-trackernetwork
```

### RUN IN NODE

- Create a `.env` file in the `obs-trackernetwork` directory. 
- Add the following:
```

```
- Open shell and run the following:
```shell
$ npm install
$ npm start
```
- Open a browser to http://localhost:3000/overlay/
