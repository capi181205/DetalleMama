const textoMama = `Para la mujer más increíble de mi vida:\n\nGracias por tu amor incondicional, tus cuidados y tu paciencia.\n\nEres mi mayor inspiración y mi refugio más seguro.\n\n— ¡Feliz Día de las Madres!`;

// FECHA: 18 de Diciembre de 2005 (Mes 11 porque en JS Enero es 0)
const nacimiento = new Date(2005, 11, 18, 0, 0, 0);

const audio = document.getElementById('miCancion');
const btnPlay = document.getElementById('masterPlay');
const barra = document.getElementById('progressBar');

function actualizarReloj() {
    const ahora = new Date();
    const dif = ahora - nacimiento;
    const anios = Math.floor(dif / (1000 * 60 * 60 * 24 * 365.25));
    const segundosTotales = Math.floor(dif / 1000);
    const horas = Math.floor((segundosTotales % (3600 * 24)) / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;
    document.getElementById('reloj').innerText = `${anios} años, ${horas}h ${minutos}m ${segundos}s`;
}

btnPlay.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnPlay.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        btnPlay.classList.replace('fa-pause', 'fa-play');
    }
});

audio.addEventListener('timeupdate', () => {
    barra.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

function escribir(t, i, el, cb) {
    if (i < t.length) {
        el.innerHTML += t.charAt(i) === "\n" ? "<br>" : t.charAt(i);
        setTimeout(() => escribir(t, i + 1, el, cb), 40);
    } else if (cb) cb();
}

document.getElementById('btn-empezar').addEventListener('click', () => {
    document.getElementById('pantalla1').classList.remove('active');
    document.getElementById('pantalla2').classList.add('active');
    escribir(textoMama, 0, document.getElementById('maquina-escribir'), () => {
        document.getElementById('contador-container').classList.add('visible_el');
        document.getElementById('btn-a-final').classList.add('visible_el');
        setInterval(actualizarReloj, 1000);
    });
    setTimeout(() => {
        document.getElementById('box-arbol').classList.add('box-visible');
    }, 1000);
});

document.getElementById('btn-a-final').addEventListener('click', () => {
    document.getElementById('pantalla2').classList.remove('active');
    document.getElementById('pantalla3').classList.add('active');
    setTimeout(() => {
        document.getElementById('box-final').classList.add('box-visible');
        setTimeout(() => {
            document.getElementById('texto-final').classList.add('visible_el');
        }, 1000);
    }, 500);
});