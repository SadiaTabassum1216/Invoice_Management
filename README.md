# How To Setup Back End 
(This assumes that you have already extracted the zip file and have the 'frontend' and 'backend' folders ready to go.)

# Requirements:
    1. composer
    2. php 8.1 or higher
    3. Laravel 10.10 or higher
    
# Back End Tutorial 

1. Open you terminal and change directory in to the `backend` folder.  
2. run `cp .env.example .env`. This creates a new `.env` file in which you will configure the database for your project. 
3.  The `.env` file will have these lines: 
    `DB_CONNECTION=mysql`
    `DB_HOST=127.0.0.1`
    `DB_PORT=3306`
    `DB_DATABASE={{Your Database Name}}`
    `DB_USERNAME=root {{Your Database User Name}}`
    `DB_PASSWORD= {{Your Database Password}}`
You will have to add in the information accodingly. 

4. Run these commands to automatically update the dependencies:
`composer update`
`composer install`
`php artisan key:generate`
`php artisan jwt:secret`
`php artisan migrate`
`php artisan db:seed --class=AdminUserSeeder`

5. **To start the backend server, use:** `php artisan serve` 

6. Now your back end is ready. An admin user already exists now. The credentials are:
    `username: admin`
    `password: admin`
    Use these when you log in from the browser.

7. If you don't want to have that, you can manually insert an admin into the database. **Remember:user with id 1 is considered an admin**. 
8. To drop the everything in the database and to start fresh, you can use the `php artisan migrate:fresh` command.
9. You will have to insert the UOMs manually in the database.  

