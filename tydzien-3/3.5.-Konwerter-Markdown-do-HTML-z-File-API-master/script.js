window.onload = function(){
	
	var konwerter = {
		
		zaladowanyPlik: function(e){
			
			this.plik = this.fileInput.files[0];
	
			// if(file.type.match("image.*")) {
			
			this.fileInputInterface.dataset.text = this.plik.name;
			this.outputBox.focus();
			this.reader.readAsText(this.plik);
			this.reader.onloadend = this.wczytajTrescPliku.bind(this)
			this.outputBox.onscroll = this.przewijajSidebar.bind(this);
			
		},
		
		przewijajSidebar: function(e){
			
			this.outputSidebar.style.top = -(this.outputBox.scrollTop) + "px";
			
		},
		
		wczytajTrescPliku: function(e){
			
			this.outputBox.innerHTML = this.converter.makeHtml( this.reader.result );
			this.outputBox.scrollTop = 0;
			
			this.drukujNumeryLinijek()
			this.copyBox.classList.add("copy-button")
			this.copyButton.onclick = this.kopiujTresc.bind(this);
			
			this.copyButton.setAttribute('data-original-title', "Kopiuj całą treść do schowka")
			
			// setTimeout(function(){ this.copyBox.classList.remove("copy-button") }, 3000)

		},
		
		kopiujTresc: function(){
			var scrollH = this.outputBox.scrollTop;
						
			this.outputBox.select();
			document.execCommand('copy');
			
			jQuery(this.copyButton).attr('data-original-title', "Skopiowane do schowka!")
								   .tooltip('update')
								   .tooltip('show');
								   
								   
			setTimeout( function(){ this.outputBox.scrollTop = scrollH }, 1  )
		
		},
		
		drukujNumeryLinijek: function(){
			
			var nrLinijki = 1;
			
			for(i = 0; i < this.reader.result.length; i++){			
				
				if(this.reader.result.charCodeAt(i) === 10){
					var div = document.createElement("div");

					div.innerHTML = nrLinijki++ + ":"

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
			
			this.fileInput.onchange = this.zaladowanyPlik.bind(this);
		}
		
	};
	
	
	konwerter.init();
	
};