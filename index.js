const core = require('@actions/core');
const axios = require('axios');
const run = async () => {
    let filteredFeedback = await getFeedbackItems('portal');
    filteredFeedback = filteredFeedback.concat(await getFeedbackItems('dev-portal'));
    core.setOutput("payload", { events: filteredFeedback});
    core.setOutput("length", filteredFeedback.length);
}


const getFeedbackItems = async (project) => {
  const token = process.env.SENTRY_TOKEN
  const options = {
    url: `https://sentry.io/api/0/projects/\zuplo/${project}/user-feedback/`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const feedbacks = await axios(options);
  let filteredFeedback = feedbacks.data.filter((fb) => Date.parse(fb.dateCreated) > Date.now() - core.getInput('time-ms-period'));
  filteredFeedback = filteredFeedback.map((fb) => ({
     event: fb.issue.permalink,
     email: fb.email,
     comments: fb.comments,
     dateCreated: fb.dateCreated
  }));
  console.log(`Project: ${project}`);
  console.log({ events: filteredFeedback});
  return filteredFeedback;
}

try {
  run();

} catch (error) {
  core.setFailed(error.message);
}

