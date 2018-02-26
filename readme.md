# OBS-TRACKERNETWORK

This provides OBS overlay of data from The Tracker Network

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5ZZF3RAC2HASS)

### ENDPOINTS

#### FORTNITE

- `/overlay/fortnite/{platform}/{epic-name}/[mode]?[fields={field-list}]`

![Sample](https://i.imgur.com/7ROVfYY.png)

##### PLATFORMS

- `pc` : PC
- `xbl`: XBOX
- `psn`: PLAYSTATION

##### MODES

- `all` : Displays `All Time` Stats (Default)
- `solo`: Displays `Solo` Stats
- `duo` : Displays `Duo` Stats
- `squad`: Displays `Squad` Stats

##### FIELDS

This should be a comma (`,`), pipe (`|`), or semi-colon (`;`), separated list
- `all`
	- `*` : SPECIAL ALL FIELDS (Default)
	- `avgsurvivaltime` : Avg Survival Time
	- `timeplayed` : Time Played
	- `kpm` : Kills Per Min
	- `kd` : Kill / Death Ratio
	- `kills` : Total Kills
	- `wins` : Total Wins
	- `wins_` : Win Percentage
	- `matches` : Matches Played
	- `score` : Score (Tracker Network Score?)
	- `top25_season` : Total Top 25 Current Season
	- `top12_season` : Total Top 12 Current Season
	- `top6_season` : Total Top 6 Current Season
	- `top5_season` : Total Top 5 Current Season
	- `top3_season` : Total Top 3 Current Season
	- `top25` : Total Top 25
	- `top12` : Total Top 12
	- `top6` : Total Top 6
	- `top5` : Total Top 5
	- `top3` : Total Top 3
- `solo`
- `duo`
- `squad`
### ENVIRONMENT VARIABLES

#### FORTNITE
- `TN_FORTNITE_API_KEY` : Fortnite Tracker API Key [See documentation to create API Key](https://fortnitetracker.com/site-api)
- `TN_FORTNITE_POLL_DELAY` : Delay in seconds to poll for stats. (Default 60)

---

### RUN IN HEROKU

- Click the `Deploy to Heroku` link below
- Create a heroku account or login
- Fill out the form with the information requested
- Use the `herokuapp.com` url in OBS as a `Browser Source` using the endpoints above.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)



### RUN IN DOCKER

The conainer exposes port 3000. `-P` will map the port on the host.

```shell
$ docker build --pull --tag camalot/obs-trackernetwork -f "./Dockerfile" .
$ docker run -d -P \
	--restart unless-stopped \
	--name "obs-trackernetwork" \
	-e TN_FORTNITE_API_KEY="${TN_FORTNITE_API_KEY}" \
	-e TN_FORTNITE_POLL_DELAY="${TN_FORTNITE_POLL_DELAY}" \
	-t camalot/obs-trackernetwork
```

### RUN IN NODE

- Create a `.env` file in the `obs-trackernetwork` directory. 
- Add the following:
```
TN_FORTNITE_API_KEY=<you-fortnitetracker-api-key>
TN_FORTNITE_POLL_DELAY=60
```
- Open shell and run the following:
```shell
$ npm install
$ npm start
```
- Open a browser to http://localhost:3000/overlay/
