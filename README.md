# Best Value Calculator

A simple app to compare product sizes and promotions
to find the lowest cost per unit when shopping.

This app is built for personal use.

## How to run docker?
Use docker-compose.yml for update image
### Command

Up and build //put image name after --build for specific image
```sh
docker compose up --buil -d
```

Down //put image name after down for specific image
```sh
docker compose down
```

## How to use ngrok?
First of all download ngrok, you can download from microsoft store or from official website
After you succesfully download add auth token eg. 2example_ngroktokens3134sjsfreehmtier
### Command 

add token by using this command
```sh
ngrok config add-authtoken 2waixSBCEsFu1dgtnIfAirRHljC_4hiFtY76rCUijAdNCNjty
```

tell ngrok which port you want to forwart example
```sh
ngrok http 4173
```

note: you need to make sure ngrok exist before excute command, you can do that by trying "ngrok -help"
---

## Deployment
This project is deploy on https://render.com/

### What is render.com?
render.com is a free web deployment via github repo