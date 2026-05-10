// ============================================================
//  TEXTO DEL MENSAJE (cámbialo a lo que quieras decirle)
// ============================================================
const textoMama = `Para la mujer más increíble de mi vida:\n\nGracias por tu amor incondicional, tus cuidados y tu paciencia infinita.\n\nEres mi mayor inspiración y mi refugio más seguro.\n\nCada día a tu lado es un regalo que atesoro.\n\n— ¡Feliz Día de las Madres! 🌹`;

// ============================================================
//  FECHA DE NACIMIENTO (cambia por la tuya real)
//  Formato: new Date(AÑO, MES-1, DIA)   ← mes va de 0 a 11
// ============================================================
const nacimiento = new Date(2005, 11, 18, 0, 0, 0); // 18 diciembre 2005

// ============================================================
//  REFERENCIAS AL DOM
// ============================================================
const audio    = document.getElementById('miCancion');
const btnPlay  = document.getElementById('masterPlay');
const barra    = document.getElementById('progressBar');
const cursor   = document.querySelector('.cursor-heart');
const petalsC  = document.getElementById('petals-container');
const confettiC = document.getElementById('confetti-container');

// ============================================================
//  CURSOR PERSONALIZADO (corazón sigue al mouse)
// ============================================================
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});

// ============================================================
//  PÉTALOS CAYENDO (pantalla 1)
// ============================================================
const emojisPetalo = ['🌸', '🌺', '🌹', '💮', '🏵️'];

function crearPetalo() {
    const p = document.createElement('div');
    p.classList.add('petal');
    p.textContent = emojisPetalo[Math.floor(Math.random() * emojisPetalo.length)];
    p.style.left     = Math.random() * 100 + 'vw';
    p.style.fontSize = (16 + Math.random() * 14) + 'px';
    const dur = 5 + Math.random() * 6; // entre 5 y 11 seg
    p.style.animationDuration  = dur + 's';
    p.style.animationDelay     = Math.random() * 4 + 's';
    p.style.opacity = 0.6 + Math.random() * 0.4;
    petalsC.appendChild(p);
    setTimeout(() => p.remove(), (dur + 4) * 1000);
}

// Genera pétalos cada 600ms
const intervaloPetalo = setInterval(crearPetalo, 600);
// Arranca con un lote inicial
for (let i = 0; i < 12; i++) crearPetalo();

// ============================================================
//  REPRODUCTOR DE AUDIO
// ============================================================
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
    if (audio.duration) {
        barra.style.width = (audio.currentTime / audio.duration) * 100 + '%';
    }
});

// ============================================================
//  RELOJ / CONTADOR DE TIEMPO
// ============================================================
function actualizarReloj() {
    const ahora  = new Date();
    const dif    = ahora - nacimiento;
    const anios  = Math.floor(dif / (1000 * 60 * 60 * 24 * 365.25));
    const seg    = Math.floor(dif / 1000);
    const horas  = Math.floor((seg % (3600 * 24)) / 3600);
    const mins   = Math.floor((seg % 3600) / 60);
    const segs   = seg % 60;
    document.getElementById('reloj').innerText =
        `${anios} años, ${horas}h ${mins}m ${segs}s`;
}

// ============================================================
//  MÁQUINA DE ESCRIBIR
// ============================================================
function escribir(texto, i, elemento, callback) {
    if (i < texto.length) {
        elemento.innerHTML += texto.charAt(i) === '\n' ? '<br>' : texto.charAt(i);
        setTimeout(() => escribir(texto, i + 1, elemento, callback), 38);
    } else if (callback) {
        callback();
    }
}

// ============================================================
//  TRANSICIÓN ENTRE PANTALLAS (con fade)
// ============================================================
function cambiarPantalla(mostrar, ocultar) {
    return new Promise(resolve => {
        // Fade out
        ocultar.style.opacity = '0';
        ocultar.style.transition = 'opacity 0.6s ease';

        setTimeout(() => {
            ocultar.style.display = 'none';
            ocultar.classList.remove('active');

            // Mostrar nueva con fade in
            mostrar.style.display = 'flex';
            mostrar.style.opacity = '0';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    mostrar.style.transition = 'opacity 0.8s ease';
                    mostrar.style.opacity = '1';
                    mostrar.classList.add('active');
                    resolve();
                });
            });
        }, 600);
    });
}

// ============================================================
//  CONFETI (pantalla 3)
// ============================================================
const emojisConfeti = ['🌸', '💕', '🌺', '💖', '✨', '🎊', '🌹', '💗', '⭐', '🎉'];

function lanzarConfeti() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.classList.add('confetti-piece');
            c.textContent = emojisConfeti[Math.floor(Math.random() * emojisConfeti.length)];
            c.style.left = Math.random() * 100 + 'vw';
            c.style.fontSize = (14 + Math.random() * 16) + 'px';
            const dur = 2.5 + Math.random() * 2.5;
            c.style.animationDuration = dur + 's';
            confettiC.appendChild(c);
            setTimeout(() => c.remove(), dur * 1000 + 500);
        }, i * 80);
    }
}

// Disparo de confeti cada 4 segundos mientras estés en pantalla 3
let confettiInterval = null;

function iniciarConfeti() {
    lanzarConfeti();
    confettiInterval = setInterval(lanzarConfeti, 4000);
}

// ============================================================
//  EVENTOS DE BOTONES
// ============================================================

// Pantalla 1 → Pantalla 2
document.getElementById('btn-empezar').addEventListener('click', async () => {
    clearInterval(intervaloPetalo); // detenemos pétalos al avanzar
    petalsC.innerHTML = '';

    const p1 = document.getElementById('pantalla1');
    const p2 = document.getElementById('pantalla2');

    await cambiarPantalla(p2, p1);

    // Reproducir música automáticamente
    audio.play().catch(() => {});
    btnPlay.classList.replace('fa-play', 'fa-pause');

    // Aparece la foto tras 1 segundo
    setTimeout(() => {
        document.getElementById('box-arbol').classList.add('box-visible');
    }, 1000);

    // Empezamos a escribir el mensaje
    const elTexto = document.getElementById('maquina-escribir');
    escribir(textoMama, 0, elTexto, () => {
        // Al terminar de escribir, mostramos contador y botón
        document.getElementById('contador-container').classList.add('visible_el');
        document.getElementById('btn-a-final').classList.add('visible_el');
        setInterval(actualizarReloj, 1000);
        actualizarReloj();
    });
});

// Pantalla 2 → Pantalla 3
document.getElementById('btn-a-final').addEventListener('click', async () => {
    const p2 = document.getElementById('pantalla2');
    const p3 = document.getElementById('pantalla3');

    await cambiarPantalla(p3, p2);

    // Mostrar foto final
    setTimeout(() => {
        document.getElementById('box-final').classList.add('box-visible');

        // Mostrar texto principal
        setTimeout(() => {
            document.getElementById('texto-final').classList.add('visible_el');

            // Mostrar subtexto
            setTimeout(() => {
                document.getElementById('subtexto-final').classList.add('visible_el');
                document.getElementById('corazones-final').classList.add('visible_el');
                iniciarConfeti();
            }, 800);

        }, 900);
    }, 500);
});