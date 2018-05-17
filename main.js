//In the name of Allah

var input = document.querySelector('input');
var button = document.querySelector('button');
var img = document.getElementById('output');
var p = document.getElementById('empty');

function checkBrackets(string) {
	var balance;
	if(string){
		string = extractBrackets(string);
		balance = false;
		var continueLoop;
		if(string.length % 2 == 1) {
			return balance;
		}else {
			var i = 0;
			var matchFound;
			outer = 0;
			inner = 0;
			do {
				outer++;
				continueLoop = false;
				for(var j = i + 1; j < string.length; j++) {
					inner++;
					if(matchBracket(string[i], string[j])) {
						if((i + 1) !== j) {
							string = shiftBracket(string, i + 1, j);
						}
						balance = true;
						continueLoop = true;
						break;
					}else {
						balance = false;
					}
				}
				i += 2;
			}while(continueLoop);
		}
	}	
	console.log('outer ' + outer);
	console.log('inner' + inner);
	return balance;
}

function shiftBracket(string, indexNew, indexOld) {
	
	string = string.substring(0, indexNew) + string[indexOld] + 
	string.substring(indexNew, indexOld) + string.substring(indexOld + 1);
	
	//alert(string);
	return string;
}

function matchBracket(open, close) {
	if(open === '(' && close === ')') {
		return true;
	}else if(open === '{' && close === '}') {
		return true;
	}else if(open === '[' && close === ']') {
		return true;
	}else if(open === '<' && close === '>') {
		return true;
	}else {
		return false;
	}
}

function extractBrackets(string) {
	var temp = '';
	for(var i = 0; i < string.length; i++) {
		if('()[]{}<>'.indexOf(string[i]) >= 0) {
			temp += string[i]; 
		}
	}
	return temp;
}

input.onkeydown = function(e) {
	p.textContent = '';
	img.setAttribute('src', 'icons/checking.png');
}

input.onkeyup = function(e) {
	if(input.value === '') {
		img.setAttribute('src', '');
	}
}

button.onclick = function() {
	if(checkBrackets(input.value)) {
		//images from https//:www.iconfinder.com
		img.setAttribute('src', 'icons/bal.png');
	}else if(checkBrackets(input.value) === false){
		img.setAttribute('src', 'icons/unbal.png');
	}else {
		p.textContent = 'Text box empty!';
	}
}