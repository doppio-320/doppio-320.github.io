function setFrame1() {
    document.getElementById("frame1").style.display = "initial";
    document.getElementById("frame2").style.display = "none";
    document.getElementById("frame3").style.display = "none";

    setTimeout(function(){
        setFrame2();
    }, 150);
}

function setFrame2() {
    document.getElementById("frame1").style.display = "none";
    document.getElementById("frame2").style.display = "initial";
    document.getElementById("frame3").style.display = "none";

    setTimeout(function(){
        setFrame3();
    }, 150);
}

function setFrame3() {
    document.getElementById("frame1").style.display = "none";
    document.getElementById("frame2").style.display = "none";
    document.getElementById("frame3").style.display = "initial";

    setTimeout(function(){
        setFrame1();
    }, 150);
}