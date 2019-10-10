# **Lang-Mate**

## **Prototype :** [Our Figma Prototype](https://figma.com/proto/rk0VqlhYwnnQ3rSv6297cV/Language-Exchange?node-id=0%3A1&scaling=scale-down)

![Home Page](https://serving.photos.photobox.com/53781967c16173909d6a2d8b2453e6c6b643b9712d22306b2b48d011cbb7f2e2e0ce604d.jpg)

## **Summary :**
The application is about learning new languages by teaching each other, also, it allows you to start a chat with any user his native language is the language that you want to learn and vice versa.

## **Problem :**

People can't find a native speaker to practice a language with.

## **Solution :**

The application gives the users the ability to make match with other languages native speakers to practice their languages.

## **User Journey :**

The user can add information about himself, then views all people who match his interests to enable the user chats people to practice language, searches for other people and filter people by language and interests. Each user has his own profile and can edit his information.

## How?

### Design Sprint
* [x] Ideation
* [x] Whiteboarding
* [x] Scale Down the Idea
* [x] Prototype

### Build Sprint
* [x] Planning and Discuss the issues we want to build
* [x] Create the issues on Github
* [x] Build

## **User Stories :**
We focused on a specific user story to achieve your goals in this sprint.

* [x] As a user, I can sign up to have a new account.
* [x] As a user, I can sign in so that I can access the features.
* [x] As a user, I can add my information such as my email, username and password.
* [x] As a user, I can create a profile which contains the native language, the language want to practice and my interests so that every person can view it.
* [x] As a user, I want to view all available people who I can chat them and match my search criteria so that I have the ability to practice language.
* [x] As a user, I can view other's profiles so I can view their information.
* [ ] As a user, I want to chat others for practicing the language.

## **Database Schema :**

![alt text](https://cdn.discordapp.com/attachments/607975266597339186/625229320750759966/unknown.png)

## **Set up the app locally :**

- Clone this repo: 
    ```javascript
    git clone https://github.com/FadiAlamassi/lang-mate.git
    ```
- Run in the terminal **npm run project-i** to install the packages that requried for the app.
- **Database Setup**:
  
    In terminal type psql or pgcli if installed. Within psql/pcli enter the following commands:
  ```javascript 
  CREATE DATABASE [db_name];  
  CREATE USER [user_name] WITH PASSWORD ['password'];
  ```
  **Now you should create another database for the test**


   Next initialize the databases using dbbuild.sql file in pgcli run :

   ```javascript 
   pgcli postgres://[user_name]:[password]@localhost:5432/[db_name]
   \i <path_to_dbbuild.sql>
   ```

## **Environment Variables :**

   Now you should create file config.env in the root folder, then set the database url in your config.env as follows (setting the values in square brackets to the values you defined in the steps above):

   ```javascript 
   DEV_DB_URL=postgres://[user_name]:[password]@localhost:5432/[db_name]
   TEST_DB_URL=postgres://[test_user_name]:[password]@localhost:5432/[test_db_name]
   ```

   Now you should set secret key inside the file:
  ```javascript
  KEY=[your-secret-key]
  ```
   Now you should have the following in config.env file:

```javascript
DEV_DB_URL
TEST_DB_URL
KEY
```
  ## **Start the app :**
  In your terminal write:

  ```javascript
  npm run dev
  ```
  then the app will open automatically in the browser after few seconds on [localhost]('http://localhost:3000')



## **Tech-Stack :**

- Reactjs
- Expressjs
- Postgres
- HTML
- CSS

## How to Contribute
1. Clone repo
2. Create a new branch: $ git checkout -b name_for_new_branch.
3. Make changes and test
4. Submit Pull Request with comprehensive description of changes

# Contributers: ✨
Thanks goes to these wonderful people
- Fadi Alamassi
- Hashem Taha
- Fares El Helou
- Mossa Dababesh