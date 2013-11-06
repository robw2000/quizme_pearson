var getDefinition = function (word) {
    var response =
        Meteor.http.call('GET', 'http://api.wordnik.com/v4/word.json/' + word + '/definitions?limit=3&includeRelated=true&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=02d6121eae6326d65940a0b410d0ef121d89f66f01e3a699f');

    if (response && response.data && response.data.length && response.data.length > 0) {
        return response.data[0].text;

    } else {
        return null;

    }

}

/**
 * Gets the synonyms of the word
 * @param word
 * @returns returns  synonyms array of string
 */
var getSynonyms = function (word) {
    var response =
        Meteor.http.call('GET', 'http://api.wordnik.com/v4/word.json/' + word + '/relatedWords?useCanonical=true&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=02d6121eae6326d65940a0b410d0ef121d89f66f01e3a699f');

    return response.data[0].words;
}

/**
 *
 * @param Gets  the word and Synonyms Definition
 * @returns  javascript json object
 */
var getWordAndDefinition = function (quizWord) {
    var defs = {
        'word': quizWord,
        'answer': getDefinition(quizWord),
        'wrong_answers': []
    };

    var synonyms = getSynonyms(quizWord);
    for (i = 0; i < synonyms.length; i++) {
        var def = getDefinition(synonyms[i]);
        if (def != null) {
            defs.wrong_answers.push(def);
        }
    }

    return defs;
}

