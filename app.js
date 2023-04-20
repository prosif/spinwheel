const canvas = document.getElementById('main');
const ctx = canvas.getContext("2d", {alpha: false});

const resizeCanvas = () => {
    canvas.width = 2 * window.innerWidth;
    canvas.height = 2 * window.innerHeight;
    canvas.style.width = (.5 * canvas.width) + 'px';
    canvas.style.height = (.5 * canvas.height) + 'px';
}

resizeCanvas();

const renderWheel = (option, shouldFlash) => {
    const doRender = (textColor) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = option.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor;
        ctx.font = '144px sans-serif';

        const textInfo = ctx.measureText(option.text);

        const textStartX = (canvas.width / 2) - (textInfo.width / 2);
        const textStartY = (canvas.height / 2);
        ctx.fillText(option.text, textStartX, textStartY); 
    }

    if (shouldFlash) {
        let flip = false;//'rgba(255, 255, 255, 255)';
        setInterval(() => {
            flip = !flip;
            doRender(flip ? 'rgba(255, 255, 255, 255)' : '#fcd303');
        }, 250);
    } else {
        doRender('rgba(255, 255, 255, 255)');
    }
};

const spin = () => {
    const options = [
    {
        text: 'ayy',
        color: '#fc4103',
    },
    {
        text: 'lmao',
        color: '#c2fc03'
    },
    {
        text: 'hmmm',
        color: '#03fcb1'
    },
    {
        text: 'bbbfbbdsf',
        color: '#7f03fc'
    },
    {
        text: 'llllll',
        color: '#fc0330'
    }];

    const cycles = 14;

    const finish = () => {
    };

    let cycleCount = 0;

    const cycle = () => {
        if (cycleCount >= cycles) {
            finish();
        } else {
        
            let optionIndex = Math.floor(Math.random() * options.length);
            const option = options[optionIndex];
            renderWheel(option, cycleCount + 1 === cycles);

            cycleCount++;
            
            let timeout = 300;//500;

            if (cycleCount < 6) {
                timeout = 200;
            } else if (cycleCount < 11) {
//                timeout = 300;
            }

            setTimeout(cycle, 250);//timeout);/// (cycleCount + 1));
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
