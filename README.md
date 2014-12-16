#Orient

**Orient** is a Github label labeller. It's a cli tool for creating and updating Github issue label names and colours. Create a json list of issue labels and their respective colours and pass it along with your Github creds to **Orient** to see it do it's thing.

[![Build Status](https://travis-ci.org/chasevida/orient.svg)](https://travis-ci.org/chasevida/orient)
[![Coverage Status](https://img.shields.io/coveralls/chasevida/statica.svg)](https://coveralls.io/r/chasevida/orient)

## Installation

Make sure you have [node.js](http://nodejs.org/) installed, then just run `npm install orient -g`.

## Command Line
**Orient** requires the following flag options be passed along:

*	`-f` - a file path for `labels.json` list
*	`-u` - your Github account username
*	`-p` - your Github account password
*	`-r` - your Github repository name i.e `username/repname`


## Example

Use it straight from the command line:

	$ orient -f labels.json -u myusername -p mypassword -r username/reponame

## Example Labels
To view some styling examples download the package and open the `examples` folder in your browser. *Note that you will need to run it through localhost and not the file system as it makes use of a little ajax.*