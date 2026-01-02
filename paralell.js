const runParalell = async (files, mode = "paralell") => {
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
const files = [
  { path: "./task4.txt", time: 3000, mode: "Paralell" },
  { path: "./task5.txt", time: 3000, mode: "Paralell" },
];
const results = await runParalell(files);
console.log(results);
