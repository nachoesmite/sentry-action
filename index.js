const core = require('@actions/core');
const axios = require('axios');
const token = process.env.SENTRY_TOKEN
const run = async () => {
    const feedbacks = await axios(options);
    let filteredFeedback = feedbacks.data.filter((fb) => Date.parse(fb.dateCreated) > Date.now() - 3600000*2);
    filteredFeedback = filteredFeedback.map((fb) => ({
       event: fb.issue.permalink,
       email: fb.email,
       comments: fb.comments,
       dateCreated: fb.dateCreated
    }));
    return filteredFeedback;
}
var options = {
  url: 'https://sentry.io/api/0/projects/\zuplo/portal/user-feedback/',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

try {
  // `who-to-greet` input defined in action metadata file
  const result = run();
  //const nameToGreet = core.getInput('who-to-greet');
  core.setOutput("payload", result);
} catch (error) {
  core.setFailed(error.message);
}

