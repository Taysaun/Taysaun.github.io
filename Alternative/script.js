        //link to server.js
        // var socket = io.connect('http://localhost:3000');
        //listen for the message
        // import { io } from "../socket.io-client";
        
        const socket = io("http://localhost:3000");


        var BACKSTYLE = document.body.style;

        document.getElementById("search").style.display = "none";

        BACKSTYLE.backgroundColor = "";

        document.getElementById("submit").addEventListener("click", function() {
            socket.emit("newPlayer", document.getElementById("name").value);
            document.getElementById("name").style.display = "none";
            document.getElementById("submit").style.display = "none";
            document.getElementById("search").style.display = "block";
            socket.on("enough", () => {
                document.getElementById("search").style.display = "none";
                BACKSTYLE.backgroundColor = "red";
                if (BACKSTYLE.backgroundColor === "red") {
                    let changeColor = () => {
                            BACKSTYLE.backgroundColor = "green";
                            return;
                        }
                        var timer;
                        var hour = 0o0; 
                        var minute = 0o0; 
                        var second = 0o0; 
                        var count = 0o0; 
                        var hrString;
                        var minString;
                        var secString;
                        var countString;
                        timer = true; 
                        function stopWatch() { 
                            if (timer) { 
                                count++; 
                        
                                if (count == 100) { 
                                    second++; 
                                    count = 0; 
                                } 
                        
                                if (second == 60) { 
                                    minute++; 
                                    second = 0; 
                                } 
                        
                                if (minute == 60) { 
                                    hour++; 
                                    minute = 0; 
                                    second = 0; 
                                } 
                        
                                hrString = hour; 
                                minString = minute; 
                                secString = second; 
                                countString = count; 
                        
                                if (hour < 10) { 
                                    hrString = "0" + hrString; 
                                } 
                        
                                if (minute < 10) { 
                                    minString = "0" + minString; 
                                } 
                        
                                if (second < 10) { 
                                    secString = "0" + secString; 
                                } 
                        
                                if (count < 10) { 
                                    countString = "0" + countString; 
                                } 
                        
                                document.getElementById('hr').innerHTML = hrString; 
                                document.getElementById('min').innerHTML = minString; 
                                document.getElementById('sec').innerHTML = secString; 
                                document.getElementById('count').innerHTML = countString; 
                                setTimeout(stopWatch, 10); 
                            } 
                    }; 
                    document.body.addEventListener('click', function () { 
                        timer = false; 
                        var stopValue = countString + secString*100 + minString*100*60 + hrString*100*60*60;
                        console.log(stopValue)
                        socket.emit("finish", stopValue);
                    }); 
                    setTimeout(()=>{
                        changeColor();
                        stopWatch(); 
                        }, (Math.random() * 6000) + 4000);
                    }
                    // start a stopwatch
                    
                        
                        // resetBtn.addEventListener('click', function () { 
                        //     timer = false; 
                        //     hour = 0; 
                        //     minute = 0; 
                        //     second = 0; 
                        //     count = 0; 
                        //     document.getElementById('hr').innerHTML = "00"; 
                        //     document.getElementById('min').innerHTML = "00"; 
                        //     document.getElementById('sec').innerHTML = "00"; 
                        //     document.getElementById('count').innerHTML = "00"; 
                        // }); 
                    
                
                }
                );
            })
            document.body.addEventListener("click", function() {
                if (BACKSTYLE.backgroundColor === "green") {
                    BACKSTYLE.backgroundColor = "";
                }
            });
            socket.on("winner", (message) => {
                document.getElementById("winmess").innerHTML = message;
            });
            socket.on("loser", (message) => {
                document.getElementById("losemess").innerHTML = message;
            });

        