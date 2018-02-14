// revoke.URL, scroll do podstawy playera po załadowaniu filmu

window.onload = function(){
	
	var filmPlayer = {
				
		kontrolkiToggler: function(){
			
			this.videoKontener.onmouseover = function(){
				this.kontrolki.style.opacity = 1;
				this.videoKontener.dataset.hovered = "true";
				clearTimeout(this.kontrolki.controlsOut)
			}.bind(this);
			
			this.videoKontener.onmouseout = function(){
				this.videoKontener.dataset.hovered = "false";
				this.kontrolki.controlsOut = setTimeout(function(){ this.kontrolki.style.opacity = ""; clearTimeout(this.kontrolki.controlsOut)}, 1000);
			}.bind(this);
			
			(this.kontrolki.mute || this.kontrolki.volumeSlider).onmouseover = function(){
				this.kontrolki.volumeSlider.style.display = "block";
			}.bind(this);
			
			(this.kontrolki.mute || this.kontrolki.volumeSlider).onmouseout = function(){
				this.kontrolki.volumeSlider.style.display = "none";
			}.bind(this);
			
		},
		
		przypiszZdarzenia: {
		
			init: function(that){
				
				that.kontrolki.eject.onclick = that.otwieranieNowychFilmow.bind(that);
				that.video.onwheel = that.zmianaGlosnosci.bind(that);
				that.kontrolki.onwheel = that.zmianaGlosnosci.bind(that);
				that.kontrolki.volumeSlider.addEventListener("click", function(e){ e.stopPropagation() }, false);
				that.kontrolki.mute.addEventListener("click", that.muteUnmute.bind(that), false);
				that.kontrolki.volumeRange.onchange = that.zmianaGlosnosci.bind(that);
				// that.kontrolki.addEventListener("click", function(e){ e.stopPropagation() }, false);
				that.kontrolki.fsButton.onclick = that.toggleFullScreen.bind(that);
				that.video.ondblclick = that.toggleFullScreen.bind(that);
				
			},
			
			reszta: function(that){
				
				that.kontrolki.playpause.onclick = that.togglePlay.bind(that);
				that.video.onclick = that.togglePlay.bind(that);
				that.videoKontener.addEventListener("keypress", function(e){ console.log(e); if(e.keyCode === 32){ that.togglePlay() } }.bind(that), false);
				that.kontrolki.stop.addEventListener("click", that.stopFilm.bind(that), false);
				that.video.addEventListener("timeupdate", that.sledzeniePostepu.bind(that), false);
				that.kontrolki.videoProgressRange.onchange = that.scrollPlayback.bind(that);
				that.video.onended = that.koniecFilmu.bind(that)
				
			}
		},
		
		koniecFilmu: function(){
			
			this.video.currentTime = 0;
			this.video.paused = true;
			this.faToggle("playpause", ["fa-play"], false)
			
		},
		
		toggleFullScreen: function(){
			// (NIEUDANE) PODEJŚCIE DO CROSS-BROWSER FULL SCREEN
			
			// var _onFSchange = document.onfullscreenchange || document.onwebkitfullscreenchange || document.onmozfullscreenchange || document.MSFullscreenChange,
				// _isFS = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || window.screenTop == 0,
				// _FSon = this.videoKontener.requestFullscreen || this.videoKontener.webkitRequestFullscreen || this.videoKontener.mozRequestFullScreen || this.videoKontener.msRequestFullscreen,
				// _FSoff = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
			
			// _onFSchange = function(){ this.faToggle("fsButton", ["fa-arrows-alt", "fa-compress"], false); }.bind(this);
			
			// (!_isFS && _FSon()); (_isFS && _FSoff()); !! DLA FF DZIAŁA _FSon PRZY _FSon = this.videoKontener.webkitRequestFullscreen();
			
			// ****************************************
			
			if(document.mozFullScreen != undefined){
			
			document.onmozfullscreenchange = function(){ this.faToggle("fsButton", ["icon-enlarge", "icon-shrink"], false); }.bind(this);
			
			(!document.mozFullScreen && this.videoKontener.mozRequestFullScreen());
			(document.mozFullScreen && document.mozCancelFullScreen());
			
			} else if(document.webkitFullscreenEnabled){
			
			document.onwebkitfullscreenchange = function(){ this.faToggle("fsButton", ["icon-enlarge", "icon-shrink"], false); }.bind(this);
			
			(!document.webkitIsFullScreen && this.videoKontener.webkitRequestFullscreen());
			(document.webkitIsFullScreen && document.webkitExitFullscreen());
			
			} else { alert("Na razie nie działa!") }
			
		},
		
		scrollPlayback: function(){
			
			this.video.currentTime = this.kontrolki.videoProgressRange.value / 100 * this.video.duration;
			
		},
		
		sledzeniePostepu: function(e){
			
			this.kontrolki.videoProgressRange.value = ( this.video.currentTime / this.video.duration * 100 || "0" );
			
			var _dateObj = new Date(this.video.currentTime * 1000),
				_czas = ( _dateObj.toUTCString().split(" ")[4] || "00:00:00" );
			
			this.kontrolki.timeProgress.innerHTML = _czas;
		},
		
		stopFilm: function(){
			this.video.src = "";
			this.ustawDlugosc();
			this.sledzeniePostepu();
			this.faToggle("playpause", ["icon-play3"], false)
			this.zablokujKontrolki();
		},
		
		togglePlay: function(){
			
			this.video.paused ? this.video.play() : this.video.pause();
			this.faToggle("playpause", ["icon-play3", "icon-pause2"], false)
			
		},
		
		zmianaGlosnosci: function(e){

			if(e){ e.preventDefault(); this.kontrolki.volumeSlider.style.display = "block" }
			
			if(e.deltaY < 0){
				clearTimeout(_wheelTOut);
				this.kontrolki.volumeRange.value = parseInt(this.kontrolki.volumeRange.value) + 5;
				var _wheelTOut = setTimeout(function(){ this.kontrolki.volumeSlider.style.display = ""; clearTimeout(_wheelTOut) }, 2500)
			} else if(e.deltaY > 0){
				clearTimeout(_wheelTOut);
				this.kontrolki.volumeRange.value -= 5;
				var _wheelTOut = setTimeout(function(){ this.kontrolki.volumeSlider.style.display = ""; clearTimeout(_wheelTOut) }, 2500)
			}
			
			this.video.volume = this.kontrolki.volumeRange.value / 100 ;
			
			if(this.video.muted){
				this.faToggle("mute", ["icon-volume-medium", "icon-volume-mute2"], true);
				this.video.muted = false;
			}
			
			if(this.video.volume === 0) this.muteUnmute()
		},
		
		muteUnmute: function(){
			this._volPreMute = !(this.video.muted) ? this.video.volume * 100 : this._volPreMute;
			
			this.video.muted = !(this.video.muted);
			
			this.faToggle("mute", ["icon-volume-medium", "icon-volume-mute2"], true);
			
			this.kontrolki.volumeRange.value = this.video.muted ? "0" : this._volPreMute;
		},
		
		faToggle: function(el, onOff, bool){
			(bool && this.kontrolki[el].classList.toggle("pressed"))
			
			var i = this.kontrolki[el].querySelector("i")
			
			onOff.length === 1 ? i.classList = "ic " + onOff[0] :
			
			i.outerHTML = (i.outerHTML.includes(onOff[0])? i.outerHTML.replace(onOff[0], onOff[1]) : i.outerHTML.replace(onOff[1], onOff[0]));
		},
		
		odblokujKontrolki: function(){
			
			for(el in this.kontrolki){
				try { if(this.kontrolki.hasOwnProperty(el) && this.kontrolki[el].dataset.disable == "true"){
					this.kontrolki[el].classList.remove("disabled");
				};} catch(e) { console.log("\"" + el + "\" nie ma atrybutu \"classList\" ponieważ jego typ to: " + (typeof this.kontrolki[el])) }
			};
			
			var _FSenabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
			if (!_FSenabled) this.kontrolki.fsButton.classList.add("disabled")
			
			this.przypiszZdarzenia.reszta(this);
			
		},
		
		zablokujKontrolki: function(){
			
			for(el in this.kontrolki){
				try { if(this.kontrolki.hasOwnProperty(el) && this.kontrolki[el].dataset.disable == "true"){
					this.kontrolki[el].classList.add("disabled");
				};} catch(e) { console.log("\"" + el + "\" nie ma atrybutu \"classList\" ponieważ jego typ to: " + (typeof this.kontrolki[el])) }
			};			
		},
		
		ustawDlugosc: function(){
			var _dateObj = new Date(this.video.duration * 1000),
				_czas = ( _dateObj.toUTCString().split(" ")[4] || "00:00:00" );
			
			this.kontrolki.timeDuration.innerHTML = _czas;
		},
		
		otwieranieNowychFilmow: function(){			
			this.kontrolki.videoInput.click();
			
			this.video.onloadeddata = function(){
				this.ustawDlugosc();
				this.kontrolki.stop.classList.contains("disabled") ? this.odblokujKontrolki() : this.faToggle("playpause", ["icon-play3"], false);
				this.videoKontener.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
				window.URL.revokeObjectURL(this.url)
			}.bind(this)
			
			this.kontrolki.videoInput.onchange = function(e){
				if(this.kontrolki.videoInput.files[0].type != ("video/mp4" || "video/webm" || "video/ogg")){ alert("Odtwarzacz obsługuje tylko pliki w formatach MP4, OGG i WEBM."); return }
				
				this.url = window.URL.createObjectURL(this.kontrolki.videoInput.files[0])
				
				this.video.src = this.url;
				
				if(this.video.duration === NaN){ alert("Coś nie tak. Spróbuj z innym filmem"); return }
			}.bind(this);
		},
		
		init: function(){
			
			this.videoKontener = document.querySelector("#videoKontener");
			this.video = document.querySelector("#videoBox");
			this.kontrolki = document.querySelector("#kontrolki");
			
			if(!document.createElement("video").canPlayType) {
				this.kontrolki.style.display = "none";

				return;
			};
			
			this.kontrolki.playpause = document.querySelector("#playpause");
			this.kontrolki.stop = document.querySelector("#stop");
			this.kontrolki.videoProgressRange = document.querySelector("#videoProgressRange");
			this.kontrolki.timer = document.querySelector("#timer");
			this.kontrolki.timeProgress = document.querySelector("#timeProgress");
			this.kontrolki.timeDuration = document.querySelector("#timeDuration");
			this.kontrolki.eject = document.querySelector("#eject");
			this.kontrolki.videoInput = document.querySelector("#videoInput");
			this.kontrolki.mute = document.querySelector("#mute");
			this.kontrolki.volumeSlider = document.querySelector("#volumeSlider");
			this.kontrolki.volumeRange = document.querySelector("#volumeRange");
			this.kontrolki.fsButton = document.querySelector("#fs");
			
			this.kontrolki.videoProgressRange.value = "0";
			
			this.zablokujKontrolki();
			this.kontrolkiToggler();
			this.przypiszZdarzenia.init(this);
			this.zmianaGlosnosci(false);
		}
		
	}
	
	
	filmPlayer.init()
	
};