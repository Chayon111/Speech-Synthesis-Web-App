document.addEventListener("DOMContentLoaded", () => {
    const textarea = document.getElementById("textarea");
    const voiceSelect = document.getElementById("voiceSelect");
    const volumeValue = document.getElementById("volumeValue");
    const volumeRange = document.getElementById("volumeRange");
    const rateValue = document.getElementById("rateValue");
    const rateRange = document.getElementById("rateRange");
    const pitchValue = document.getElementById("pitchValue");
    const pitchRange = document.getElementById("pitchRange");
    const speakButton = document.getElementById("speakButton");
    const pauseButton = document.getElementById("pauseButton");
    const resumeButton = document.getElementById("resumeButton");
    const outputText = document.getElementById("outputText");

    let synth;
    let voices = [];
    let uttarance;


    // for check brwoser is suport speechSynthesis
    if("speechSynthesis" in window) {
        synth = window.speechSynthesis;
        // funnction for choise populate voice
        const populateVoiceList = () => {
            voices = synth.getVoices();
            
            voiceSelect.innerHTML ="";
            
            voices.forEach((voice, index) => {
                const option = document.createElement("option");
                option.value = index;
                option.textContent = `${voice.name}  (${voice.lang})`;

                voiceSelect.appendChild(option);
                // console.dir(option);
            });
            voiceSelect.selectedindex = 0;
        }
        populateVoiceList();

        synth.onvoiceschanged = populateVoiceList;

        // function for update range of value
        const updateRangeValue = (inputElem, valueElm) => {
            valueElm.textContent = inputElem.value;
        };

        // for update volumeRange and volumeValue
        volumeRange.addEventListener("input", () => {
            updateRangeValue(volumeRange, volumeValue);
        });
        // for update rateRange and rateValue
        rateRange.addEventListener("input", () => {
            updateRangeValue(rateRange, rateValue);
        });
        // for update pitchRange and pitchValue
        pitchRange.addEventListener("input", () => {
            updateRangeValue(pitchRange, pitchValue);
        });

        // function for speak given text
        const speakText = () => {
                const text = textarea.value;

                if (text !== "") {
                    const selectedVoiceIndex = voiceSelect.value;
                    const selectedVoice = voices[selectedVoiceIndex];

                    uttarance = new SpeechSynthesisUtterance(text);

                    //set properties for uttarance 
                    uttarance.voice = selectedVoice;
                    uttarance.volume = parseFloat(volumeRange.value);
                    uttarance.rate = parseFloat(rateRange.value);
                    uttarance.pitch = parseFloat(pitchRange.value);

                    // speak the text
                    synth.speak(uttarance);

                    // update text in html of output
                    outputText.innerHTML = `Playing : <br> <br> ${text}`;

                    // enable pause and resume button
                    pauseButton.disabled = false;
                    resumeButton.disabled = false;
                } else {
                    // if no text is entered , show this error
                    outputText.textContent = "Error : Please enter text to speak.";
                    outputText.style.color = "red";
                }
        };
        // for get text area value again and pause
        const textValpause = () => {
                synth.pause();
                const textValue = textarea.value;
                outputText.innerHTML = `Paused : <br> <br> ${textValue}`;
                speakButton.disabled = true;
        }
        // for get textarea value again and resume
        const textValresume = () => {
                synth.resume();
                const textValue = textarea.value;
                outputText.innerHTML = `Resume : <br> <br> ${textValue}`;
                speakButton.disabled = false;
        }

        // click for addEventListener
        speakButton.addEventListener("click", () => {
            speakText();
        });
        pauseButton.addEventListener("click", () => {
            textValpause();
        });
        resumeButton.addEventListener("click", () => {
            textValresume();
        });
    }
});