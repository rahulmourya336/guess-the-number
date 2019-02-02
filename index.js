/**
 * [TODO]
 *   1. Render text-box on level select.
 *   2. Write test cases for application.
 *   3. Make global scoreboard of game.
 * 
 */

window.onload = _ => {
    createConfetti(0, true);
    clearGeneratedNumber();
    console.log('View Loaded');
    // generateTargetNumber(10);
    // checkView();
};

const elementRender = (parentElement, childElement, classList, elementId) => {

}

const generateInputView = _ => {
    let parent = document.getElementById('input__guessList');
    let __maindiv = document.createElement('div');
    __maindiv.className = 'empty-action empty-width';
    __maindiv.id = 'actionInterface';

    let __inputDiv = document.createElement('div');
    __inputDiv.className = 'input-group';

    let __input = document.createElement('input');
    __input.type = 'number';
    __input.className = "form-input";
    __input.placeholder = '44';
    __input.id = 'inputValue';

    let __button = document.createElement('button');
    __button.className = 'btn btn-primary input-group-btn';
    __button.setAttribute('onclick', 'startGame()');
    __button.innerText = 'Wild Guess';

    let __helperMessage = document.createElement('p');
    __helperMessage.className = 'empty-subtitle small mt-2 mb-2';
    __helperMessage.id = 'status_hint';
    __helperMessage.innerText = 'Enter a number to start guessing';

    let __guessList = document.createElement('div');
    __guessList.id = 'guessList';
    __guessList.className = 'mt-2 mark';

    __inputDiv.append(__input);
    __inputDiv.append(__button);

    __maindiv.append(__inputDiv);
    __maindiv.append(__helperMessage);

    parent.append(__maindiv);
    parent.append(__guessList);

}

const checkView = _ => {
    if (localStorage.length > 0) {
        $('#levelSelect').hide();
    }
}

const createConfetti = (count, offset = false) => {
    let parent = document.getElementById("confetti");
    if (offset) {
        $("#confetti").empty();
        return;
    }

    for (let loop = 0; loop < count; loop++) {
        let _confettiDiv = document.createElement("div");
        _confettiDiv.setAttribute("class", "confetti-piece");
        parent.append(_confettiDiv);
    }
};

const generateTargetNumber = (number) => {
    clearGeneratedNumber();
    let generatedNumber = Math.floor(Math.random() * number);
    localStorage.setItem('NUMBER', generatedNumber);
    checkView();
    generateInputView();
}

const makeUserGuessList = (number) => {
    let parent = document.getElementById('guessList');

    chip = document.createElement('span')
    chip.className = "chip bg-primary";
    chip.innerText = number;

    parent.append(chip);
}

const clearGeneratedNumber = _ => localStorage.clear();

const startGame = _ => {
    if (localStorage.length === 0) { generateTargetNumber(10) }
    let userInput = document.getElementById('inputValue');
    if (userInput.value.length === 0) {
        shakeTextBox();
        return;
    }
    console.log('User input' + userInput.value.length);
    let userGuess = userInput.value;
    userInput.value = null;
    createGuessAlert(userGuess);
}

const phrase = (guessCount) => {
    console.log(guessCount);
    if (guessCount === 0 || guessCount === 1) {
        return "🔥 Excellent";
    } else if (guessCount >= 2 && guessCount <= 6) {
        return "😄 Amazing";
    } else if (guessCount >= 7 && guessCount <= 10) {
        return "😊 Good";
    } else {
        return "😴 💤 You took ages to";
    }
}

const createGuessAlert = (userGuess) => {
    let statusDiv = document.getElementById('status_hint');
    let countGuessDiv = document.getElementById('status_guessMessage');
    let targetGuess = localStorage.getItem('NUMBER');
    if (userGuess === targetGuess) {
        createConfetti(100);
        $('#winning_message').show();
        emoji = document.getElementById('emoji');
        emoji.className = "icon icon-refresh icon-4x text-success rotate-reload-icon";
        emoji.setAttribute('onclick', 'location.reload()')
        statusDiv.innerHTML = 'BINGO! ✔️';
        let guessCount = document.getElementById('guessList').childElementCount;
        countGuessDiv.innerHTML = `${phrase(guessCount)} guess : ${userGuess}`;
        $('#actionInterface').hide();
        $('#levelSelect').hide();
        console.log('Winner')
    } else if (userGuess > parseInt(targetGuess)) {
        statusDiv.innerHTML = 'Guess was too high ... 🔺';
        console.log('Too High');
    } else if (userGuess < parseInt(targetGuess)) {
        statusDiv.innerHTML = 'Guess was too Low ... 🔻';
        console.log('Too Low');
    } else {
        statusDiv.innerHTML = 'I forgot the number ... 😞';
        console.warn('Something went wrong!');
    }
    makeUserGuessList(userGuess);
}

const shakeTextBox = _ => {
    console.warn("Venom");
    document.getElementById("inputValue").className = 'form-input input_shake is-error';
    document.getElementById('inputValue').addEventListener('animationend', (e) => {
        setTimeout(_ => { }, 100);
        document.getElementById("inputValue").className = 'form-input';
    });
}


