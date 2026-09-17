const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../src/components/simulator/ROS2InteractiveLab.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /const \[runSignal, setRunSignal\] = useState\(0\);/,
  `const [runSignal, setRunSignal] = useState<{command: string, timestamp: number} | undefined>(undefined);`
);

content = content.replace(
  /setRunSignal\(\(prev\) => prev \+ 1\);/,
  `setRunSignal({ command: activeTab === "python" ? "python3 src/my_package/my_package/my_node.py" : "./src/my_package/src/my_node", timestamp: Date.now() });`
);

content = content.replace(
  /key=\{\`term-\$\{runSignal\}\`\}/,
  ""
);

content = content.replace(
  /initialCommand=\{runSignal > 0 \? [^}]+\}/,
  `runTrigger={runSignal}`
);

fs.writeFileSync(file, content);
