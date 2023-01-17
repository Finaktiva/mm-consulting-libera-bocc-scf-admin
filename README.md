# Libera Portal

## Project Structure
This project is builded on 3 main apps
  - `Admin`
  - `Enterprise`
  - `Landing`

### Admin
All the content that applies for LIBERA_ADMIN users, this module contains 
user management.

### Enterprise
Here lives all business implementation, and all processes, invoice negotiation, funding,
provider vinculation etc.

### Landing 
Corresponds to login page and module selector

## File configuration

`environment.ts` contain the settings of the environments this file is under libs/environment and contains all properties required for connect all three apps to Backend.

## Setting up for serve in local
As we mention before, this project is made by 3 main apps, we can get all three running on
different ports.

``` bash
$ npm run start
```
This serve `Landing` app listening on port **4200**

``` bash 
$ npm run start:enterprise
```
This serve `Admin` app listening on port **4201**

``` bash 
$ npm run start:enterprise
```
This serve `Enterprise` app listening on port **4202**

We recomend the use of 
 - [LocalStorage Manager](https://chrome.google.com/webstore/detail/localstorage-manager/fkhoimdhngkiicbjobkinobjkoefhkap) Chrome's Extension
 - [Storage Area Explorer](https://chrome.google.com/webstore/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb) Chrome's Extension

This extensions are useful to work with cognito tokens for work locally, with this we can 
copy the local storage from the platform (on deployed web) and past in our local application.

## Build

This project has with scripts to build all three apps for different environments like:

``` bash 
$ npm run build:admin:dev
$ npm run build:enterprise:dev
$ npm run build:landing:dev
```
for build all apps ready to be deployed.