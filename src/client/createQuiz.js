/**
 * Created with IntelliJ IDEA.
 * User: shailesh
 * Date: 05/11/2013
 * Time: 16:25
 * To change this template use File | Settings | File Templates.
 */


console.log("I am running");
var i = 2;
$("#questions-button").on( "click", function( event ) {
    event.preventDefault();
    $('<div id="word' + i + '"><label for="inputgrp' + i + '">Word to define</label><div class="input-group"><input type="text" id="inputgrp' + i + '" name="inputgrp' + i + '"><span class="input-group-btn"><button class="btn btn-danger" type="button" id="remove-button" onclick="removeWord(\'word' + i + '\')"><i class=" icon-minus-sign"></i></button></span></div></div>').appendTo("#questions");
    i++;
    return false;
    });
function removeWord(word) {
    $("#" + word + "").remove();
    i--;
    return false;
    }



Template.createQuiz.events({
    'click #questions-button' : function(e, t){
        e.preventDefault();
        $('<div id="word' + i + '"><label for="inputgrp' + i + '">Word to define</label><div class="input-group"><input type="text" id="inputgrp' + i + '" name="inputgrp' + i + '"><span class="input-group-btn"><button class="btn btn-danger" type="button" id="remove-button" onclick="removeWord(\'word' + i + '\')"><i class=" icon-minus-sign"></i></button></span></div></div>').appendTo("#questions");
        i++;
        return false;


//        console.log('hit the submit button');
//        e.preventDefault();
//        // retrieve the input field values
//        var player_name = t.find('#playername').value;
//        if (player_name && player_name != '') {
//            Session.set('player_name', player_name);
//        }
//        var quiz = Session.get('quiz');
//        Router.go('takeQuiz', {_id: quiz._id} );
    }, //end add word
    'submit' : function(e ,t ){
            e.preventDefault();
        var words = [];
        $('#questions input').each(function(index,data){
            words.push($(data).val());
        });
        console.log(words);
        var name = $('#txt1').val();
        Meteor.call('createQuiz' ,name , words) ;


    }// end submit
});