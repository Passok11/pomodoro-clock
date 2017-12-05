
function pomodoroClock(DEFAULT_POMODORO, DEFAULT_REST){
  var pomodoro = DEFAULT_POMODORO;
  var rest = DEFAULT_REST;
  var seconds = pomodoro;
  var pomodoroInterval;
  var isActive = false;
  var isRestMode = false;

  //DOM Manipulation
  $('.timer').append(convertTime(seconds));
  $('.pomodoro-total').append(convertTime(pomodoro));
  $('.rest-total').append(convertTime(rest));
  $('.btn-start').click(pomodoroStart);
  $('.btn-pause').click(pomodoroPause);
  $('.btn-reset').click(pomodoroReset);
  $('.btn-plus-pomodoro').click(function(){ changePomodoroTime(1, true)});
  $('.btn-minus-pomodoro').click(function(){ changePomodoroTime(-1,true)});
  $('.btn-plus-rest').click(function(){ changePomodoroTime(1, false)});
  $('.btn-minus-rest').click(function(){ changePomodoroTime(-1, false)});

  function pomodoroStart(){
    if(!isActive){
      isActive = true;
      pomodoroInterval = setInterval(function(){
        seconds--;
        updatePomodoro(seconds);
        if(seconds === 0){
          pomodoroPause();
          changeMode();
        }
      },1000);
    }else{
      pomodoroPause();
    }
  };
  function changeMode(){
    pomodoroAlert();
    isRestMode = !isRestMode;
    if(isRestMode){
      seconds = rest;
    }else{ seconds = pomodoro; }
    updatePomodoro(seconds);
    pomodoroStart();
  };

  function pomodoroAlert(){
    var audio = new Audio('audio/magic_immune.mp3');
    audio.play();
    alert('TIME IS OVER');
  };

  function pomodoroPause(){
    isActive = false;
    clearInterval(pomodoroInterval);
  };

  function pomodoroReset(){
    pomodoroPause();
    if(isRestMode){
      seconds = rest;
      updatePomodoro(rest);
    }else{
      seconds = pomodoro;
      updatePomodoro(pomodoro);
    }
  };

  function changePomodoroTime(minutes, isPomodoro){
    if(isPomodoro){
      pomodoro = pomodoro + ( minutes * 60);
      $('.pomodoro-total').empty();
      $('.pomodoro-total').append(convertTime(pomodoro));

    }else{
      rest = rest + ( minutes * 60);
      $('.rest-total').empty();
      $('.rest-total').append(convertTime(rest));
    }
    pomodoroReset();
  };
  function updatePomodoro(newValue){
    $('.timer').empty();
    $('.timer').append(convertTime(newValue));
  };

  function convertTime(seconds){
    //Convert seconds to HH:MM:SS
    //TODO: remove the hours if have no hours;
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

}


const DEFAULT_REST = 300;
const DEFAULT_POMODORO = 30;
pomodoroClock(DEFAULT_POMODORO, DEFAULT_REST);
