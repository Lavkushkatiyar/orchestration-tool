const paths = ["./task1.txt", "./task2.txt", "./task3.txt"];

const readFiles = async (path) => {
  const contentsOfFile = await Deno.readTextFile(path);

  return contentsOfFile.split("\n").flatMap((x) => x);
};

const writeTofile = (tasksToPerform, pathOfFile) =>
  Deno.writeTextFile(pathOfFile, tasksToPerform);

const taskRunner = async (paths) => {
  const tasktoPerform = [];
  for (const path of paths) {
    tasktoPerform.push(await readFiles(path));
  }
  return tasktoPerform.flatMap((x) => x);
};

const tasksToPerform = await taskRunner(paths);
await writeTofile(tasksToPerform, "./taskToPerform.txt");
