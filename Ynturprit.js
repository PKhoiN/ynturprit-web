const ipaToGraphemeExtremeMap = new Map([
	["b", ["b", "bb"]],
	["d", ["d", "dd", "ed"]],
	["f", ["f", "ff", "ph", "gh", "lf", "ft"]],
	["g", ["g", "gg", "gh", "gu", "gue"]],
	["h", ["h", "wh"]],
	["dʒ", ["j", "ge", "g", "dge", "di", "gg"]],
	["k", ["k", "c", "ch", "cc", "lk", "q", "ck"]],
	["l", ["l", "ll"]],
	["m", ["m", "mm", "mb", "mn", "lm"]],
	["n", ["n", "nn", "kn", "gn", "pn", "mn"]],
	["p", ["p", "pp"]],
	["r", ["r", "rr", "wr", "rh"]],
	["s", ["s", "ss", "c", "sc", "ps", "st", "ce", "se"]],
	["t", ["t", "tt", "th", "ed"]],
	["v", ["v", "f", "ph", "ve"]],
	["w", ["w", "wh", "u", "o"]],
	["z", ["z", "zz", "s", "ss", "x", "ze", "se"]],
	["ʒ", ["s", "si", "z"]],
	["tʃ", ["ch", "tch", "tu", "te"]],
	["ʃ", ["sh", "ce", "s", "ci", "si", "ch", "sci", "ti"]],
	["θ", ["th"]],
	["ð", ["th"]],
	["ŋ", ["ng", "n", "ngue"]],
	["j", ["y", "i", "j"]],
	["æ", ["a", "ai", "au"]],
	["eɪ", ["a", "ai", "eigh", "aigh", "ay", "er", "et", "ei", "au", "a_e", "ea", "ey"]],
	["ɛ", ["e", "ea", "u", "ie", "ai", "a", "eo", "ei", "ae"]],
	["i", ["ie", "ee", "ea", "y", "ey", "oe", "ie", "i", "ei", "eo", "ay"]],
	["ɪ", ["i", "e", "o", "u", "ui", "y", "ie"]],
	["aɪ", ["i", "y", "igh", "ie", "uy", "ye", "ai", "is", "eigh", "i_e"]],
	["ɒ", ["a", "o", "aw", "ough"]],
	["oʊ", ["o", "oa", "o_e", "oe", "ow", "ough", "eau", "oo", "ew"]],
	["ʊ", ["o", "oo", "u", "ou"]],
	["ʌ", ["u", "o", "oo", "ou"]],
	["ɔɪ", ["oi", "oy", "uoy"]],
	["aʊ", ["ow", "ou", "ough"]],
	["u", ["u", "oo", "ew", "ue", "u_e", "oe", "ough", "ui", "oew", "ou"]],
	["ə", ["a", "er", "i", "ar", "our", "ur"]],
	["eə", ["ai", "a_e", "ea", "e_e", "ei", "aye"]], //r removed
	["ɑ", ["a"]],
	["ɜ", ["i", "e", "u", "ea", "o", "ou", "y"]], //r removed
	["ɔ", ["aw", "a", "o", "oo", "o_e", "oa", "ou", "augh", "ough", "au"]], //r removed
	["ɪə", ["ea", "ee", "e_e", "ie"]],
	["ʊə", ["u_e", "ou"]],
]);

const ipaToGraphemeReadableMap = new Map([
	["b", ["b"]],
	["d", ["d"]],
	["f", ["f"]],
	["g", ["g"]],
	["h", ["h"]],
	["dʒ", ["j"]],
	["k", ["k"]],
	["l", ["l"]],
	["m", ["m"]],
	["n", ["n"]],
	["p", ["p"]],
	["r", ["r"]],
	["s", ["s"]],
	["t", ["t"]],
	["v", ["v"]],
	["w", ["w"]],
	["z", ["z"]],
	["ʒ", ["s"]],
	["tʃ", ["ch"]],
	["ʃ", ["sh"]],
	["θ", ["th"]],
	["ð", ["th"]],
	["ŋ", ["ng"]],
	["j", ["y"]],
	["æ", ["a"]],
	["eɪ", ["ei"]],
	["ɛ", ["e"]],
	["i", ["ee"]],
	["ɪ", ["i"]],
	["aɪ", ["ai"]],
	["ɒ", ["o"]],
	["oʊ", ["oa"]],
	["ʊ", ["ou"]],
	["ʌ", ["u"]],
	["ɔɪ", ["oi"]],
	["aʊ", ["ow"]],
	["u", ["oo"]],
	["ə", ["a"]],
	["eə", ["ea"]], //r removed
	["ɑ", ["a"]],
	["ɜ", ["e"]], //r removed
	["ɔ", ["o"]],
	["ɪə", ["ea"]],
	["ʊə", ["ou"]],
]);

