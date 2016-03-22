# Build web server and development interface based on node and MySQL

### Clone project
    git clone https://github.com/xudao520/node-serve.git;
    
### Run project
    cd node-serve;
    npm install;
    node app;

### Options
1. Before node app command need install mysql .

        npm install mysql;

2. Need to build a database and a new user table (test fields are ID, username, sex) .
		
		Find file dataBase.js(the directory is ./routes/dataBase.js) and open this js file;

		var pool = mysql.createPool({
		    host: '',//127.0.0.0
		    user: '',//root
		    password: '',//123456
		    database: '',//test
		    port: 3306 //default port is 3306
		});

		Just complete the parameters according to the rules.

### End
	
	When you finish the above tips and run the server can open the browser input (test example: http://localhost:3000/user/getUser) you will find everything OK.


