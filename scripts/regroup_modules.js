const fs = require('fs');
const path = require('path');

function robustReplace(filePath, isTh) {
    let content = fs.readFileSync(filePath, 'utf8');
    const parts = content.split('"modules": [');
    if (parts.length < 2) return;
    
    let braceCount = 1;
    let endIdx = -1;
    for(let i = 0; i < parts[1].length; i++) {
        if (parts[1][i] === '[') braceCount++;
        if (parts[1][i] === ']') braceCount--;
        if (braceCount === 0) {
            endIdx = i;
            break;
        }
    }
    
    if (endIdx === -1) return;
    const modulesContent = parts[1].substring(0, endIdx);
    
    const lessonRegex = /\{\s*"id":\s*"ros2-\d\d"[^}]+}/g;
    let match;
    const lessons = [];
    while ((match = lessonRegex.exec(modulesContent)) !== null) {
        lessons.push(match[0]);
    }
    
    const getLesson = (idStr) => lessons.find(l => l.includes('"id": "' + idStr + '"'));
    
    const newModules = [
        {
          id: "ros2-mod-1",
          number: 1,
          title: isTh ? "Beginner" : "Beginner",
          description: isTh ? "พื้นฐาน ROS 2 และการติดตั้ง" : "ROS 2 Fundamentals and Installation",
          lessons: [getLesson("ros2-01"), getLesson("ros2-02"), getLesson("ros2-03")]
        },
        {
          id: "ros2-mod-2",
          number: 2,
          title: isTh ? "Programming" : "Programming",
          description: isTh ? "เวิร์กสเปซ การเขียนโหนด และ Launch" : "Workspace, Nodes, and Launch Files",
          lessons: [getLesson("ros2-04"), getLesson("ros2-05"), getLesson("ros2-10")]
        },
        {
          id: "ros2-mod-3",
          number: 3,
          title: isTh ? "Robot Fundamentals" : "Robot Fundamentals",
          description: isTh ? "Topics, Services, Actions, Parameters" : "Topics, Services, Actions, Parameters",
          lessons: [getLesson("ros2-06"), getLesson("ros2-07"), getLesson("ros2-08"), getLesson("ros2-09")]
        },
        {
          id: "ros2-mod-4",
          number: 4,
          title: isTh ? "Robot Applications" : "Robot Applications",
          description: isTh ? "การจำลองหุ่นยนต์และการทำงานจริง" : "Robot Simulation and Real-world Applications",
          lessons: [getLesson("ros2-11")]
        }
    ];
    
    let newModulesStr = "\n";
    for (let i = 0; i < newModules.length; i++) {
        const mod = newModules[i];
        newModulesStr += "    {\n";
        newModulesStr += '      "id": "' + mod.id + '",\n';
        newModulesStr += '      "number": ' + mod.number + ',\n';
        newModulesStr += '      "title": "' + mod.title + '",\n';
        newModulesStr += '      "description": "' + mod.description + '",\n';
        newModulesStr += '      "lessons": [\n';
          
        const validLessons = mod.lessons.filter(l => l);
        for (let j = 0; j < validLessons.length; j++) {
          newModulesStr += "        " + validLessons[j];
          if (j < validLessons.length - 1) newModulesStr += ",";
          newModulesStr += "\n";
        }
        newModulesStr += "      ]\n    }";
        if (i < newModules.length - 1) newModulesStr += ",";
        newModulesStr += "\n";
    }
    
    content = content.replace(/"totalModules": \d+,/, '"totalModules": 4,');
    
    const newContent = parts[0] + '"modules": [' + newModulesStr + parts[1].substring(endIdx);
    
    let finalContent = newContent.replace(/"06\. ท็อปปิก[^"]+"/g, '"06. Topics (Pub/Sub)"')
                                 .replace(/"07\. เซอร์วิส[^"]+"/g, '"07. Services (Client/Server)"')
                                 .replace(/"08\. แอ็กชัน[^"]+"/g, '"08. Actions (Goal/Result)"')
                                 .replace(/"09\. ระบบพารามิเตอร์[^"]+"/g, '"09. Parameters"')
                                 .replace(/"10\. การสร้าง ROS 2[^"]+"/g, '"10. Launch Files"')
                                 .replace(/"11\. จำลองหุ่นยนต์[^"]+"/g, '"11. Gazebo Harmonic"');
                                 
    finalContent = finalContent.replace(/"06\. Topics, Publishing[^"]+"/g, '"06. Topics (Pub/Sub)"')
                               .replace(/"07\. Services, Clients[^"]+"/g, '"07. Services (Client/Server)"')
                               .replace(/"08\. Actions, Goals[^"]+"/g, '"08. Actions (Goal/Result)"')
                               .replace(/"09\. Parameters and[^"]+"/g, '"09. Parameters"')
                               .replace(/"10\. Creating ROS 2 Launch[^"]+"/g, '"10. Launch Files"')
                               .replace(/"11\. Robot Simulation[^"]+"/g, '"11. Gazebo Harmonic"');
                               
    fs.writeFileSync(filePath, finalContent);
}

robustReplace(path.join(__dirname, '../src/content/th/ros2Data.ts'), true);
robustReplace(path.join(__dirname, '../src/content/en/ros2Data.ts'), false);
console.log("Modules regrouped successfully!");
