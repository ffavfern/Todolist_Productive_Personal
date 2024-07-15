const Education = require('../models/Education');
const Finance = require('../models/Finance');
const HealthFitness = require('../models/HealthFitness');
const TimeManagement = require('../models/TimeManagement');
const Work = require('../models/Work');

exports.getDashboardData = async (req, res) => {
  try {
    const education = await Education.findOne().lean();
    const finance = await Finance.findOne().lean();
    const healthFitness = await HealthFitness.findOne().lean();
    const timeManagement = await TimeManagement.findOne().lean();
    const work = await Work.findOne().lean();

    const dashboardData = {
      education,
      finance,
      healthFitness,
      timeManagement,
      work,
    };

    res.json(dashboardData);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
