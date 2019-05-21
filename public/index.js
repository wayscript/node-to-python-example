$( document ).ready(function() {
    $( '#button' ).off( 'click' );
    $( '#button' ).click( function() {
        $( '#result' ).empty();
        $( '#result' ).append( '<li>Running....</li>'  );

    	var submitted_name = $( '#name_input' ).val();

    	if ( !submitted_name.length ) return;

    	var name = [ submitted_name ];

    	$.ajax( { url: '/wayscript_ajax',
    			  data: JSON.stringify( name ),
    			  type: 'POST',
    			  contentType: "application/json",
    			  dataType:'json',
    			  'Content-Type': 'application/x-www-form-urlencoded',
    			  json: true, 	
    		
    		success: function( result ) {
    			$( '#result' ).empty(); //clears out results

    			result = result[ 'Result' ];

    			for ( var i = 0; i < result.length; i++ ) {
    				$( '#result' ).append( '<li>' + result[ i ][ 0 ] + ': ' + result[ i ][ 1 ] + '</li>'  );
    			}
    		},
    		error: function( error ) {  
    			$( '#result' ).empty();
                console.log( error );
                $( '#result' ).append( '<li>ERROR: Check the console log </li>'  );
    		}
    	});
    } );
});
