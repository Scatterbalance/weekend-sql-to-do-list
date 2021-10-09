$(document).ready(OnReady);
  
function OnReady(){
    console.log('JQ');
    getTasks ();
    $('#addButton').on('click', add);



} // end doc ready

function getTasks(){
    console.log('in getTasks');

    $.ajax({
        method: 'GET',
        url: '/taskList'
    }).then( function( response ){
        console.log( 'back from get with:', response );
        // display on DOM
        
        
        let el = $( '#taskOut' );
        el.empty();
        for( let i=0; i<response.length; i++ ){
            el.append( `<li>${response[i].task}</li>`)
        }
    }).catch( function( err ){
        console.log( err );
        alert( 'oops!' );
    })


}

function add(){
    console.log('in add');

    let objectToSend = {
        task: $('#taskIn').val(),
        done: false
    };

    $.ajax({
        method: 'POST',
        url: '/taskList',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getTasks();
    }).catch( function( err ){
        alert( 'error adding item' );
        console.log( err );
    })
    //empty fields
    $('#taskIn').val('');
    








} //end add