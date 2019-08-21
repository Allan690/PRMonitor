const issueDestructurer = (issue) => {
  let updatedAssignee;

  const {
    id: issueId,
    self: issueUrl,
    key: issueProjectKey,
    renderedFields: { description },
    fields: {
      issuetype: { name: issueType, iconUrl: issueTypeIconUrl },
      sprint: { id: sprintId, self: sprintUrl, name: sprintName },
      closedSprints: SprintsCoveredByStory,
      project: { avatarUrls: { '48x48': projectAvatarUrl } },
      assignee,
      status: { name: issueStatus },
      summary,
      creator: { displayName: issueCreator }, active,
      reporter: { displayName: reporterName, avatarUrls: { '48x48': reporterAvatar } }
    },
  } = issue;
  if(assignee && assignee.hasOwnProperty('name')) {
    let url = assignee.avatarUrls['48x48'];
    updatedAssignee = { ...assignee, url };
  }
  else {
    updatedAssignee = assignee;
  }
  return {
    issueId,
    issueUrl,
    issueProjectKey,
    issueTypeDetails: {
      issueType,
      issueTypeIconUrl,
    },
    sprintDetails: {
      sprintId,
      sprintName,
      sprintUrl
    },
    SprintsCoveredByStory,
    projectAvatarUrl,
    assigneeDetails: updatedAssignee,
    issueStatus,
    issueDescription: description,
    issueCreator,
    active,
    summary,
    reporterDetails: {
      reporterAvatar,
      reporterName
    }
  };
};

export default issueDestructurer;
