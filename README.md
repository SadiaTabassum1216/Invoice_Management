# How To Setup Back End 
(This assumes that you have already extracted the zip file and have the 'frontend' and 'backend' folders ready to go.)

# Requirements:
    1. composer
    2. php 8.1 or higher
    3. Laravel 10.10 or higher
    4. Node.js
    5. Angular CLI

# Front End Tutorial

1. Download and extract the project zip file to your desired location.
2. Open a terminal or command prompt and navigate to the project folder: `cd path/to/your-repo-main`
3. Install the dependencies: `npm i`
4. **To start the backend server, use:**: `ng serve`
5. Open your web browser and visit http://localhost:4200 to see the application.
    
# Back End Tutorial 

1. Open your terminal and change the directory into the `backend` folder.  
2. run `cp .env.example .env`. This creates a new `.env` file in which you will configure the database for your project. 
3.  The `.env` file will have these lines: <br>
    `DB_CONNECTION=mysql` <br>
    `DB_HOST=127.0.0.1` <br>
    `DB_PORT=3306` <br>
    `DB_DATABASE={{Your Database Name}}` <br>
    `DB_USERNAME=root {{Your Database User Name}}`  <br>
    `DB_PASSWORD= {{Your Database Password}}` <br>
    
Make sure to replace `{{Your Database Name}}`, `{{Your Database User Name}}`, and `{{Your Database Password}}` with your actual database information.


5. Run these commands to automatically update the dependencies:<br>
    `composer update` <br>
    `composer install` <br>
    `php artisan key:generate` <br>
    `php artisan jwt:secret` <br>
    `php artisan migrate` <br>
    `php artisan db:seed --class=AdminUserSeeder` <br>

6. **To start the backend server, use:** `php artisan serve` 

7. Now your back end is ready. An admin user already exists now. The credentials are:
    `username: admin`
    `password: admin`
    You can use these when you log in from the browser.

8. If you don't want to have that, you can manually insert an admin into the database. **Remember: user with id 1 is considered an admin**. 
9. To drop everything in the database and start fresh, you can use the `php artisan migrate:fresh` command.
10. You will have to insert the UOMs manually in the database.  

