// mode[parelell , serial ] log [{task1},{task2}]
const reports = {
  serial: [],
  paralell: [],
};
const runSerial = async ({ path, time }) => {
  const start = Date.now();

  await new Promise((resolve) => setTimeout(resolve, time));
  const content = await Deno.readTextFile(path);

  const end = Date.now();
  return {
    file: path,
    content,
    duration: end - start,
  };
};

const runParallel = async (files, mode = "Parelell") => {
  const start = Date.now();
  const tasks = files.map(async (file) => {
    await new Promise((resolve) => setTimeout(resolve, file.time));
    const content = await Deno.readTextFile(file.path);
    return {
      content,
    };
  });
  const content = await Promise.all(tasks);
  const end = Date.now();
  return { mode, content, duration: end - start };
};

const taskInfo = [
  { path: "./task1.txt", time: 1000, mode: "serial" },
  { path: "./task2.txt", time: 2000, mode: "serial" },
  { path: "./task3.txt", time: 3000, mode: "serial" },
  { path: "./task4.txt", time: 3000, mode: "Paralell" },
  { path: "./task5.txt", time: 3000, mode: "Paralell" },
];

const serialTasks = taskInfo.filter((task) => task.mode === "serial");
const parallelTasks = taskInfo.filter((task) => task.mode === "Paralell");

for (const task of serialTasks) {
  const result = await runSerial(task);
  reports.serial.push(result);
}

if (parallelTasks.length) {
  const parallelResult = await runParallel(parallelTasks);
  reports.paralell.push(parallelResult);
}

console.log(JSON.stringify(reports, null, 2));
