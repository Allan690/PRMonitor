const issueDestructurer = (issue) => {
  const {
    id: issueId,
    self: issueUrl,
    key: issueProjectKey,
    fields: {
      issuetype: { name: issueType, iconUrl: issueTypeIconUrl },
      sprint: { id: sprintId, self: sprintUrl, name: sprintName },
      closedSprints: SprintsCoveredByStory,
      project: { avatarUrls: { '48x48': projectAvatarUrl } },
      assignee,
      status: { statusCategory: { name: issueStatus } },
      description: issueDescription,
      creator: { displayName: issueCreator }, active,
      reporter: { displayName: reporterName, avatarUrls: { '48x48': reporterAvatar } }
    },
  } = issue;
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
    assigneeDetails: assignee,
    issueStatus,
    issueDescription,
    issueCreator,
    active,
    reporterDetails: {
      reporterAvatar,
      reporterName
    }
  };
};

export default issueDestructurer;
