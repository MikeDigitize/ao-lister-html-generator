function addEvent(el, evt, fn) {
	el.addEventListener(evt, fn, false);
}

function getPanel(className) {
	return panels.filter(panel => panel.classList.contains(className)).pop();
}

function getBlockClass(input) {
	return `panel${input.id.match(/\-.*$/)[0]}`;
}

var panels = Array.from(document.querySelectorAll(".panel"));

(function() {
	
	/* button utils */

	document.querySelector(".clear-all-btn").addEventListener("click", e => {
		e.preventDefault();
		let clear = confirm("Are you sure you want to clear all inputs?");
		if(clear) {
			Array.from(document.querySelectorAll("input[type='text'], textarea")).forEach(input => input.value = "");
		}
	}, false);

	document.querySelector(".generate-html-btn").addEventListener("click", e => {
		e.preventDefault();
		let generatedTextArea = document.querySelector("#generated-html");
		let styles = document.querySelector("#lister-content-styles").outerHTML;
		let html = document.querySelector("#lister-seo-content").outerHTML;
		generatedTextArea.value = `${styles}${html}`;
	});

	document.querySelector(".copy-html-btn").addEventListener("click", e => {
		let textarea = document.querySelector("#generated-html");
		let statusText = document.querySelector(".copy-status");
		textarea.select();
		document.execCommand("copy");
		statusText.innerText = "Text successfully copied!";
	}, false);

})();

(function() {		

	/*	Background image */	

	function addBackgroundImage(event) {
		setTimeout(() => {
			let input = event.target;
			let path = input.value;
			let blockClass = getBlockClass(input);
			let block = getPanel(blockClass);
			if(path) {
				let tryToLoadImage = imageExists(path);
				tryToLoadImage.then(function(exists) {
					if(exists) {
						setBackgroundImage(block, path);
						setBackgroundClass(block);
					}
					else {
						removeBackgroundImage(block);
						removeBackgroundClass(block);
					}
				});	
			}	
			else {
				removeBackgroundImage(block);
				removeBackgroundClass(block);
			}													
		}, 0);				
	}

	function imageExists(path) {
		return new Promise(function(res, rej) {
			var img = new Image();
			function onLoad() {
				removeListeners();
				res(true);
			}
			function onError(e) {
				removeListeners();
				res(false);
			}
			function removeListeners() {
				img.removeEventListener("load", onLoad);
				img.removeEventListener("error", onError);
			}
			img.addEventListener("load", onLoad);
			img.addEventListener("error", onError);
			img.src = path;
		});
		
	}

	function setBackgroundClass(target) {
		target.classList.add("bkground-img");
	}

	function removeBackgroundClass(target) {
		target.classList.remove("bkground-img");
	}

	function setBackgroundImage(target, path) {
		target.style.backgroundImage = `url('${path}')`;
	}

	function removeBackgroundImage(target) {
		target.style.backgroundImage = "";
	}			

	var bkimgInputs = Array.from(document.querySelectorAll(".bkimg"));

	bkimgInputs.forEach(input => { 
		addEvent(input, "keyup", addBackgroundImage); 
		addEvent(input, "cut", addBackgroundImage); 
		addEvent(input, "paste", addBackgroundImage); 
	});

})();

(function() {

	/* titles */

	var titleblockInputs = Array.from(document.querySelectorAll(".titleblock"));

	titleblockInputs.forEach(input => { 
		addEvent(input, "keyup", addTitle); 
		addEvent(input, "cut", addTitle); 
		addEvent(input, "paste", addTitle); 
	});

	function updateTitle(target, title) {
		getTitle(target).innerText = title;
	}

	function getTitle(target) {
		return target.querySelector("h3");
	}

	function addTitle(event) {
		setTimeout(() => {
			let input = event.target;
			let title = input.value;
			let blockClass = getBlockClass(input);
			let block = getPanel(blockClass);
			updateTitle(block, title);
		}, 0);
	}

})();

(function() {

	/* paragraph 1 */

	var p1blockInputs = Array.from(document.querySelectorAll(".p1block"));

	p1blockInputs.forEach(input => { 
		addEvent(input, "keyup", addP1); 
		addEvent(input, "cut", addP1); 
		addEvent(input, "paste", addP1); 
	});

	function updateP1(target, title) {
		getP1(target).innerText = title;
	}

	function getP1(target) {
		return target.querySelector(".p1");
	}

	function getInputWithSelectedText(text) {
		return p1blockInputs.filter(input => input.value === text).pop();
	}

	function addP1(event) {
		setTimeout(() => {
			let input = event.target;
			let title = input.value;
			let blockClass = getBlockClass(input);
			let block = getPanel(blockClass);
			updateP1(block, title);
		}, 0);
	}

})();

(function() {

	/* paragraph 2 */

	var p2blockInputs = Array.from(document.querySelectorAll(".p2block"));

	p2blockInputs.forEach(input => { 
		addEvent(input, "keyup", addP2); 
		addEvent(input, "cut", addP2); 
		addEvent(input, "paste", addP2); 
	});

	function updateP2(target, title) {
		getP2(target).innerText = title;
	}

	function getP2(target) {
		return target.querySelector(".p2");
	}

	function getInputWithSelectedText(text) {
		return p2blockInputs.filter(input => input.value === text).pop();
	}

	function addP2(event) {
		setTimeout(() => {
			let input = event.target;
			let title = input.value;
			let blockClass = getBlockClass(input);
			let block = getPanel(blockClass);
			updateP2(block, title);
		}, 0);
	}

})();

(function() {

	/* add a tags */

	var p1s = Array.from(document.querySelectorAll(".p1"));
	var p2s = Array.from(document.querySelectorAll(".p2"));

	p1s.forEach(p1 => { 
		addEvent(p1, "mouseup", addATag); 
	});

	p2s.forEach(p2 => { 
		addEvent(p2, "mouseup", addATag); 
	});

	function clearSelectedText() {
		selectedText = "";
	}

	function addATag(event) {
		let p = event.target;
		let selectedText = window.getSelection().toString();
		if(selectedText) {
			let anchorText = prompt("Enter a link for this text");
			if(anchorText) {
				createLink(anchorText, selectedText, p);
			}		
		}														
	}

	function createLink(anchorText, selectedText, p) {
		let link = insertLink(anchorText, selectedText);
		p.innerHTML = p.innerHTML.replace(selectedText, link);
	}

	function insertLink(anchorText, selectedText) {
		return `<a href="${anchorText}" target="_blank">${selectedText}</a>`;
	}

})();

(function(){

	/* remove links from paragraphs */

	panels.forEach(panel => addEvent(panel, "click", onATagClick));

	function getLink(anchorText, selectedText) {
		return `<a href="${anchorText}" target="_blank">${selectedText}</a>`;
	}

	function onATagClick(evt) {
		evt.preventDefault();
		let target = evt.target;
		if(target.tagName === "A" && (target.parentNode.classList.contains("p1") || target.parentNode.classList.contains("p2"))) {
			let removeATag = confirm("Click 'ok' to remove this link or 'cancel' to go to link URL");
			if(removeATag) {
				let linkText = target.innerText;
				let linkhref = target.href;
				let aParent = target.parentNode;
				if(aParent.innerHTML.includes(target.outerHTML)) {
					aParent.innerHTML = aParent.innerHTML.replace(target.outerHTML, linkText);
				}
			}
			else {
				window.open(
				    target.href,
				    "Link preview",
				    "resizable,scrollbars,status"
				);
			}
		}
	}

})();