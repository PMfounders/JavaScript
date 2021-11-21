window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition;
recognition.lang = 'ru'

console.log(recognition);

var words = document.querySelector('.words')
var p = document.createElement('p')
words.appendChild(p)

recognition.addEventListener('result', function (event) {
    p.innerHTML = Array.from(event.results).map(function (result) {
        return result[0]
    })
        .map(function (result) {
            console.log(result.transcript);
            return result.transcript
        })

    if (event.results[0].isFinal) {
        p = document.createElement('p')
        words.appendChild(p)
    }

})



recognition.addEventListener('end', recognition.start)
recognition.start()

