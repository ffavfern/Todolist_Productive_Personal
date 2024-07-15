const Work = require('../models/Work');

// Projects
exports.getProjects = async (req, res) => {
  try {
    const work = await Work.findOne();
    res.json(work ? work.projects : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProject = { name, description, tasks: [], progress: 0 };
    let work = await Work.findOne();
    if (!work) {
      work = new Work({ projects: [newProject], ideas: [] });
    } else {
      work.projects.push(newProject);
    }
    await work.save();
    res.json(work.projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addTaskToProject = async (req, res) => {
  const { projectId, name, description, dueDate } = req.body;
  try {
    const work = await Work.findOne();
    const project = work.projects.id(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project.tasks.push({ name, description, dueDate, completed: false });
    await work.save();
    res.json(project.tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { projectId, taskId, completed } = req.body;
  try {
    const work = await Work.findOne();
    const project = work.projects.id(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    const task = project.tasks.id(taskId);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task.completed = completed;
    await work.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Ideas
exports.getIdeas = async (req, res) => {
  try {
    const work = await Work.findOne();
    res.json(work ? work.ideas : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addIdea = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newIdea = { title, description };
    let work = await Work.findOne();
    if (!work) {
      work = new Work({ projects: [], ideas: [newIdea] });
    } else {
      work.ideas.push(newIdea);
    }
    await work.save();
    res.json(work.ideas);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
