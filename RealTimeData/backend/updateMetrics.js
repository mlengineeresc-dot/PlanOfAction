import fs from "fs";

const filePath = "./db.json";

function updateData() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const now = new Date().toLocaleTimeString();

  data.metrics.push({
    id: data.metrics.length + 1,
    timestamp: now,
    value: Math.floor(Math.random() * 100),
  });

  // keep only last 10 points
  data.metrics = data.metrics.slice(-10);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Updated metrics:", now);
}

setInterval(updateData, 3000); // every 3 sec
