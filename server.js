'use strict'

let express = require('express')
let opn = require('opn')
var bodyParser = require('body-parser')
var sa = require('superagent')
var cookieParser = require('cookie-parser')
require('superagent-proxy')(sa)
let app = express()

app.set('view engine', 'pug')

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser())

app.get('/', (req, res) => {
	let client = {}
	if(req.cookies.oidc_ui_cookie)
		client = JSON.parse(req.cookies.oidc_ui_cookie)
	res.render('start', client) 
})

app.get('/oidc', (req, res) => {
	if(req.query.error) {
		res.send("<h1><center>ERROR: " + req.query.error + "</center></h1>")
		return;
	}

	let client = {}
	if(req.cookies.oidc_ui_cookie)
		client = JSON.parse(req.cookies.oidc_ui_cookie)

	res.render('token', { 
		data: {
			code: req.query.code, 
			state: req.query.state,
			client: client
		}
	})
})

app.listen(8082, () => {
  console.log('Startet OIDC-Server')
})