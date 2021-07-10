score = 0;
cross = true;

jump = new Audio('jump.mp3');
music = new Audio('music.mp3');
move = new Audio('move.mp3');
caught = new Audio('caught.mp3');

setTimeout(() => {
    music.play();
}, 1000);
document.onkeydown = function(e){
    console.log("key code: " , e.keyCode)
    if(e.keyCode == 38){
        player = document.querySelector('.player');
        player.classList.add('playerAni')
        jump.play();
        setTimeout(()=>{
            player.classList.remove('playerAni')
        },700);
    }
    if(e.keyCode == 39){
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = (playerX + 100) + 'px'; 
        move.play();
    }
    if(e.keyCode == 37){
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
        player.style.left = (playerX - 100) + 'px'; 
        move.play();
    }
}

setInterval(()=>{

    player = document.querySelector('.player');
    enemy = document.querySelector('.enemy');
    subcont = document.querySelector('.subcont');

    ox = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(player,null).getPropertyValue('top'));

    ex = parseInt(window.getComputedStyle(enemy,null).getPropertyValue('left'));
    ey = parseInt(window.getComputedStyle(enemy,null).getPropertyValue('top'));

    offsetX = Math.abs(ex - ox);
    offsetY = Math.abs(ey - oy);
    
    // Player and enemy collides and GameOver
    if (offsetX < 100 && offsetY < 100){
        enemy.classList.remove('enemyAni')
        subcont.innerHTML = "Gameover - Reload to Try Again"
        caught.play();
        setTimeout(() => {
            caught.pause();
            music.pause();
        }, 1000);
        player.classList.add('endAni');
    }
    
    // Player crosses enemy successfully and score increased by 1
    else if (offsetX < 50 && cross ){
        score += 1 ;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
    }
},10)

function updateScore(score) {
    scorecont.innerHTML = "Your score : " + score
}