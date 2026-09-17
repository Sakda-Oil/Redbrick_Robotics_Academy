const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/components/simulator/ROS2InteractiveLab.tsx');

let content = fs.readFileSync(targetPath, 'utf8');

// Fix 1: c: any
content = content.replace('children.map((c)', 'children.map((c: any)');

// Fix 2: typed states
content = content.replace(
  'const [activePreset, setActivePreset] = useState("publisher");',
  'const [activePreset, setActivePreset] = useState<"publisher" | "subscriber" | "robot_controller">("publisher");'
);
content = content.replace(
  'const [activeLanguage, setActiveLanguage] = useState("python");',
  'const [activeLanguage, setActiveLanguage] = useState<"python" | "cpp">("python");'
);
content = content.replace(
  'const [runSignal, setRunSignal] = useState(undefined);',
  'const [runSignal, setRunSignal] = useState<{ command: string; timestamp: number } | undefined>(undefined);'
);
content = content.replace(
  'const [graphMode, setGraphMode] = useState("minimal_publisher");',
  'const [graphMode, setGraphMode] = useState<"default" | "minimal_publisher" | "minimal_subscriber" | "robot_controller">("minimal_publisher");'
);
content = content.replace(
  'const [externalCmdVel, setExternalCmdVel] = useState(undefined);',
  'const [externalCmdVel, setExternalCmdVel] = useState<{ linear: number; angular: number; timestamp: number } | undefined>(undefined);'
);
content = content.replace(
  'onChange={(e) => setActivePreset(e.target.value)}',
  'onChange={(e) => setActivePreset(e.target.value as "publisher" | "subscriber" | "robot_controller")}'
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Types fixed in ROS2InteractiveLab");
