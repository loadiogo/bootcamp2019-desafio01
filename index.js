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

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));

  return res.json(project);
});

server.post("/projects", (req, res) => {
  const date = new Date();
  const project = { id: date.valueOf(), ...req.body };

  projects.push(project);

  res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  const { title } = req.body;

  project.tasks.push(title);

  res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));

  projects.splice(projects.indexOf(project), 1, req.body);

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));

  projects.splice(projects.indexOf(project), 1);

  return res.send("Project deleted with success!");
});

server.listen(3000);
