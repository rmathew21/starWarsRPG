// Execute this code when the DOM has fully loaded
$(document).ready(function () {
    //Variable declaration 
    // ==========================================================

    // Cretaing an object to hold our characters
    let characters = {
        "Obi-Wan Kenobi": {
            name: "Obi-Wan Kenobi",
            health: 120,
            attack: 8,
            imageURL: "assets/images/obi-wan.jpg",
            enemyAttackBack: 15
        },
        "Luke Skywalker": {
            name: "Luke Skywalker",
            health: 100,
            attack: 14,
            imageURL: "assets/images/luke-skywalker.jpg",
            enemyAttackBack: 5
        },
        "Darth Sidious": {
            name: "Darth Sidious",
            health: 150,
            attack: 8,
            imageURL: "assets/images/darth-sidious.png",
            enemyAttackBack: 20
        },
        "Darth Maul": {
            name: "Darth Maul",
            health: 180,
            attack: 7,
            imageURL: "assets/images/darth-maul.jpg",
            enemyAttackBack: 25
        }
    };

    // Will be populated when the player selects a character 
    let attacker;
    // Populated with all the characters the player didn't select
    let combatants = [];
    // Will be populated when the player chooses an opponent 
    let defender;
    // Will keep track of turns during combat. Used for calculating player damage
    let turnCounter = 1;
    // Tracks number of defeated opponents
    let killCount = 0;

    // Functions
    // =======================================================================

    // This function will render a character cardf to the page
    // The character rendered, the area they are rendered to, and their status is determined by the arguments passed in
    let renderCharacter = function (character, renderArea) {
        // This block of code builds the character card, and renders it to the page
        let charDiv = $("<div class='character' data-name='" + character.name + "'>");
        let charName = $("<div class='character-name'>").text(character.name);
        let charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageURL);
        let charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    };

    // this function will load all the characters into the character section to be selected
    let initializeGame = function () {
        // Loop through the characters object and call the renderCharacter function on each character to render their card
        for (let key in characters) {
            renderCharacter(characters[key], "#characters-section");
        }
    };

    // remember to run the function here
    initializeGame();

    // This function handles updating the selected player or the current defender. If there is no selected player/defender this
    //function will also place the character based on the areaRender chosen (e.g #selected-character or #defender)
    let updateCharacter = function (charObj, areaRender) {
        // First we empty the area so that we can re-render the new object.empty
        $(areaRender).empty();
        renderCharacter(charObj, areaRender);
    };

    // This function will render the available-to-attack enemies. This should be run once after a character has been selected
    let renderEnemies = function (enemyArr) {
        for (let i = 0; i < enemyArr.length; i++) {
            renderCharacter(enemyArr[i], "#available-to-attack-section");
        }
    };

    // Function to handle rendering game messages
    let renderMessage = function (message) {
        // Builds the message and appends it to the page
        let gameMessageSet = $("#game-message");
        let newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };

    // Function which handles restarting the game after victory or defeat
    let restartGame = function (resultMessage) {
        // When the 'Restart' button is clicked, reload the page
        let restart = $("<button>Restart</button>").click(function () {
            location.reload();
        });

        // Build div that will display the victory/defeat message
        let gameState = $("<div>").text(resultMessage);

        // Render the restart button and victory/defeat message to the page.
        $("body").append(gameState);
        $("body").append(restart);
    };

    // Function to clear the game message section
    let clearMessage = function () {
        let gameMessage = $("#game-message");

        gameMessage.text("");
    };


})