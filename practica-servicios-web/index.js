const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const PORT = 3000;

/*     EJERCICIO 1: SALUDO*/
app.post('/saludo', (req, res) => {
  const { nombre } = req.body;
  res.json({ mensaje: `Hola, ${nombre}` });
});

/*  EJERCICIO 2: CALCULADORA */
app.post('/calcular', (req, res) => {
  const { a, b, operacion } = req.body;
  let resultado;

  switch (operacion) {
    case 'suma':
      resultado = a + b;
      break;
    case 'resta':
      resultado = a - b;
      break;
    case 'multiplicacion':
      resultado = a * b;
      break;
    case 'division':
      if (b === 0) {
        return res.json({ error: 'División por cero' });
      }
      resultado = a / b;
      break;
    default:
      return res.json({ error: 'Operación no válida' });
  }

  res.json({ resultado });
});

/*    EJERCICIO 3: CRUD TAREAS*/
let tareas = [];

app.post('/tareas', (req, res) => {
  tareas.push(req.body);
  res.json(req.body);
});

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.put('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.map(t => (t.id === id ? req.body : t));
  res.json({ mensaje: 'Tarea actualizada' });
});

app.delete('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tareas = tareas.filter(t => t.id !== id);
  res.json({ mensaje: 'Tarea eliminada' });
});

/*    EJERCICIO 4: VALIDAR PASSWORD */
app.post('/validar-password', (req, res) => {
  const { password } = req.body;
  let errores = [];

  if (password.length < 8) errores.push('Mínimo 8 caracteres');
  if (!/[A-Z]/.test(password)) errores.push('Debe tener mayúscula');
  if (!/[a-z]/.test(password)) errores.push('Debe tener minúscula');
  if (!/[0-9]/.test(password)) errores.push('Debe tener número');

  res.json({
    esValida: errores.length === 0,
    errores
  });
});

/*   EJERCICIO 5: CONVERTIR TEMPERATURA */
app.post('/convertir-temperatura', (req, res) => {
  const { valor, desde, hacia } = req.body;
  let convertido;

  if (desde === 'C' && hacia === 'F') convertido = valor * 9/5 + 32;
  else if (desde === 'F' && hacia === 'C') convertido = (valor - 32) * 5/9;
  else if (desde === 'C' && hacia === 'K') convertido = valor + 273.15;
  else if (desde === 'K' && hacia === 'C') convertido = valor - 273.15;
  else convertido = valor;

  res.json({
    valorOriginal: valor,
    valorConvertido: convertido,
    escalaOriginal: desde,
    escalaConvertida: hacia
  });
});

/*  EJERCICIO 6: BUSCAR EN ARRAY */
app.post('/buscar', (req, res) => {
  const { array, elemento } = req.body;
  const indice = array.indexOf(elemento);

  res.json({
    encontrado: indice !== -1,
    indice,
    tipoElemento: typeof elemento
  });
});

/*    EJERCICIO 7: CONTAR PALABRAS */
app.post('/contar-palabras', (req, res) => {
  const { texto } = req.body;
  const palabras = texto.trim().split(/\s+/);

  res.json({
    totalPalabras: palabras.length,
    totalCaracteres: texto.length,
    palabrasUnicas: new Set(palabras).size
  });
});

/*    EJERCICIO 8: GENERAR PERFIL */
app.post('/generar-perfil', (req, res) => {
  const { nombre, edad, intereses } = req.body;

  let categoria = edad < 30 ? 'junior' : edad < 50 ? 'senior' : 'veterano';

  res.json({
    usuario: { nombre, edad, intereses },
    id: uuidv4(),
    fechaCreacion: new Date(),
    categoria
  });
});

/*   EJERCICIO 9: CALCULAR PROMEDIO */
app.post('/calcular-promedio', (req, res) => {
  const { calificaciones } = req.body;

  if (calificaciones.some(c => c < 0 || c > 10)) {
    return res.json({ error: 'Calificaciones inválidas' });
  }

  const promedio =
    calificaciones.reduce((a, b) => a + b, 0) / calificaciones.length;

  res.json({
    promedio,
    calificacionMasAlta: Math.max(...calificaciones),
    calificacionMasBaja: Math.min(...calificaciones),
    estado: promedio >= 6 ? 'aprobado' : 'reprobado'
  });
});

/*  EJERCICIO 10: PRODUCTOS CON FILTROS */
let productos = [];

app.post('/productos', (req, res) => {
  productos.push(req.body);
  res.json(req.body);
});

app.get('/productos', (req, res) => {
  let resultado = productos;
  const { categoria, precioMin, precioMax } = req.query;

  if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
  if (precioMin) resultado = resultado.filter(p => p.precio >= precioMin);
  if (precioMax) resultado = resultado.filter(p => p.precio <= precioMax);

  res.json(resultado);
});

/*    SERVIDOR */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
