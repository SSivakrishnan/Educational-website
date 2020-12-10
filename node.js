


const express = require('express');
const app=express();
var  server = require('http').createServer(app);
//const path = require('path');
const ejs = require('ejs');
app.use(express.static(__dirname+'/static'));
app.set("view engine",'ejs');
app.use(express.static('public'));
/*============================================================================================*/
/*bodyParser = require('body-parser');
const mysql = require('mysql');
var db = mysql.createConnection({host:'localhost',user:'root',password:'',database:'classroom'});
db.connect(function(e) {
    if(e){
        throw e;
    }
    console.log('mysql connected');
});
//create database
app.get('/createdb',(req,res)=>{
 let sql='CREATE DATABASE classroom';
    db.query(sql,(err,result)=>{
        console.log(result);
        res.send('Database created....')
    });
}); */


app.get('/start',(req,res)=>{
res.render('start');
});

app.get('/loginstudent',(req,res)=>{
res.render('loginstud');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/signin',(req,res)=>{
    res.render('signin');
});

app.get('/loginstaff',(req,res)=>{
    res.render('loginstaff')}
    );
app.get('/loginadmin',(req,res)=>{
        res.render('loginadmin')}
        );

 app.get('/student',(req,res)=>{
            res.render('student')}
            );
            
app.get('/student_java',(req,res)=>{
    res.render('student_java')}
    );


app.get('/notes_java',(req,res)=>{
    res.render('notes_java')
});

app.get('/java_exam',(req,res)=>{
    res.render('java_exam');
});
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/signin',(req,res)=>{
    res.render('signin');
});

app.get('/home',(req,res)=>{
    res.render('home');
});
app.get('/notes_python',(req,res)=>{
    res.render('notes_python');
});
app.get('/python_exam',(req,res)=>{
    res.render('python_exam');
});

app.get('/student_python',(req,res)=>{
    res.render('student_python');
});
app.get('/staff',(req,res)=>{
    res.render('staff');
});
app.get('/staff_notes',(req,res)=>{
    res.render('staff_notes');
});
app.get('/',(req,res)=>{
    res.render('first');
});
/*=========================================================================*/ 
//CHAT
app.get('/chat',(req,res)=>{
    res.render('index');
});
server=app.listen(3000);

const io=require("socket.io")(server)
 io.on("connection",(socket)=>{
     console.log('now user connected');

     socket.username="Somthing_Wrong"
     socket.on("change_username",(data) =>{
         socket.username = data.username
         console.log(data.username)
     })

     socket.on('new_message',(data)=>{
         io.sockets.emit("new_message",{
             message : data.message,username:socket.username
         })
     })
 })





/*==================================================================================*/
  //LOGIN
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');;

var countAd=0;
var count = 0;

var connection = mysql.createConnection({																	
  host: "localhost",
  user: "root",
  password: "",
  database: "users"
});

connection.connect(function(err) {																			
			if (err) throw err;
			console.log('Connected to database!!')
});

app.use(bodyParser());

/*app.get('/',function(request,response){														 						response.sendFile('home.html',{root : __dirname});
	console.log("Requested homepage via GET");
});*/



app.get('/login' , function(request , response){
	response.sendFile('login',{root : __dirname});
	console.log("Requested login page via GET");
});

app.get('/SignIn' , function(request , response){
	response.sendFile('SignIn',{root : __dirname});
	console.log("Requested sign in page via GET");
});



app.post('/loginCheck' , function(request,response){
	console.log("Login request");
	console.log(request.body.username);
	console.log(request.body.password);
	var resLogin = function (request){
						var qs = "SELECT COUNT(*) as Records_found FROM user WHERE username=\"" + request.body.username + "\" and password = \"" + request.body.password + "\"";
						var res = connection.query(qs, function (err, result) 
						{
							          if (err)
										{throw err;}
										console.log(result);
										countAd = result[0]['Records_found'];				
										console.log('count: ' + countAd);	
                                        if (countAd=="1"){response.writeHead(200 , {"Content-type":"text/html"});
                                        response.write('<h1>logged in</h1><br>');}
										else{response.writeHead(200 , {"Content-type":"text/html"});response.write('<h1>log in failed</h1><br>');}
										response.end();
														});		
						};
	resLogin(request);
	
	
	
});



app.post('/signinCheck' , function(request,response){
	console.log("New signin request");
	console.log(request.body.name);
	console.log(request.body.Contact);
	console.log(request.body.username);
	console.log(request.body.password);
	
	var resLogin = function (request){
						var qs = "SELECT COUNT(*) as Records_found FROM user WHERE username=\"" + request.body.username + "\"";
						var res = connection.query(qs, function (err, result) {
if (err)
{throw err;}
 console.log(result)
 count = result[0]['Records_found'];				
console.log('count: ' + count);	
 if (count=="1"){response.writeHead(200 , {"Content-type":"text/ejs"});
 response.end('<h1>Username already in use</h1><br>');}
 else{ qs = "insert into user values('" + request.body.name + "','" +  request.body.Contact + "','" + request.body.username + "'," + request.body.password + ")";			
res = connection.query(qs, function (err, result) {
																																			if (err)
																																				{throw err;}
																																			console.log('Added a new user');
																																			response.end("<h1>you are successfully registered!!</h1>");																				
									});
																					}
																				});

								};													   
resLogin(request);
	});



/*app.listen(9876 , function(){																										
	console.log('Listening at port 1337');
});*/