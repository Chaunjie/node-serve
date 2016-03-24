# Build web server and development interface based on node and MySQL

### Clone 
    git clone https://github.com/xudao520/node-serve.git;
    
### Run 
    cd node-serve;
    npm install;
    node app;

### Options
1. Before node app command need install mysql .

        npm install mysql;
        
2. You can use sql(the directory is ./sql/example.sql) to build database and tables(if you use the sql file please skip option 3)

3. Need to build a database and a new user table (test fields are id, username, sex) .
		
		Find file dataBase.js(the directory is ./routes/dataBase.js) and open this js file;

		var pool = mysql.createPool({
		    host: '',//default host is 127.0.0.1
		    user: '',//default user is root
		    password: '',//default pwd is 123456
		    database: '',//default database is example
		    port: 3306 //default port is 3306
		});

		Just complete the parameters according to the rules.

### End
	
	When you finish the above tips and run the server can open the browser 
	input (test example: http://localhost:3000/user/getUser) you will find everything is OK.


