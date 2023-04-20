const canvas = document.getElementById('main');
const ctx = canvas.getContext("2d", {alpha: false});

const resizeCanvas = () => {
    canvas.width = 2 * window.innerWidth;
    canvas.height = 2 * window.innerHeight;
    canvas.style.width = (.5 * canvas.width) + 'px';
    canvas.style.height = (.5 * canvas.height) + 'px';
}

resizeCanvas();

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

//        [arr[currentIndex], arr[randomIndex]]
    }

    return arr;
};

let flashingInterval;

const renderWheel = (option, shouldFlash) => {
    const doRender = (textColor) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 255)';//option.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor;
        ctx.font = '16vw ayo';//sans-serif';

        const textInfo = ctx.measureText(option.text);

        const textStartX = (canvas.width / 2) - (textInfo.width / 2);
        const textStartY = (canvas.height / 2);
        ctx.fillText(option.text, textStartX, textStartY); 
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

let spinning = false;

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
        text: '$1 off purchase',
        color: '#fc4103',
        chance: 35
    },
    {
        text: 'Free mega sticker',
        color: '#c2fc03',
        chance: 35
    },
    {
        text: 'Free mini cookie',
        color: '#03fcb1',
        chance: 20
    },
    {
        text: 'Free full-sized cookie',
        color: '#7f03fc',
        chance: 5
    },
    {
        text: '$5 gift card',
        color: '#fc0330',
        chance: 0
    }];

    const cycles = 14;

    const finish = () => {
        //setTimeout(() => {
            spinning = false;
            cycleCount = 0;
        //}, 5000);
    };

    let cycleCount = 0;

    // distribute options in an array
    let actualOptions = [];
    options.forEach(option => {
        for (let i = 0; i < option.chance; i++) {
            actualOptions.push(Object.assign({}, option));
        }
    });
    
    actualOptions = shuffle(actualOptions);
 
    const cycle = () => {
        console.log('called cycle!!! ' + cycleCount);
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        spin();
    }
});

window.addEventListener('resize', resizeCanvas);
