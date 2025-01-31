
    let displayTime = document.querySelector(".time");
    let displayTimeMilli = document.querySelector(".milli");
    let [millisec,seconds,minutes,hours] = [0,0,0,0]
    let resetbtn = document.querySelector(".reset");
    let playbtn = document.querySelector(".pl");
    let lapbtn = document.querySelector(".lap");
    let timer = null;
    let plTracker = true;
    let lapTracker = 0;
    let lapcontainer = document.querySelector(".lap-container");
    
    var li;
 

function stopwatch(){
    millisec++;
    if(millisec == 60){
        millisec = 0;
        seconds ++;
        if(seconds == 60){
            seconds = 0;
            minutes ++;
            if(minutes ==60){
                minutes = 0;
                hours ++;
            } 
        }
    }
    display();
};

const display = () =>{

    let h = hours<10 ? "0"+hours : hours;
    let m = minutes<10 ? "0"+minutes : minutes;
    let s = seconds<10 ? "0"+seconds : seconds;
    let mi = millisec<10 ? "0"+millisec : millisec;

    displayTime.innerHTML = h + ": "+m+": "+s;
    displayTimeMilli.innerHTML = mi;
}

const watchStart = () => {
    if(plTracker){
        timer = setInterval(stopwatch,10);
        playbtn.classList.remove("pl");
        playbtn.classList.add("ps");
        playbtn.innerText = "Pause";
        plTracker = false;
    }
    else{
        watchStop();
        playbtn.classList.remove("ps");
        playbtn.classList.add("pl");
        playbtn.innerText = "Play";
        plTracker = true;
    }
};

const watchStop =()=>{//put inside watchstart
    clearInterval(timer); //pause the stopwatch
}

const watchReset =()=>{
    clearInterval(timer);
    [millisec,seconds,minutes,hours] = [0,0,0,0];
    display();


    playbtn.classList.remove("ps");
    playbtn.classList.add("pl");
    playbtn.innerText = "Play";
    plTracker = true;

    while(lapTracker!==0){   //solved finally
        let liDelete = document.querySelector("li");  //every time redeclare the remaining li
        liDelete.remove();
    }
    
}

const watchLap =() => {

    li = document.createElement("li");
    var ul = document.querySelector(".lap-container");
    ul.append(li);
    

    let h = hours<10 ? "0"+hours : hours;
    let m = minutes<10 ? "0"+minutes : minutes;
    let s = seconds<10 ? "0"+seconds : seconds;
    let mi = millisec<10 ? "0"+millisec : millisec;

    li.innerText = h + ": "+m+": "+s+": "+mi;

    lapTracker++;
    
    lapcontainer.scrollTop = lapcontainer.scrollHeight;  //To scroll to the latest laps

    
}

playbtn.addEventListener("click",watchStart);
resetbtn.addEventListener("click",watchReset);
lapbtn.addEventListener("click",watchLap);



