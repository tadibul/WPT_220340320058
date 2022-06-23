
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'mysql',
	port:3306
});
console.log("connection success!")








app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not


/**
var result;

app.post('/poc1', function (req, res) {
	
		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
    	var xyz ={ v1:37, v2:35};
        res.send(xyz);
    });


	
app.get('/poc2', function (req, res) {
    
	
        console.log("reading input " + req.query.xyz);
		
    	var xyz ={ v1:37, v2:35};

		res.send(xyz);

		});


	 */

app.get('/getbook',function(req,res){

	let input=req.query.bookid;
	console.log("input is:::::"+input);

	let output= {status:false, bookdetails: { bookid:100, bookname:"abcd", bookprice:675}};

	connection.query("select * from book where bookid=?",
	 [input],
	  (err, res1) => {
        if (err) {
			console.log("trouble " + err);
			
        } else if(res1.length>0) {
			console.log("rows affected!")

			output.bookdetails=res1[0];
			output.status=true;
			console.log("success::" + output.status);
			console.log(output.bookdetails.bookname);
        }

        res.send(output);
    });


});




app.get('/update',function(req,res){

	let input={bookid:req.query.bookid,
	bookname:req.query.bookname,
		bookprice:req.query.bookprice};

	console.log("input is:::::"+input);

	let output= {status:false};

	connection.query('update book set bookprice = ?  where bookid = ?',
	 [input.bookprice , input.bookid],
	  (err, res1) => {
        if (err) {
			console.log("trouble " + err);
			
        } else if(res1.affectedRows>0) {
			console.log("rows affected!")

			output.status=true;
        }

        res.send(output);
    });


});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});