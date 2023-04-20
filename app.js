const canvas = document.getElementById('main');
const ctx = canvas.getContext("2d", {alpha: false});

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
}

resizeCanvas();

const renderWheel = (option) => {
    console.log('want to render this option on the thing');
    console.log(option);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = option.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    renderWheel(options[0]); 
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        spin();
    }
});

window.addEventListener('resize', resizeCanvas);
