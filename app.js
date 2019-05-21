const wayscript=require('wayscript');
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const jsonParser = bodyParser.json();

const app = express();

app.use( "/public", express.static( __dirname + "/public" ) );
app.use( "/static", express.static( __dirname + "/static" ) )

app.get( '/', function( req, res ) {  
    res.sendFile( __dirname + '/templates/index.html' );
} );

app.post( '/wayscript_ajax', jsonParser, function( req, res ) {  
    
    //THIS MUST ALWAYS BE KEPT SERVER SIDE, NEVER EVER EMIT TO CLIENT
    //GET YOUR KEY AT https://wayscript.com/user/<your_username>
    const prog_id = 0;
    const secret_key = '';

    if ( !secret_key.length )                       throw( 'Error: Must enter a valid api key in app.js' );
    if ( !prog_id || !Number.isInteger( prog_id ) ) throw( 'Error: Must enter a valid program id in app.js' );

    wayscript.apiKey = secret_key;

    const variables = req.body[ 0 ].split( ',' );
    console.log( variables );
    wayscript.runProgram( prog_id, variables )
             .onSuccess( function( responseText ) {
                 console.log( responseText );
                res.send( JSON.parse( responseText ) );
             }).onError( function ( responseText ) {
                console.log( 'error' );
                res.send( responseText );
             });
} );

const server = app.listen( 8081, function () {
    console.log( "WayScript Node Example Running At http://127.0.0.1:8081" );
} );
