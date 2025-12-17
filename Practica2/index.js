const axios = require('axios');

const arregloTemperaturas = [];
const tiempoIntervalo = 3000;
const temperaturaMinima = 15;
const temperaturaMaxima = 30;
const umbralAlerta = 20;
const mensajeAlerta = '**ALERTA: Calentamiento extremo detectado**';
let alertaActiva = false;

const webhookUrl = process.env.DISCORD_WEBHOOK_URL || 'WEBHOOK_DE_EJEMPLO';

function generarTemperatura() {
  return Math.floor(Math.random() * (temperaturaMaxima - temperaturaMinima + 1)) + temperaturaMinima;
}

function inicializarArreglo() {
  arregloTemperaturas.length = 0;
  while (arregloTemperaturas.length < 3) {
    arregloTemperaturas.push(generarTemperatura());
  }
  console.log('Arreglo inicializado:', arregloTemperaturas);
}

async function verificarTemperaturas() {
  console.log('Verificando temperaturas:', arregloTemperaturas);

  const todasSobreUmbral = arregloTemperaturas.every(t => t > umbralAlerta);

  if (todasSobreUmbral && !alertaActiva) {
    alertaActiva = true;
    await enviarWebhook();
    inicializarArreglo();
    alertaActiva = false;
    return;
  }

  arregloTemperaturas.shift();
  arregloTemperaturas.push(generarTemperatura());
}

async function enviarWebhook() {
  try {
    console.log('Enviando webhook a Discord...');
    await axios.post(webhookUrl, {
      content: `${mensajeAlerta}
Temperaturas: ${arregloTemperaturas.join(', ')}°C
Umbral: ${umbralAlerta}°C`
    });
    console.log('✅ Webhook enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar webhook:', error.message);
  }
}

function iniciarMonitoreo() {
  inicializarArreglo();
  console.log('Iniciando monitoreo de temperaturas...');
  setInterval(verificarTemperaturas, tiempoIntervalo);
}

iniciarMonitoreo();
