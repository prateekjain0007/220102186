
const { Log } = require('./logger');

console.log('Running logging examples...');


Log("backend", "error", "handler", "received string, expected bool");

Log("backend", "fatal", "db", "Critical database connection failure.");

Log("frontend", "info", "component", "User profile updated successfully.");