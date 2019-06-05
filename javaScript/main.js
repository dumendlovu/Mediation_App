const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const movingOutline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  const sounds = document.querySelectorAll('.sound-picker button');

  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');

  const outlineLength = movingOutline.getTotalLength();
  //Duration
  let duration = 10;

  movingOutline.style.strokeDasharray = outlineLength;
  movingOutline.style.strokeDashoffset = outlineLength;

  //pick sounds
  sounds.forEach( (sound) => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlayed(song);
    });
  });

  //play button action
  play.addEventListener('click', () => {
    checkPlayed(song);
  });

  //sound selection
  timeSelect.forEach( (option) => {
    option.addEventListener('click', function(){
      duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    });
  });

  const checkPlayed = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "/img/svg/pause.svg";
    }
    else {
      song.pause();
      video.pause();
      play.src = "/img/svg/play.svg";
    }
  }

  //Circle animation
  song.ontimeupdate = (outineLength) => {
    let currentTime = song.currentTime;
    let elasped = duration - currentTime;
    let seconds = Math.floor(elasped % 60);
    let minutes = Math.floor(elasped / 60);

    //progressBar animation
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    movingOutline.style.strokeDasharray = progress;

    //Timer text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    //stop
    if(currentTime >= duration){
      song.pause();
      song.currentTime = 0;
      play.src = "/img/svg/play.svg";
      video.pause();
    }
  }
}

app();
