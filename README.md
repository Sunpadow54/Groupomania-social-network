# Groupomania

## *Projet de formation n°7 du parcours Développeur Web - Openclassrooms*
### Créez un réseau social d’entreprise.

-----------------

## Mission

Construire un réseau social interne pour l'entreprise *Groupomania*.

* Personnaliser le contenu envoyé à un client web.
* Authentifier un utilisateur et maintenir sa session.
* Gérer un stockage de données à l'aide de SQL.
* Implémenter un stockage de données sécurisé en utilisant SQL.

***

## :wrench: Prérequis

### 1. Installation

node version 16.7.0

dans les deux dossiers pour une installation rapide :
- front : <kbd> :file_folder: groupomania-social </kbd>
- back :
    * (version mysql) :arrow_right: <kbd> :file_folder: backend-mysql </kbd>
    * (version postgresql) :arrow_right: <kbd> :file_folder: backend-postgresql </kbd>


```
npm install
```

### 2. Créer la base de donnée mysql

pour une base de donnée vide utilisez : [mysql empty dump](/backend-mysql/config/create-db-sample.sql)

pour visualiser avec des exemples : [mysql with sample dump](/backend-mysql/config/create-db-sample.sql)

### 3. Paramétrer dotenv

Créer un fichier <kbd> :page_facing_up: .env </kbd> dans le dossier <kbd> :file_folder: backend </kbd> & Changer les variables d’environnement

[See the sample](/backend-mysql/.env_sample)

```
PORT=YOUR_PORT_HERE

DB_HOST=YOUR_HOST_HERE
DB_NAME=YOUR_DB_USERNAME_HERE
DB_USER=YOUR_DB_USERNAME_HERE
DB_PASS=YOUR_DB_PASWWORD_HERE

TOKEN_KEY=YOUR_SECRET_JWTOKEN_KEY_HERE

EMAIL_CRYPTO_KEY=SECRET_22_LENGTH_KEY
```

### 3. Lancer le projet

Dans le dossier <kbd> :file_folder: frontend </kbd>
- Pour avoir accès au serveur de développement : run `npm serve` (Rendez-vous sur http://localhost:8080/)

Dans le dossier <kbd> :file_folder: backend </kbd>
- Lancer le serveur : `node server` ou `npm start` ou `nodemon server` (si installé)

### 4. Accès Admin

la base de donnée créée contient deux users avec le rôle Admin
pour accéder à l'api en tant qu'admin :

:guard::one:
```
Email : admin1@email.com
Password : Ev5QZ@Wg5_RUBdtK
```
:guard::two:
```
Email : admin2@email.com
Password : a3qZ-4ef8rrCDFbb
```

(la modification des mots de passe n'est pas encore implémentée)

***

## :package: Made with

* Node Js 
    * Express
* Database : mySql || postgresql
* Vue 2
* Vutify


:file_folder: **frontend** :
* frameworks :  <kbd>**Vue 2.6.11**</kbd>
* dependencies : <kbd>**composition-api**</kbd> / <kbd>**vue-router**</kbd> / <kbd>**vuetify**</kbd> / <kbd>**vuex**</kbd> /

:file_folder: **backend** :
* frameworks :  <kbd>**Express**</kbd>
* packages : ( <kbd>**mysql**</kbd> || <kbd>**pg**</kbd> / <kbd>**pg-format**</kbd> ) / <kbd>**bcrypt**</kbd> / <kbd>**body-parser**</kbd> / <kbd>**jsonwebtoken**</kbd> / <kbd>**multer**</kbd> / <kbd>**helmet**</kbd> / <kbd>**hpp**</kbd> /<kbd>**express-rate-limit**</kbd> / <kbd>**express-validator**</kbd>
* modules: <kbd>**dotenv**</kbd> / <kbd>**crypto-js**</kbd>

## Auteur

Sunpadow - elsa dessarps - 2021
