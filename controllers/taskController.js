import Task from "../models/Task.js";
import { matchedData } from "express-validator";

export const createTask = async (req, res) => {
  try {
    const { title, completed } = matchedData(req);

    const newTask = new Task({
      title,
      completed,
      owner: req.user._id,
    });

    await newTask.save();

    res.send(newTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while creating task", error: err.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find({ owner: req.user._id }).populate(
      "owner",
      "username"
    );

    res.send(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while getting the posts", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, completed } = matchedData(req);

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.owner.equals(req.user._id))
      return res
        .status(403)
        .json({ message: "This task is forbidden. You need to be authorized" });

    task.title = title;
    task.completed = completed;

    await task.save();

    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while updating.", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.owner.equals(req.user._id))
      return res
        .status(403)
        .json({ message: "This task is forbidden. You need to be authorized" });

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while deleting task", error: err.message });
  }
};
