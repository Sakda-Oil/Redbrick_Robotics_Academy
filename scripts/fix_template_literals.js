const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/components/simulator/ROS2InteractiveLab.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\\\$\\{/g, '${');
content = content.replace(/\\`/g, '`');

fs.writeFileSync(file, content);
