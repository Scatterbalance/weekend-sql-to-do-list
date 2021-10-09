

$(document).ready(OnReady);
  
function OnReady(){
    console.log('JQ');
    getTasks ();
    $('#addButton').on('click', add);
    $('#taskOut').on('click', '.deleteTaskButton', deleteTask)
    $('#taskOut').on('click', '.completeTaskButton', completeTask)



} // end doc ready

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


function completeTask(){
    console.log( 'in taskList:', $( this ).data( 'id' ) );
    $.ajax({
        method: 'PUT',
        url: '/taskList?id=' + $( this ).data( 'id' ),
    }).then( function( response ){
        console.log( 'back from update:', response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error updating task' );
    })
}

// delete 
function deleteTask(){
    console.log( 'in taskList:', $( this ).data( 'id' ) );
    $.ajax({
        method: 'DELETE',
        url: '/taskList?id=' + $( this ).data( 'id' ),
    }).then( function( response ){
        console.log( 'back from delete:', response );
        getTasks();
    }).catch( function( err ){
        console.log( err );
        alert( 'error deleting task' );
    })

}// end deletetask



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
            let appendCode = '';
            
            if( response[i].done ){
                //task is complete
               appendCode += `<li>${response[i].task}     <button type ="button" class = "deleteTaskButton" data-id="${ response[i].id }" >Remove</button></li>`

            }else{

                //task is not complete
                appendCode += `<li>${response[i].task}     <button type ="button" class = "completeTaskButton" data-id="${ response[i].id }" >complete?</button>
                <button type ="button" class = "deleteTaskButton" data-id="${ response[i].id }" >Remove</button></li>`

            }
            el.append(appendCode)


            
        }
    }).catch( function( err ){
        console.log( err );
        alert( 'oops!' );
    })


} // end getTasks

