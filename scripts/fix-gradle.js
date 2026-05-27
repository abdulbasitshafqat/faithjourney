const fs = require('fs');
const path = require('path');

const targets = [
    'node_modules/@capacitor/preferences/android/build.gradle',
    'node_modules/@capacitor/app/android/build.gradle',
    'node_modules/@capacitor/toast/android/build.gradle',
    'node_modules/@capacitor/geolocation/android/build.gradle',
    'node_modules/@capacitor/local-notifications/android/build.gradle'
];

targets.forEach(relPath => {
    const fullPath = path.join(process.cwd(), relPath);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes("proguard-android.txt")) {
            content = content.replace("proguard-android.txt", "proguard-android-optimize.txt");
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Successfully fixed: ${relPath}`);
        } else {
            console.log(`Already fixed or not matching: ${relPath}`);
        }
    } else {
        console.log(`Path does not exist: ${relPath}`);
    }
});
