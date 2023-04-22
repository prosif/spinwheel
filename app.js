const canvas = document.getElementById('main');
const ctx = canvas.getContext("2d", {alpha: false});

let spinning = false;

const mainScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 255)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 255)';
    ctx.font = '20vw ayo';
    
    const topText = 'Press the cookie';
    const bottomText = 'Win a prize';

    const topTextInfo = ctx.measureText(topText);
    const bottomTextInfo = ctx.measureText(bottomText);

    const topTextStartX = (canvas.width / 2) - (topTextInfo.width / 2);
    const topTextStartY = (canvas.height / 3);
    ctx.fillText(topText, topTextStartX, topTextStartY); 
    
    const bottomTextStartX = (canvas.width / 2) - (bottomTextInfo.width / 2);
    const bottomTextStartY = 2 * (canvas.height / 3);
    ctx.fillText(bottomText, bottomTextStartX, bottomTextStartY); 
};

const resizeCanvas = () => {
    canvas.width = 2 * window.innerWidth;
    canvas.height = 2 * window.innerHeight;
    canvas.style.width = (.5 * canvas.width) + 'px';
    canvas.style.height = (.5 * canvas.height) + 'px';
    if (!spinning) {
        mainScreen();
    }
}

const shuffle = (arr) => {
    let randomIndex = 0;

    let currentIndex = arr.length;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        let oldVal = Object.assign({}, arr[currentIndex]);
        let newVal = Object.assign({}, arr[randomIndex]);

        arr[currentIndex] = newVal;
        arr[randomIndex] = oldVal;
    }

    return arr;
};

let flashingInterval;

const renderWheel = (option, shouldFlash) => {
    const doRender = (textColor) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 255)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor;
        ctx.font = option.text.length > 20 ? (option.text.length > 30 ? '10vw ayo' : '12vw ayo') : '16vw ayo';

        const textInfo = ctx.measureText(option.text);

        const textStartX = (canvas.width / 2) - (textInfo.width / 2);
        const textStartY = (canvas.height / 2) + 10;
        ctx.fillText(option.text, textStartX, textStartY); 


        if (shouldFlash) {
            ctx.fillStyle = 'rgba(0, 0, 0, 255)';
            ctx.font = '14vw ayo';
            const wonTextStartX = (canvas.width / 2) - (ctx.measureText('You won').width / 2);
            const wonTextStartY = (canvas.height / 3) - 10;
            ctx.fillText('You won', wonTextStartX, wonTextStartY);
        }
    }

    if (shouldFlash) {
        let flip = false;
        flashingInterval = setInterval(() => {
            flip = !flip;
            doRender(flip ? option.color : '#fcd303');
        }, 250);
    } else {
        doRender(option.color);
    }
};

const spin = () => {
    if (spinning) {
        return;
    }
    
    if (flashingInterval) {
        clearInterval(flashingInterval);
    }

    spinning = true;

    const options = [
    {
        text: 'Free delivery on any online order',
        color: '#fc4103',
        chance: 15
    },
    {
        text: '10% off online order',
        color: '#c2fc03',
        chance: 20
    },
    {
        text: '$10 off online order of $30',
        color: '#03fcb1',
        chance: 5
    },
    {
        text: 'Free full-sized cookie',
        color: '#7f03fc',
        chance: 5
    },
    {
        text: 'Free mini cookie',
        color: '#7f03fc',
        chance: 10
    }, 
    {
        text: 'Free laptop sticker',
        color: '#fc0330',
        chance: 25
    },
    {
        text: '2 cookies for $4',
        color: '#fc0330',
        chance: 20
    }];

    const cycles = 14;

    const finish = () => {
        cycleCount = 0;
        setTimeout(() => {
            spinning = false;
            clearInterval(flashingInterval);
            mainScreen();
        }, 5000);
    };

    let cycleCount = 0;

    // distribute options in an array
    let actualOptions = [];
    options.forEach(option => {
        for (let i = 0; i < option.chance; i++) {
            actualOptions.push(Object.assign({}, option));
        }
    });
    
    // shuffle 1000 times lol
    for (let i = 0; i < 1000; i++) {
        actualOptions = shuffle(actualOptions);
    }
 
    const cycle = () => {
        if (cycleCount < cycles) {
            let optionIndex = Math.floor(Math.random() * (cycleCount + 1 === cycles ? actualOptions : options).length);
            const optionsToUse = cycleCount + 1 === cycles ? actualOptions : options;
            const option = optionsToUse[optionIndex];
            renderWheel(option, cycleCount + 1 === cycles);

            cycleCount++;
            
            let timeout = 300;

            if (cycleCount < 6) {
                timeout = 200;
            }

            setTimeout(cycle, 250);
        } else {
            finish();
        }
    }

    cycle();

};

setTimeout(() => {
    resizeCanvas();
}, 1000);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        spin();
    }
});

window.addEventListener('resize', resizeCanvas);

