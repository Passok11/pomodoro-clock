
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
      },100);
    }else{
      pomodoroPause();
    }
  };
  function changeMode(){
    isRestMode = !isRestMode;
    pomodoroChange();
    if(isRestMode){
      seconds = rest;
    }else{ seconds = pomodoro; }
    updatePomodoro(seconds);
  };

  function pomodoroChange(){
    $('.mode-name').empty();
    if(isRestMode){
      $('.mode-name').append('Rest');
    }else{ $('.mode-name').append('Pomodoro'); }
    //audio alert
    var audio = new Audio('audio/magic_immune.mp3');
    audio.play();
    //make screen blink for 5 seconds
    var blinkInterval = setInterval(function(){
      $('body').toggleClass( "rest-body" );
    },500)
    setTimeout(function(){
      clearInterval(blinkInterval);
      //change colors
      if(isRestMode){
        $('body').addClass( "rest-body" );
      }else{
        $('body').removeClass()( "rest-body" )
      }
      $('.timer-circle').toggleClass("rest-circle");
      pomodoroStart();
    },5000)

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
    if(isPomodoro && !((pomodoro + minutes) === 59)){
      pomodoro = pomodoro + ( minutes * 60);
      $('.pomodoro-total').empty();
      $('.pomodoro-total').append(convertTime(pomodoro));

    }else if(!isPomodoro && !((rest + minutes) === 59)){
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


const DEFAULT_REST = 5 * 60;
const DEFAULT_POMODORO =  25 * 60;
pomodoroClock(DEFAULT_POMODORO, DEFAULT_REST);