let ipaToGraphemeMap = ipaToGraphemeExtremeMap;

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function isConsonantIPA(ipaInput){
	const consanantIPA = ["b", "d", "f", "g", "h", "ʤ", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "z", "ʒ", "ʧ", "ʃ", "θ", "ð", "ŋ", "j"];
	return consanantIPA.includes(ipaInput);
}

function changeIPAMap(mapType){
	let currentIPAMapText = document.querySelector("#current-ipa-map-style-text");
	if (mapType == 0){ //Extreme
		ipaToGraphemeMap = ipaToGraphemeExtremeMap;
		currentIPAMapText.textContent = "Extreme";
		currentIPAMapText.style.color = "red";
	} else if (mapType == 1){ //Readable
		ipaToGraphemeMap = ipaToGraphemeReadableMap;
		currentIPAMapText.textContent = "Readable";
		currentIPAMapText.style.color = "rgb(0, 255, 0)";
	}
}

function convertIPAToGrapheme(){
	const ipaGraphemeInput = document.querySelector("#ipa-grapheme-input");
	const ipaGraphemeOutput = document.querySelector("#ipa-grapheme-output");
	const ipaInputString = ipaGraphemeInput.value;
	let splitGraphemeMemory = "";
	let graphemeOutputString = "";
	for (let i = 0; i < ipaInputString.length; i++){
		let ipaInputChar = ipaInputString[i];

		//Group diphthong
		if (i < ipaInputString.length - 1){
			let ipaNextInputChar = ipaInputString[i + 1];
			if (!isConsonantIPA(ipaNextInputChar) && !isConsonantIPA(ipaInputChar)){
				//If diphthong is valid
				if (ipaToGraphemeMap.has(ipaInputChar + ipaNextInputChar)){
					ipaInputChar += ipaNextInputChar;
					i++;
				}
			} else if ((ipaInputChar == "d" && ipaNextInputChar == "ʒ") || (ipaInputChar == "t" && ipaNextInputChar == "ʃ")){
				ipaInputChar += ipaNextInputChar;
				i++;
			}
		}

		if (ipaToGraphemeMap.has(ipaInputChar)){
			const graphemeArrOutputFromChar = ipaToGraphemeMap.get(ipaInputChar);
			let chosenGraphemeOutput = graphemeArrOutputFromChar[getRandomInt(0, graphemeArrOutputFromChar.length - 1)];
			
			//Add split grapheme
			if (isConsonantIPA(ipaInputChar) && splitGraphemeMemory != ""){
				chosenGraphemeOutput += splitGraphemeMemory;
				splitGraphemeMemory = "";
			}

			//Remember split grapheme
			if (!isConsonantIPA(ipaInputChar) && chosenGraphemeOutput.length == 3){
				if (chosenGraphemeOutput[1] == "_"){
					splitGraphemeMemory = chosenGraphemeOutput[2].toString();
					chosenGraphemeOutput = chosenGraphemeOutput[0].toString();
				}
			}
			
			graphemeOutputString += chosenGraphemeOutput;
		} else {
			graphemeOutputString += ipaInputChar;
		}
	}

	//Add split grapheme overflow
	if (splitGraphemeMemory != ""){
		graphemeOutputString += splitGraphemeMemory;
		splitGraphemeMemory = "";
	}
	ipaGraphemeOutput.value = graphemeOutputString;
}