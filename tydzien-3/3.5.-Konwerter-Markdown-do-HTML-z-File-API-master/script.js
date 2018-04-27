window.onload = function(){
	
	var converter = {
		
		loadedFile: function(){
			
			this.mdFile = this.fileInput.files[0];
			
			this.fileInputInterface.dataset.text = this.mdFile.name;
			this.outputBox.focus();
			this.reader.readAsText(this.mdFile);
			this.reader.onloadend = this.loadFileContent.bind(this)
			this.outputBox.onscroll = this.scrollSidebar.bind(this);
			
		},
		
		scrollSidebar: function(){
			
			this.outputSidebar.style.top = -(this.outputBox.scrollTop) + "px";
			
		},

		getOutputWidthInEx: function(){

			var span = document.createElement("span"),
				outputWidth = outputBox.getBoundingClientRect().width - parseFloat( window.getComputedStyle(outputBox).paddingLeft );

			span.style.cssText = "opacity: 0; position: absolute; z-index: -1; font-family: Courier";

			span.innerText = "x";

			document.body.appendChild(span);

			var ratio = outputWidth / parseFloat(window.getComputedStyle(span).width);

			document.body.removeChild(span);

			return ratio;
			
		},
		
		loadFileContent: function(){
			
			this.outputBox.innerHTML = this.converter.makeHtml( this.reader.result );
			this.outputBox.scrollTop = 0;
			
			this.printLineNumbers();
			this.copyBox.classList.add("copy-button")
			this.copyButton.onclick = this.copyContent.bind(this);
			
			this.copyButton.setAttribute('data-original-title', "copy content to clipboard")

		},
		
		copyContent: function(){
			var scrollH = this.outputBox.scrollTop;
						
			this.outputBox.select();
			document.execCommand('copy');
			
			jQuery(this.copyButton).attr('data-original-title', "copied to clipboard!")
								   .tooltip('update')
								   .tooltip('show');
								   
								   
			setTimeout( function(){ this.outputBox.scrollTop = scrollH }, 1  )
		
		},
		
		printLineNumbers: function(){
			
			var lineNo = 1,
				outputWidthInEx = Math.floor( this.getOutputWidthInEx() ),
				widthCounter = outputWidthInEx,
				spacesArr = [];

			this.outputSidebar.innerHTML = "";
			
			for(var i = 0; i <= this.reader.result.length; i++){

				if( /\s/.test(this.reader.result.charAt(i)) ) spacesArr.push(i % outputWidthInEx);
				
				widthCounter--

				if( widthCounter === 0 || this.reader.result.charCodeAt(i) === 10 || i === this.reader.result.length ){

					var div = document.createElement("div");

					if(widthCounter === 0){

						div.innerHTML = "&nbsp;";

						widthCounter = Math.max.apply(Math, spacesArr);

					} else {

						div.innerHTML = lineNo++ + ":";

						widthCounter = outputWidthInEx;

						spacesArr = [];

					}

					console.log(widthCounter)

					this.outputSidebar.appendChild(div);

				}

			};

		},
		
		init: function(){
			
			if(!window.FileReader) return;
			
			this.fileInput = document.querySelector("#fileInput");
			this.outputBox = document.querySelector("#outputBox");
			this.outputSidebar = document.querySelector("#outputSidebar");
			this.fileInputInterface = document.querySelector("#fileInputInterface");
			this.copyBox = document.querySelector("#copyBox");
			this.copyButton = document.querySelector("#copyBox button");
			
			this.reader = new FileReader();
			this.converter = new showdown.Converter(),
			
			jQuery(function () { $('[data-toggle="tooltip"]').tooltip()})
			
			this.fileInput.onchange = this.loadedFile.bind(this);
		}
		
	};
	
	
	converter.init();
	
};