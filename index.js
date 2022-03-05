const express = require('express')
const app = express()
const port = 3000
const helmet = require('helmet')
const http = require('http')
    //use EJS for our templates
var ejs = require('ejs');
//required so we can read our template file
var fs = require('fs')
app.use(helmet())
app.use(express.json());
app.set("view engine", "ejs");
const { createTerminus } = require('@godaddy/terminus')
var result = { data: [] };


/*result.data.push({ lat: "14.98491557546565", lon: "50.00580615659027", alt: "622" });
result.data.push({ lat: "15.00085496305048", lon: "50.0099677008365", alt: "622" });*/

app.post('/', (req, res) => {
    result.data.push({ lat: req.body.lat, lon: req.body.lon, alt: req.body.alt });
    /*console.log(req.body.lat)
    console.log(req.body.lon)
    console.log(req.body.sat)
    console.log(req.body.alt)
    console.log(req.body.spd)
    console.log(req.body.acc)
    console.log(req.body.dir)
    console.log(req.body.time)
    console.log(req.body.batt)
    console.log(req.body.prov)
    console.log(req.body.dist)*/
    //console.log(result)
    res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    //read our template file
    fs.readFile('views/template.ejs', 'utf8', function(err, template) {
            //render our template file with the included varables to change
            var content = ejs.render(template, {
                result: result
            });
            //write the rendered template to the client
            res.write(content);
            res.end()
        })
        //res.render("template", { data: result })
        //res.end;
})

const server = http.createServer(app)

function onSignal() {
    console.log('server is starting cleanup')
        // start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck() {
    // checks if the system is healthy, like the db connection is live
    // resolves, if health, rejects if not
}

createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal
})

server.listen(3000)