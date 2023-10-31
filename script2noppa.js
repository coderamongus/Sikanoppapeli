let pelaaja1Pisteet = 0;
let pelaaja2Pisteet = 0;
let pelaaja1TempPisteet = 0;
let pelaaja2TempPisteet = 0;
let pelaaja1Vuoro = true;
let pelaaja2Vuoro = false;

function heitaNoppaa(pelaaja) {
    if ((pelaaja === 1 && !pelaaja1Vuoro) || (pelaaja === 2 && !pelaaja2Vuoro)) {
        console.log('Ei ole sinun vuorosi heittää.');
        return;
    }

    const ensimmainenSatunnaisluku = Math.floor(Math.random() * 6) + 1;
    const toinenSatunnaisluku = Math.floor(Math.random() * 6) + 1;

    const diceImageElement1 = document.getElementById(`noppaKuva${pelaaja}a`);
    const diceImageElement2 = document.getElementById(`noppaKuva${pelaaja}b`);

    diceImageElement1.setAttribute('src', `media/noppa${ensimmainenSatunnaisluku}.png`);
    diceImageElement2.setAttribute('src', `media/noppa${toinenSatunnaisluku}.png`);

    let tulos = ensimmainenSatunnaisluku + toinenSatunnaisluku;

    if (ensimmainenSatunnaisluku === 1 && toinenSatunnaisluku === 1) {
        console.log(`Pelaaja ${pelaaja}: Sait 25 pistettä.`);
        if (pelaaja === 1) {
            pelaaja1TempPisteet += 25;
            document.getElementById('pisteet1temp').innerText = `Väliaikaiset pisteet: ${pelaaja1TempPisteet}`;
        } else if (pelaaja === 2) {
            pelaaja2TempPisteet += 25;
            document.getElementById('pisteet2temp').innerText = `Väliaikaiset pisteet: ${pelaaja2TempPisteet}`;
        }
    } else if (ensimmainenSatunnaisluku === 1 || toinenSatunnaisluku === 1) {
        console.log(`Pelaaja ${pelaaja}: Sait 1 pisteen. Vuoro siirtyy vastustajalle.`);
        tulos = 0; // Reset temporary score for a single 1
        if (pelaaja === 1) {
            pelaaja1TempPisteet = 0;
            document.getElementById('pisteet1temp').innerText = `Väliaikaiset pisteet: 0`;
        } else if (pelaaja === 2) {
            pelaaja2TempPisteet = 0;
            document.getElementById('pisteet2temp').innerText = `Väliaikaiset pisteet: 0`;
        }
        siirraVuoro(pelaaja);
    } else {
        // Check for doubles
        if (ensimmainenSatunnaisluku === toinenSatunnaisluku) {
            console.log(`Pelaaja ${pelaaja}: Sait tuplat ${tulos}, saat 2x pisteet, eli ${tulos * 2} pistettä.`);
            tulos *= 2;
        }

        if (pelaaja === 1) {
            pelaaja1TempPisteet += tulos;
            document.getElementById('pisteet1temp').innerText = `Väliaikaiset pisteet: ${pelaaja1TempPisteet}`;
        } else if (pelaaja === 2) {
            pelaaja2TempPisteet += tulos;
            document.getElementById('pisteet2temp').innerText = `Väliaikaiset pisteet: ${pelaaja2TempPisteet}`;
        }
    }
}

function pisteidenPankitus(pelaaja) {
    if ((pelaaja === 1 && !pelaaja1Vuoro) || (pelaaja === 2 && !pelaaja2Vuoro)) {
        console.log('Ei ole sinun vuorosi pankittaa pisteitä.');
        return;
    }

    let pisteet = 0;
    if (pelaaja === 1) {
        pisteet = pelaaja1TempPisteet;
        pelaaja1TempPisteet = 0;
        document.getElementById('pisteet1temp').innerText = `Väliaikaiset pisteet: 0`;
    } else if (pelaaja === 2) {
        pisteet = pelaaja2TempPisteet;
        pelaaja2TempPisteet = 0;
        document.getElementById('pisteet2temp').innerText = `Väliaikaiset pisteet: 0`;
    }

    if (pelaaja === 1) {
        pelaaja1Pisteet += pisteet;
        document.getElementById('pisteet1').innerText = `Pisteet: ${pelaaja1Pisteet}`;
        pelaaja1Vuoro = false;
        pelaaja2Vuoro = true;
        document.getElementById('vuoro').innerText = 'Vuorossa: Pelaaja 2';
    } else if (pelaaja === 2) {
        pelaaja2Pisteet += pisteet;
        document.getElementById('pisteet2').innerText = `Pisteet: ${pelaaja2Pisteet}`;
        pelaaja1Vuoro = true;
        pelaaja2Vuoro = false;
        document.getElementById('vuoro').innerText = 'Vuorossa: Pelaaja 1';
    }

    tarkistaVoittaja();
}

function siirraVuoro(edellinenPelaaja) {
    if (edellinenPelaaja === 1) {
        pelaaja1Vuoro = false;
        pelaaja2Vuoro = true;
    } else if (edellinenPelaaja === 2) {
        pelaaja1Vuoro = true;
        pelaaja2Vuoro = false;
    }

    if (pelaaja1Vuoro) {
        document.getElementById('vuoro').innerText = 'Vuorossa: Pelaaja 1';
    } else {
        document.getElementById('vuoro').innerText = 'Vuorossa: Pelaaja 2';
    }

    console.log(`Pelaaja ${edellinenPelaaja}, vuorosi on päättynyt. Vuoro siirtyy vastustajalle.`);
}

function tarkistaVoittaja() {
    if (pelaaja1Pisteet >= 100) {
        console.log('Pelaaja 1 on voittanut pelin!');
        document.getElementById('voittaja').innerText = 'Pelaaja 1 on voittanut pelin!';
        document.getElementById('voittaja').style.display = 'block';
    } else if (pelaaja2Pisteet >= 100) {
        console.log('Pelaaja 2 on voittanut pelin!');
        document.getElementById('voittaja').innerText = 'Pelaaja 2 on voittanut pelin!';
        document.getElementById('voittaja').style.display = 'block';
    } else {
        console.log('Tilanne: Pelaaja 1 - Pisteet:', pelaaja1Pisteet, ' | Pelaaja 2 - Pisteet:', pelaaja2Pisteet);
    }
}
