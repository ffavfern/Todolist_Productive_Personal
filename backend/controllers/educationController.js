const Education = require('../models/Education');

// Study Schedules
exports.getStudySchedules = async (req, res) => {
  try {
    const education = await Education.findOne();
    res.json(education ? education.studySchedules : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addStudySchedule = async (req, res) => {
  const { subject, date, startTime, endTime } = req.body;
  try {
    const newSchedule = { subject, date, startTime, endTime };
    let education = await Education.findOne();
    if (!education) {
      education = new Education({ studySchedules: [newSchedule], homeworks: [], exams: [], books: [], onlineCourses: [] });
    } else {
      education.studySchedules.push(newSchedule);
    }
    await education.save();
    res.json(education.studySchedules);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Homeworks
exports.getHomeworks = async (req, res) => {
  try {
    const education = await Education.findOne();
    res.json(education ? education.homeworks : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addHomework = async (req, res) => {
  const { subject, description, dueDate } = req.body;
  try {
    const newHomework = { subject, description, dueDate };
    let education = await Education.findOne();
    if (!education) {
      education = new Education({ studySchedules: [], homeworks: [newHomework], exams: [], books: [], onlineCourses: [] });
    } else {
      education.homeworks.push(newHomework);
    }
    await education.save();
    res.json(education.homeworks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateHomework = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const education = await Education.findOne();
    const homework = education.homeworks.id(id);
    if (!homework) return res.status(404).json({ msg: 'Homework not found' });

    homework.completed = completed !== undefined ? completed : homework.completed;

    await education.save();
    res.json(homework);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Exams
exports.getExams = async (req, res) => {
  try {
    const education = await Education.findOne();
    res.json(education ? education.exams : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addExam = async (req, res) => {
  const { subject, date, startTime, endTime } = req.body;
  try {
    const newExam = { subject, date, startTime, endTime };
    let education = await Education.findOne();
    if (!education) {
      education = new Education({ studySchedules: [], homeworks: [], exams: [newExam], books: [], onlineCourses: [] });
    } else {
      education.exams.push(newExam);
    }
    await education.save();
    res.json(education.exams);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Books
exports.getBooks = async (req, res) => {
  try {
    const education = await Education.findOne();
    res.json(education ? education.books : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addBook = async (req, res) => {
  const { title, author, totalPages } = req.body;
  try {
    const newBook = { title, author, totalPages };
    let education = await Education.findOne();
    if (!education) {
      education = new Education({ studySchedules: [], homeworks: [], exams: [], books: [newBook], onlineCourses: [] });
    } else {
      education.books.push(newBook);
    }
    await education.save();
    res.json(education.books);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateBookProgress = async (req, res) => {
  const { id } = req.params;
  const { currentPage } = req.body;
  try {
    const education = await Education.findOne();
    const book = education.books.id(id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    book.currentPage = currentPage !== undefined ? currentPage : book.currentPage;

    await education.save();
    res.json(book);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Online Courses
exports.getOnlineCourses = async (req, res) => {
  try {
    const education = await Education.findOne();
    res.json(education ? education.onlineCourses : []);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.addOnlineCourse = async (req, res) => {
  const { title, platform } = req.body;
  try {
    const newCourse = { title, platform };
    let education = await Education.findOne();
    if (!education) {
      education = new Education({ studySchedules: [], homeworks: [], exams: [], books: [], onlineCourses: [newCourse] });
    } else {
      education.onlineCourses.push(newCourse);
    }
    await education.save();
    res.json(education.onlineCourses);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateCourseProgress = async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;
  try {
    const education = await Education.findOne();
    const course = education.onlineCourses.id(id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });

    course.progress = progress !== undefined ? progress : course.progress;

    await education.save();
    res.json(course);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
