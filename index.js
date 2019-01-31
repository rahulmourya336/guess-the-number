window.onload = _ => {
    createConfetti(0, true);
    console.log('View Loaded');
    generateTargetNumber(10);
};

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
    setActiveState(number);
}

setActiveState = number => {
    if (number === 99) {
        $('#levelMedium').addClass('active');
        $('#levelEasy').removeClass('active');
        $('#levelHard').removeClass('active');
    } else if (number === 999) {
        $('#levelMedium').removeClass('active');
        $('#levelEasy').removeClass('active');
        $('#levelHard').addClass('active');
    } else {
        $('#levelMedium').removeClass('active');
        $('#levelEasy').addClass('active');
        $('#levelHard').removeClass('active');
    }
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
        statusDiv.innerHTML = 'Too high ... 🔺';
        console.log('Too High');
    } else if (userGuess < parseInt(targetGuess)) {
        statusDiv.innerHTML = 'Too Low ... 🔻';
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


