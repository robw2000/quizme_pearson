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

