/**
 * Created with IntelliJ IDEA.
 * User: shailesh
 * Date: 05/11/2013
 * Time: 16:25
 * To change this template use File | Settings | File Templates.
 */

var i = 2;
//$("#questions-button").on( "click", function( event ) {
//    event.preventDefault();
//    $('<div id="word' + i + '"><label for="inputgrp' + i + '">Word to define</label><div class="input-group"><input type="text" id="inputgrp' + i + '" name="inputgrp' + i + '"><span class="input-group-btn"><button class="btn btn-danger" type="button" id="remove-button" onclick="removeWord(\'word' + i + '\')"><i class=" icon-minus-sign"></i></button></span></div></div>').appendTo("#questions");
//    i++;
//    return false;
//    });
//function removeWord(word) {
//    $("#" + word + i).remove();
//    i--;
//    return false;
//    }



Template.createQuiz.events({
    'click #questions-button' : function(e, t){
        e.preventDefault();
        $('<div id="word' + i + '" class="addedRow"><label for="inputgrp' + i + '">Word to define</label><div class="input-group"><input type="text" id="inputgrp' + i + '" name="inputgrp' + i + '"><span class="input-group-btn"><button class="btn btn-danger" type="button" id="remove-button'+i+'"><i class=" icon-minus-sign"></i></button></span></div></div>').appendTo("#questions");
		$('#remove-button'+i).on('click',function(e){
            $(e.target).closest('.addedRow').remove();
		});
		i++;
        return false;

    }, //end add word
    'submit' : function(e ,t ){
            e.preventDefault();
        var words = [];
        $('#questions input').each(function(index,data){
            words.push($(data).val());
        });
        //console.log(words);
        var name = $('#txt1').val();
        console.log(words);
        Meteor.call('createQuiz' ,name , words) ;

        //$('#questions > :not(div:first-child)').remove();
        //$('#questions > div:first-child input,#txt1,#txta').val('');

        //$('form').before($('<div/>',{'class':'alert alert-success', 'id':'submitSuccess'}).text('Quiz Created Successfully ! You may create another if you like.'));

        //$('input').on('focus',function(){
        //    $('#submitSuccess').remove();
        //    $('input').off();
        //});

        //window.scrollTo(0, 0);

        window.location = '/quizzes';

    }// end submit
});
