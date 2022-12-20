// Старт
document.getElementById('btnTobegin').addEventListener('click', function () {   
    document.querySelector('.title_page').classList.add('hidden');              
    document.querySelector('.introduction').classList.add('hidden');
    document.querySelector('.value_range').classList.remove('hidden');          
    document.querySelector('.valueRange').classList.remove('hidden');           
    document.querySelector('.form').classList.remove('hidden');          
    document.querySelector('#btnTobegin').classList.add('hidden');              
    document.querySelector('#btnProceed').classList.remove('hidden');           
})

//Введение диапозона

document.getElementById('btnProceed').addEventListener('click', function () {   
    document.querySelector('.value_range').classList.add('hidden');             
    document.querySelector('.terms').classList.remove('hidden');                
    document.querySelector('.valueRange').classList.add('hidden');              
    document.querySelector('.form').classList.add('hidden');             
    document.querySelector('.guessNumber').classList.remove('hidden');          
    document.querySelector('#btnProceed').classList.add('hidden');              
    document.querySelector('#btnPlay').classList.remove('hidden');  

    minValue = parseInt(document.querySelector('#InputMin').value);
    maxValue = parseInt(document.querySelector('#InputMax').value);
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue; //узнать что делает
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; // Значения меняются местами если max меньше min.
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
})

//Игра
document.getElementById('btnPlay').addEventListener('click', function () {      
    document.querySelector('.terms').classList.add('hidden');                   
    document.querySelector('.question').classList.remove('hidden');             
    document.querySelector('.guessNumber').classList.add('hidden');             
    document.querySelector('.no-gutters').classList.remove('hidden');           
    document.querySelector('#btnPlay').classList.add('hidden');                 
    document.querySelector('#btnLess').classList.remove('hidden');              
    document.querySelector('#btnEqual').classList.remove('hidden');             
    document.querySelector('#btnOver').classList.remove('hidden');              
    document.querySelector('.btn-link').classList.remove('hidden'); 

    const orderNumberField = document.getElementById('orderNumberField'); 
    const answerField = document.getElementById('answerField');
    const backgr = document.querySelector('body')
    const shadow = document.querySelector('.card')
    let answerNumber = Math.floor((minValue + maxValue) / 2); // Середина числового диапазона
    let orderNumber = 1; // Номер первого вопроса.
    let gameRun = true;

    let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    // Преобразование чисел в слова.
    function numberToText() { 
        let number = Math.abs(answerNumber);
        let text = '';

        if (number == 0) {
            text = 'ноль';
            return text;
        }

        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }

        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }

        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }

        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    function numberToTextHundreds() { 
        let unitsTeensDozens = Math.abs(answerNumber) % 100;

        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }

        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }

        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }

    orderNumberField.innerText = orderNumber; 
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20 ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;

    // Кнопки Меньше.
    document.getElementById('btnLess').addEventListener('click', function () { 
        if (gameRun) {

            if (minValue === maxValue || minValue == answerNumber) {
                const Random = Math.round(Math.random() * 3);
                backgr.style.background = ('rgb(182, 19, 19)')
                shadow.style.boxShadow = ('0 0 20px black')
                switch (Random) {
                    case 0:
                        answerPhrase = `Фу таким быть, вы не загадали число!\n\u{1F914}`
                        break;

                    case 1:
                        answerPhrase = `Вы забыли, какое число?\n\u{1F92A}`
                        break;

                    case 2:
                        answerPhrase = `Ну как так то? Вы ошиблись с числом!\n\u{1F9D0}`
                        break;

                    case 3:
                        answerPhrase = `Не обманывайте, а то засужу!\n\u{1F620}`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            }
             else {
                maxValue = answerNumber - 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const Random = Math.round(Math.random() * 4);
                switch (Random) {
                    case 1:
                        answerPhrase = `Может `
                        break;

                    case 2:
                        answerPhrase = `Всетаки `
                        break;

                    case 3:
                        answerPhrase = `Это `
                        break;

                    case 4:
                        answerPhrase = `Скорее это `
                        break;
                }
                
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? ` ${answerPhrase} ${numberToText()}?` : `${answerPhrase} ${answerNumber}?` : numberToText().length < 20 ? `${answerPhrase} минус ${numberToText()}?` : `${answerPhrase} ${answerNumber}?`;
            }
        }
    })

    // Кнопки Больше.
    document.getElementById('btnOver').addEventListener('click', function () { 
        if (gameRun) {

            if (minValue === maxValue || minValue == answerNumber) {
                const Random = Math.round(Math.random() * 3);
                backgr.style.background = ('rgb(182, 19, 19)')
                shadow.style.boxShadow = ('0 0 20px black')
                switch (Random) {
                    case 0:
                        answerPhrase = `Фу таким быть, вы не загадали число!\n\u{1F611}`
                        break;

                    case 1:
                        answerPhrase = `Вы забыли, какое число?\n\u{1F92A}`
                        break;

                    case 2:
                        answerPhrase = `Ну как так то? Вы ошиблись с числом!\n\u{1F628}`
                        break;

                    case 3:
                        answerPhrase = `Не обманывайте, а то засужу!\n\u{1F620}`
                        break;
                }
                answerField.innerText = answerPhrase;
                gameRun = false;
            }
             else {
                minValue = answerNumber + 1; 
                answerNumber = Math.floor((minValue + maxValue) / 2);
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                const Random = Math.round(Math.random() * 4);
                switch (Random) {
                    case 1:
                        answerPhrase = `Может `
                        break;

                    case 2:
                        answerPhrase = `Всетаки `
                        break;

                    case 3:
                        answerPhrase = `Это `
                        break;

                    case 4:
                        answerPhrase = `Скорее это `
                        break;
                }
                
                answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? ` ${answerPhrase} ${numberToText()}?` : `${answerPhrase} ${answerNumber}?` : numberToText().length < 20 ? `${answerPhrase} минус ${numberToText()}?` : `${answerPhrase} ${answerNumber}?`;
            }
        }
    })

    document.getElementById('btnEqual').addEventListener('click', function () { // Код для кнопки "Верно".
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase = `Это было легко\n\u{1F624}`
                    break;

                case 1:
                    answerPhrase = `Сделал это ... \n\u{1F4A9}`
                    break;

                case 2:
                    answerPhrase = `О даа\n\u{1F913}`
                    break;

                case 3:
                    answerPhrase = `Ты сказал семья?\n\u{1F601}`
                    break;
            }
            answerField.innerText = answerPhrase;
            gameRun = false;
        }
    })
    
})

