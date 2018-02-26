# OBS-TRACKERNETWORK

This provides OBS overlay of data from The Tracker Network

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5ZZF3RAC2HASS)


### LICENSE

[Apache 2.0](https://github.com/camalot/obs-trackernetwork/blob/develop/LICENSE.md)

Please add attribution to your Stream Information Section (if supported):

> [OBS-TrackerNetwork](https://github.com/camalot/obs-trackernetwork) by [DarthMinos](https://www.twitch.tv/darthminos)

Markdown:
```markdown
[OBS-TrackerNetwork](https://github.com/camalot/obs-trackernetwork) by [DarthMinos](https://www.twitch.tv/darthminos)
```

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
	- `avgsurvivaltime_` : Avg Survival Time % 
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
	- `*` : SPECIAL ALL FIELDS (Default)
	- `avgmatchtime`: Avg Match Time
	- `avgmatchtime_`: Avg Match Time %
	- `kd` : Kill / Death Ratio
	- `kd_` : Kill / Death Ratio %
	- `kills` : Kills
	- `kills_` : Kills %
	- `kpg` : Kills Per Match
	- `kpg_` : Kills Per Match %
	- `kpm` : Kills Per Minute
	- `kpm_` : Kills Per Minute %
	- `matches` : Matches
	- `matches_` : Matches %
	- `score` : Score (Tracker Network Score?)
	- `score_` : Score % (Tracker Network Score?)
	- `scorepermatch` : Score Per Match
	- `scorepermatch_` : Score Per Match %
	- `scoreperminute` : Score Per Minute
	- `scoreperminute_` : Score Per Minute %
	- `timeplayed` : Time Played
	- `timeplayed_` : Time Played %
	- `top25` : Top 25
	- `top25_` : Top 25 %
	- `top12` : Top 12
	- `top12_` : Top 12 %
	- `top10` : Top 10
	- `top10_` : Top 10 %
	- `top6` : Top 6
	- `top6_` : Top 6 %
	- `top5` : Top 5
	- `top5_` : Top 5 %
	- `top3` : Top 3
	- `top3_` : Top 3 %
	- `wins` : Wins
	- `wins_` : Wins %
	- `trnrating` : TRN Rating
	- `trnrating_` : TRN Rating %
- `duo`
	- `*` : SPECIAL ALL FIELDS (Default)
	- `avgmatchtime`: Avg Match Time
	- `avgmatchtime_`: Avg Match Time %
	- `kd` : Kill / Death Ratio
	- `kd_` : Kill / Death Ratio %
	- `kills` : Kills
	- `kills_` : Kills %
	- `kpg` : Kills Per Match
	- `kpg_` : Kills Per Match %
	- `kpm` : Kills Per Minute
	- `kpm_` : Kills Per Minute %
	- `matches` : Matches
	- `matches_` : Matches %
	- `score` : Score (Tracker Network Score?)
	- `score_` : Score % (Tracker Network Score?)
	- `scorepermatch` : Score Per Match
	- `scorepermatch_` : Score Per Match %
	- `scoreperminute` : Score Per Minute
	- `scoreperminute_` : Score Per Minute %
	- `timeplayed` : Time Played
	- `timeplayed_` : Time Played %
	- `top25` : Top 25
	- `top25_` : Top 25 %
	- `top12` : Top 12
	- `top12_` : Top 12 %
	- `top10` : Top 10
	- `top10_` : Top 10 %
	- `top6` : Top 6
	- `top6_` : Top 6 %
	- `top5` : Top 5
	- `top5_` : Top 5 %
	- `top3` : Top 3
	- `top3_` : Top 3 %
	- `wins` : Wins
	- `wins_` : Wins %
	- `trnrating` : TRN Rating
	- `trnrating_` : TRN Rating %
- `squad`
	- `*` : SPECIAL ALL FIELDS (Default)
	- `avgmatchtime`: Avg Match Time
	- `avgmatchtime_`: Avg Match Time %
	- `kd` : Kill / Death Ratio
	- `kd_` : Kill / Death Ratio %
	- `kills` : Kills
	- `kills_` : Kills %
	- `kpg` : Kills Per Match
	- `kpg_` : Kills Per Match %
	- `kpm` : Kills Per Minute
	- `kpm_` : Kills Per Minute %
	- `matches` : Matches
	- `matches_` : Matches %
	- `score` : Score (Tracker Network Score?)
	- `score_` : Score % (Tracker Network Score?)
	- `scorepermatch` : Score Per Match
	- `scorepermatch_` : Score Per Match %
	- `scoreperminute` : Score Per Minute
	- `scoreperminute_` : Score Per Minute %
	- `timeplayed` : Time Played
	- `timeplayed_` : Time Played %
	- `top25` : Top 25
	- `top25_` : Top 25 %
	- `top12` : Top 12
	- `top12_` : Top 12 %
	- `top10` : Top 10
	- `top10_` : Top 10 %
	- `top6` : Top 6
	- `top6_` : Top 6 %
	- `top5` : Top 5
	- `top5_` : Top 5 %
	- `top3` : Top 3
	- `top3_` : Top 3 %
	- `wins` : Wins
	- `wins_` : Wins %
	- `trnrating` : TRN Rating
	- `trnrating_` : TRN Rating %
### ENVIRONMENT VARIABLES

- `TN_POLL_DELAY` : Delay in seconds to poll for stats. (Default 60)

#### FORTNITE
- `TN_FORTNITE_API_KEY` : Fortnite Tracker API Key [See documentation to create API Key](https://fortnitetracker.com/site-api)

#### PUBG
- `TN_PUBG_API_KEY` : PUBG Tracker API Key [See documentation to create API Key](https://pubgtracker.com/site-api)


---

### RUN IN HEROKU

- Click the `Deploy to Heroku` link below
- Create a heroku account or login
- Fill out the form with the information requested
- Use the `herokuapp.com` url in OBS as a `Browser Source` using the endpoints above.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

After deploying, you can manage the app in Heroku to set up automatic deployments, and it will automatically deploy updates when the code is changed. 

[![Auto Deploy](https://i.imgur.com/nNb6oBOl.png)](https://i.imgur.com/nNb6oBO.png)

### RUN IN DOCKER

The conainer exposes port 3000. `-P` will map the port on the host.

```shell
$ docker build --pull --tag camalot/obs-trackernetwork -f "./Dockerfile" .
$ docker run -d -P \
	--restart unless-stopped \
	--name "obs-trackernetwork" \
	-e TN_FORTNITE_API_KEY="${TN_FORTNITE_API_KEY}" \
	-e TN_POLL_DELAY="${TN_FORTNITE_POLL_DELAY}" \
	-t camalot/obs-trackernetwork
```

### RUN IN NODE

- Create a `.env` file in the `obs-trackernetwork` directory. 
- Add the following:
```
TN_FORTNITE_API_KEY=<you-fortnitetracker-api-key>
TN_POLL_DELAY=60
```
- Open shell and run the following:
```shell
$ npm install
$ npm start
```
- Open a browser to http://localhost:3000/overlay/
