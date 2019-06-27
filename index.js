const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: 1,
    title: "Projeto 1",
    tasks: ["Criar Pasta", "Criar index.js"]
  },
  {
    id: 2,
    title: "Projeto 2",
    tasks: ["Criar Pasta", "Adicionar dependencias"]
  },
  {
    id: 3,
    title: "Projeto 3",
    tasks: ["Criar Pasta"]
  }
];

server.use((req, res, next) => {
  console.count("Requests");
  next();
});

function checkProjectInArray(req, res, next) {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(400).json({ error: "This project id does not exist!" });
  }

  res.project = project;

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkProjectInArray, (req, res) => {
  return res.json(res.project);
});

server.post("/projects", (req, res) => {
  const date = new Date();
  const project = { id: date.valueOf(), ...req.body };

  projects.push(project);

  res.json(projects);
});

server.post("/projects/:id/tasks", checkProjectInArray, (req, res) => {
  const project = res.project;
  const { title } = req.body;

  project.tasks.push(title);

  res.json(projects);
});

server.put("/projects/:id", checkProjectInArray, (req, res) => {
  const project = res.project;

  projects.splice(projects.indexOf(project), 1, req.body);

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectInArray, (req, res) => {
  projects.splice(projects.indexOf(res.project), 1);

  return res.send("The project was deleted successfully!");
});

server.listen(3000);
