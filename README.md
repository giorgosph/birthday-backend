# Birthday Web App Backend
## Development Testing Instructions
#### Steps
1. Navigate the root folder of the repository if not already there, click on the top right side at the "code" button, and copy the HTTPS url provided.
2. On your local PC navigate to the folder you want to add the repository and open the cmd.
3. Run:
    - git init
    - git clone <url>
    - git pull
    - npm i
4. Create a ".env" file and add the following options for your PostgreSQL database.
  - DATABASE_URL= (usually, 0)
  - DATABASE_HOST= (usually, "localhost")
  - DATABASE_USER= (usually, "postgres")
  - DATABASE_NAME= (the name you gave to your local db)
  - DATABASE_PASS= (the password you gave to your local db)
  - DATABASE_PORT= (usually, 5432)
Add another variable to be used for signing a jwt token:
  - SECRET= (anything you want, ex. secretkey)
5. Run:
  - npm run initDB (to initialise the database), if successful proceed else check your database details
  - npm run seedDB
  - npm run dev
Note: All of the seeded users have a password "12345678"

## Deployment Instructions 
#### Steps
1. Proceed with the hosting provider of your choice, in this case, Render.
2. Sign in (preferred with the GitHub account), and click on the right top side, "New" -> "Web Service".
3. Search for the backend repository you want to deploy and give permissions to the hosting provider.
4. If the repository is private to give permission click on the right side on "configure account" to navigate to the GitHub account and give the corresponding permissions.
5. Select "only selected repositories", then "select repositories" and select the desired repository, finally click "save".
6. At this point you should be able to connect to the repository and fill in the configurations to set up the website.
   Note: "Runtime" should be "Node", "Build Command" should be "yarn build", and "Start Command" should be "yarn start".
7. Click the "New" button -> PostgreSQL, fill in the details, and click on "Create" at the end of the page.
8. Scroll down to the "Connections" section and set up your environment variables with those details.
   Note: The name of the variables should correspond to the naming of the development's .env file (including SECRET).
9. To set the environment variables go to the backend configurations and proceed to the "Environment" tab.
