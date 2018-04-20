// revoke.URL, scroll do podstawy playera po załadowaniu filmu

window.onload = function(){
	
	var filmPlayer = {
				
		controlsToggler: function(){
			
			this.videoWrapper.onmouseover = function(){
				this.controls.style.opacity = 1;
				this.videoWrapper.dataset.hovered = "true";
				clearTimeout(this.controls.controlsOut)
			}.bind(this);
			
			this.videoWrapper.onmouseout = function(){
				this.videoWrapper.dataset.hovered = "false";
				this.controls.controlsOut = setTimeout(function(){ this.controls.style.opacity = ""; clearTimeout(this.controls.controlsOut)}, 1000);
			}.bind(this);
			
			(this.controls.mute || this.controls.volumeSlider).onmouseover = function(){
				this.controls.volumeSlider.style.display = "block";
			}.bind(this);
			
			(this.controls.mute || this.controls.volumeSlider).onmouseout = function(){
				this.controls.volumeSlider.style.display = "none";
			}.bind(this);
			
		},
		
		assignEvents: {
		
			init: function(that){
				
				that.controls.eject.onclick = that.ejectHandler.bind(that);
				that.video.onwheel = that.volumeChange.bind(that);
				that.controls.onwheel = that.volumeChange.bind(that);
				that.controls.volumeSlider.addEventListener("click", function(e){ e.stopPropagation() }, false);
				that.controls.mute.addEventListener("click", that.muteUnmute.bind(that), false);
				that.controls.volumeRange.onchange = that.volumeChange.bind(that);
				// that.controls.addEventListener("click", function(e){ e.stopPropagation() }, false);
				that.controls.fsButton.onclick = that.toggleFullScreen.bind(that);
				that.video.ondblclick = that.toggleFullScreen.bind(that);
				
			},
			
			videoLoaded: function(that){
				
				that.controls.playpause.onclick = that.togglePlay.bind(that);
				that.video.onclick = that.togglePlay.bind(that);
				that.videoWrapper.addEventListener("keypress", function(e){ console.log(e); if(e.keyCode === 32){ that.togglePlay() } }.bind(that), false);
				that.controls.stop.addEventListener("click", that.stopFilm.bind(that), false);
				that.video.addEventListener("timeupdate", that.trackProgress.bind(that), false);
				that.controls.videoProgressRange.onchange = that.scrollPlayback.bind(that);
				that.video.onended = that.videoEnded.bind(that)
				
			}
		},
		
		videoEnded: function(){
			
			this.video.currentTime = 0;
			this.video.paused = true;
			this.faToggle("playpause", ["fa-play"], false)
			
		},

		handleFullScreenChange: function(){
			this.faToggle("fsButton", ["icon-enlarge", "icon-shrink"], false);

			this.videoWrapper.classList.toggle("full-screen");
		},
		
		toggleFullScreen: function(){
			// CROSS-BROWSER FULL SCREEN HANDLING ATTEMPT

			var _isFS = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || window.innerHeight === screen.height;

			if(_isFS){ document[this._exitFS](); } else { this.videoWrapper[this._requestFS](); };
		},
		
		scrollPlayback: function(){
			
			this.video.currentTime = this.controls.videoProgressRange.value / 100 * this.video.duration;
			
		},
		
		trackProgress: function(e){
			
			this.controls.videoProgressRange.value = ( this.video.currentTime / this.video.duration * 100 || "0" );
			
			var _dateObj = new Date(this.video.currentTime * 1000),
				_czas = ( _dateObj.toUTCString().split(" ")[4] || "00:00:00" );
			
			this.controls.timeProgress.innerHTML = _czas;
		},
		
		stopFilm: function(){
			this.video.src = "";
			this.setDuration();
			this.trackProgress();
			this.faToggle("playpause", ["icon-play3"], false)
			this.blockControls();
		},
		
		togglePlay: function(){
			
			this.video.paused ? this.video.play() : this.video.pause();
			this.faToggle("playpause", ["icon-play3", "icon-pause2"], false)
			
		},
		
		volumeChange: function(e){

			if(e){ e.preventDefault(); this.controls.volumeSlider.style.display = "block" }
			
			if(e.deltaY < 0){
				clearTimeout(_wheelTOut);
				this.controls.volumeRange.value = parseInt(this.controls.volumeRange.value) + 5;
				var _wheelTOut = setTimeout(function(){ this.controls.volumeSlider.style.display = ""; clearTimeout(_wheelTOut) }, 2500)
			} else if(e.deltaY > 0){
				clearTimeout(_wheelTOut);
				this.controls.volumeRange.value -= 5;
				var _wheelTOut = setTimeout(function(){ this.controls.volumeSlider.style.display = ""; clearTimeout(_wheelTOut) }, 2500)
			}
			
			this.video.volume = this.controls.volumeRange.value / 100 ;
			
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
			
			this.controls.volumeRange.value = this.video.muted ? "0" : this._volPreMute;
		},
		
		faToggle: function(el, onOff, bool){
			(bool && this.controls[el].classList.toggle("pressed"))
			
			var i = this.controls[el].querySelector("i")
			
			onOff.length === 1 ? i.classList = "ic " + onOff[0]
							   : i.outerHTML = (i.outerHTML.includes(onOff[0]) ? i.outerHTML.replace(onOff[0], onOff[1])
							   												   : i.outerHTML.replace(onOff[1], onOff[0]));
		},
		
		unblockControls: function(){
			
			for(el in this.controls){
				try { if(this.controls.hasOwnProperty(el) && this.controls[el].dataset.disable == "true"){
					this.controls[el].classList.remove("disabled");
				};} catch(e) { console.log("\"" + el + "\" does not contain \"classList\" property because its type is: " + (typeof this.controls[el])) }
			};
			
			var _FSenabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
			if (!_FSenabled) this.controls.fsButton.classList.add("disabled")
			
			this.assignEvents.videoLoaded(this);
			
		},
		
		blockControls: function(){
			
			for(el in this.controls){
				try { if(this.controls.hasOwnProperty(el) && this.controls[el].dataset.disable == "true"){
					this.controls[el].classList.add("disabled");
				};} catch(e) { console.log("\"" + el + "\" does not contain \"classList\" property because its type is: " + (typeof this.controls[el])) }
			};			
		},
		
		setDuration: function(){
			var _dateObj = new Date(this.video.duration * 1000),
				_czas = ( _dateObj.toUTCString().split(" ")[4] || "00:00:00" );
			
			this.controls.timeDuration.innerHTML = _czas;
		},
		
		ejectHandler: function(){			
			this.controls.videoInput.click();
			
			this.video.onloadeddata = function(){
				this.setDuration();
				this.controls.stop.classList.contains("disabled") ? this.unblockControls() : this.faToggle("playpause", ["icon-play3"], false);
				this.videoWrapper.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
				window.URL.revokeObjectURL(this.url)
			}.bind(this)
			
			this.controls.videoInput.onchange = function(e){
				if(this.controls.videoInput.files[0].type != ("video/mp4" || "video/webm" || "video/ogg")){ alert("This player supports only MP4, OGG and WEBM files."); return }
				
				this.url = window.URL.createObjectURL(this.controls.videoInput.files[0])
				
				this.video.src = this.url;
				
				if(Boolean(this.video.duration)){ alert("Cannot read duration of video. Try loading a different file."); return }
			}.bind(this);
		},

		initializeFullScreen: function(){
						
			if(!document.fullscreenEnabled
				&& !document.webkitFullscreenEnabled 
				&& !document.mozFullScreenEnabled 
				&& !document.msFullscreenEnabled){

					return;
			}

			var _fsLookup = {
				change: ["onfullscreenchange", "onwebkitfullscreenchange", "onmozfullscreenchange", "MSFullscreenChange"],
				request: ["requestFullscreen", "webkitRequestFullscreen", "mozRequestFullScreen", "msRequestFullscreen"],
				exit: ["exitFullscreen", "webkitExitFullscreen", "mozCancelFullScreen", "msExitFullscreen"]
			},
				_onFSchange = _fsLookup.change.filter( function(el){ return document[el] !== undefined  } )[0];

			this._requestFS = _fsLookup.request.filter( function(el){ return this.videoWrapper[el] !== undefined } )[0];
			this._exitFS = _fsLookup.exit.filter( function(el){ return document[el] !== undefined } )[0];
			
			document[_onFSchange] = this.handleFullScreenChange.bind(this);

			this.controls.fsButton = document.querySelector("#fs");
		},

		init: function(){
			
			this.videoWrapper = document.querySelector("#videoWrapper");
			this.video = document.querySelector("#videoBox");
			this.controls = document.querySelector("#controls");
			
			if(!document.createElement("video").canPlayType) {
				this.controls.style.display = "none";

				return;
			};
			
			this.controls.playpause = document.querySelector("#playpause");
			this.controls.stop = document.querySelector("#stop");
			this.controls.videoProgressRange = document.querySelector("#videoProgressRange");
			this.controls.timer = document.querySelector("#timer");
			this.controls.timeProgress = document.querySelector("#timeProgress");
			this.controls.timeDuration = document.querySelector("#timeDuration");
			this.controls.eject = document.querySelector("#eject");
			this.controls.videoInput = document.querySelector("#videoInput");
			this.controls.mute = document.querySelector("#mute");
			this.controls.volumeSlider = document.querySelector("#volumeSlider");
			this.controls.volumeRange = document.querySelector("#volumeRange");
			
			this.controls.videoProgressRange.value = "0";
			
			this.initializeFullScreen();
			this.blockControls();
			this.controlsToggler();
			this.assignEvents.init(this);
			this.volumeChange(false);
		}
		
	}
	
	
	filmPlayer.init()
	
};