// Клик по кнопке Заново.

document.getElementById('btnRetry').addEventListener('click', function () {    
    document.querySelector('.question').classList.toggle('hidden');             
    document.querySelector('.value_range').classList.toggle('hidden');          
    document.querySelector('.no-gutters').classList.toggle('hidden');           
    document.querySelector('.valueRange').classList.toggle('hidden');           
    document.querySelector('.form').classList.toggle('hidden');          
    document.querySelector('#btnLess').classList.toggle('hidden');              
    document.querySelector('#btnEqual').classList.toggle('hidden');             
    document.querySelector('#btnOver').classList.toggle('hidden');              
    document.querySelector('.btn-link').classList.toggle('hidden');             
    document.querySelector('#btnProceed').classList.toggle('hidden');           
    document.querySelector('#InputMin').value = '';
    document.querySelector('#InputMax').value = '';
    minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
    maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
    const shadow = document.querySelector('.card')
    const backgr = document.querySelector('body')
    shadow.style.boxShadow = ('')
    backgr.style.background = ('')
    if (maxValue < minValue) {
        [maxValue, minValue] = [minValue, maxValue]; 
    }
    if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
        minValue = 0;
        maxValue = 100;
    }
    guessNumber.innerText = `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;

    // Кнопка Продолжить.
    document.getElementById('btnProceed').addEventListener('click', function () {  
        document.querySelector('.value_range').classList.add('hidden');             
        document.querySelector('.terms').classList.remove('hidden');                
        document.querySelector('.valueRange').classList.add('hidden');              
        document.querySelector('.form').classList.add('hidden');             
        document.querySelector('.guessNumber').classList.remove('hidden');          
        document.querySelector('#btnProceed').classList.add('hidden');              
        document.querySelector('#btnPlay').classList.remove('hidden');              
    })
})