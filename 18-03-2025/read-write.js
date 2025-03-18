const fs = require("fs");

fs.writeFileSync(
  "C:/Users/AZMINUR RAHMAN/OneDrive - American International University-Bangladesh/2024-2025, Spring/ADVANCED PROGRAMMING IN WEB TECHNOLOGY [A]/Mid/Lab/18-03-2025/write.txt",
  "Hello, World!"
);

const a = fs.readFileSync(
  "C:/Users/AZMINUR RAHMAN/OneDrive - American International University-Bangladesh/2024-2025, Spring/ADVANCED PROGRAMMING IN WEB TECHNOLOGY [A]/Mid/Lab/18-03-2025/write.txt",
  "utf8"
);

console.log(a);
