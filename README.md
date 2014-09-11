#Orient

**Orient** is a Github label labeller. It's a cli tool for creating and updating Github issue label names and colours. Create a json list of issue labels and their respective colours and pass it along with your Github creds to **Orient** to see it do it's thin.


**Please Note:** Your Github credentials are not stored anywhere by this tool and are only passed to Github in order to authorise calls to their api.

[![Build Status](https://travis-ci.org/chasevida/orient.svg)](https://travis-ci.org/chasevida/orient)
[![Coverage Status](https://coveralls.io/repos/chasevida/orient/badge.png)](https://coveralls.io/r/chasevida/orient)

## Command Line
**Orient** requires the following flag options be passed along:

*	`-f` - a file path for `labels.json` list
*	`-u` - your Github account username
*	`-p` - your Github account password
*	`-r` - your Github repository name i.e `username/repname`


## Example

Use it straight from the command line:

	$ orient -f labels.json -u myusername -p mypassword -r username/reponame
	
	
## TODO
This is still in early development and I've just broken a significant amount of tests that need refactoring. Some of the tests are a bit vague and need more attention too. But it is working.