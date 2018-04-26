window.onload = function(){
	
	var converter = {
		
		loadedFile: function(e){
			
			this.mdFile = this.fileInput.files[0];
			
			this.fileInputInterface.dataset.text = this.mdFile.name;
			this.outputBox.focus();
			this.reader.readAsText(this.mdFile);
			this.reader.onloadend = this.loadFileContent.bind(this)
			this.outputBox.onscroll = this.scrollSidebar.bind(this);
			
		},
		
		scrollSidebar: function(e){
			
			this.outputSidebar.style.top = -(this.outputBox.scrollTop) + "px";
			
		},
		
		loadFileContent: function(e){
			
			this.outputBox.innerHTML = this.converter.makeHtml( this.reader.result );
			this.outputBox.scrollTop = 0;
			
			this.printLineNumbers()
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
			
			var lineNo = 1;
			
			for(i = 0; i < this.reader.result.length; i++){			
				
				if(this.reader.result.charCodeAt(i) === 10){
					var div = document.createElement("div");

					div.innerHTML = lineNo++ + ":"

					this.outputSidebar.appendChild(div);
				};
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