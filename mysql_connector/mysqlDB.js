const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Vikas1.",
  database: "chatify"
});

connection.connect(err => {
  if (err) {
    return err;
  }
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("go to localhost:3307/users to see users,  localhost:3307/users/add?email=___&password=___ to add user");
});
app.get("/users/add", (req, res) => {
  const { name, email, password } = req.query;
  const INSERT_NEW_USER_QUERY = `INSERT INTO users (name,email,password) values('${name}','${email}','${password}')`;
  connection.query(INSERT_NEW_USER_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added user");
    }
  });
});

app.get("/setNewSessionId", (req, res) => {
  const { email,name } = req.query;
  const INSERT_NEW_SESSION_QUERY = `INSERT INTO sessions (email,name) values('${email}','${name}')`;
  connection.query(INSERT_NEW_SESSION_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully CREATED SESSION");
    }
  });
});
app.get("/getSessionId", (req, res) => {
	const { email } = req.query;
	const SELECT_SESSION_QUERY = `SELECT id FROM sessions WHERE email='${email}' LIMIT 1`;
	connection.query(SELECT_SESSION_QUERY, (err, results) => {
    	if (err) {
      	  return res.send(err);
    	} else {
      	  return res.json({
        	data: results
      	});
    	}
  	});
});
app.get("/getSessionData", (req, res) => {
	const { id } = req.query;
	const SELECT_SESSION_QUERY = `SELECT user_id,name,email FROM users WHERE email IN (SELECT email FROM sessions WHERE id='${id}')`;
	connection.query(SELECT_SESSION_QUERY, (err, results) => {
    	if (err) {
      	return res.send(err);
    	} else {
      		return res.json({
        		data: results
      		});
    	}
  	});
});
app.get("/users", (req, res) => {
  const SELECT_ALL_USERS_QUERY = "SELECT * FROM users";
  connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});
app.get("/passwordFetcher", (req, res) => {
  const { email } = req.query;
  const SELECT_PASSWORD_QUERY = `select * from users where email='${email}'`;
  connection.query(SELECT_PASSWORD_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });

});
app.get("/friendListFetcher", (req, res) => {
  const { email } = req.query;
  const SELECT_PASSWORD_QUERY = `select * from friends where user_email=${email}`;
  connection.query(SELECT_PASSWORD_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

app.get("/fourms/add", (req, res) => {
  const { name} = req.query;
  const INSERT_NEW_FOURMS_QUERY = `INSERT INTO FOURMS (name) values('${name}')`;
  connection.query(INSERT_NEW_FOURMS_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added fourm");
    }
  });
});
app.get("/fourms/posts/add", (req, res) => {
  const { email,data} = req.query;
  //POSTING INTO POST TABLE TO KEEP RECORD OF EVERY POST
  const INSERT_NEW_POST_QUERY = `INSERT INTO POSTS (email,data) values('${email}','${data}')`;
  connection.query(INSERT_NEW_POST_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("successfully added fourm");
    }
  });
});
app.get("/feedListFetcher", (req, res) => {
  const { email } = req.query;
  const SELECT_FEED_QUERY = `select * from posts where email in (select email from friends where user_email='${email}')`;
  connection.query(SELECT_FEED_QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: result
      });
    }
  });
});

app.listen(3307, () => {
  console.log("Chatify database server listening on port 3307");
});