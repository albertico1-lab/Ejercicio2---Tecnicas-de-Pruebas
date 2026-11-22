Archivos incluidos
Archivo	Descripción
priceCalculator.ts	Función a probar. Calcula el precio final tras aplicar un descuento y lanza Invalid input si el precio es negativo o el descuento está fuera de 0–100.
priceCalculator.test.ts	29 pruebas organizadas en tres bloques: intuición y experiencia, dominio de entrada (clases de equivalencia y valores límite) y código (sentencias, ramas y condiciones).
jest.config.js	Configuración de Jest: usa ts-jest, entorno node, activa la cobertura y busca archivos *.test.ts.
tsconfig.json	Configuración de TypeScript. Declara los tipos de Jest y Node para que test y expect se reconozcan.
Requisitos previos
Node.js (incluye npm). Descarga desde https://nodejs.org/en/download/package-manager
Comprueba la instalación en una terminal:
bash
node -v
npm -v
Pasos para ejecutar las pruebas
1. Crear la carpeta del proyecto

Crea una carpeta nueva (por ejemplo ejercicios2), copia dentro los 4 archivos y abre una terminal en ella.

En Windows (PowerShell):

powershell
cd C:\Users\TuUsuario\Downloads\ejercicios2

Los archivos deben quedar directamente en la raíz de la carpeta, no dentro de subcarpetas.

2. Inicializar el proyecto
bash
npm init -y

Esto crea el archivo package.json.

3. Instalar las dependencias
bash
npm install --save-dev jest @types/jest ts-jest typescript

Esto crea la carpeta node_modules y registra los paquetes en package.json. Los avisos de deprecated o vulnerabilities se pueden ignorar.

4. Ejecutar las pruebas con cobertura
bash
npx jest --coverage
Resultado esperado
Las 29 pruebas aparecen con ✓.
El resumen final muestra:
Test Suites: 1 passed, 1 total
Tests:       29 passed, 29 total
La tabla de cobertura muestra 100% en % Stmts, % Branch, % Funcs y % Lines para priceCalculator.ts.
Se genera la carpeta coverage/ con el reporte detallado (puedes abrir coverage/lcov-report/index.html en el navegador).
