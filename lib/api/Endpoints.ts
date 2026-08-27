export const Endpoints = {
  auth: {
    login: "/api/agents/login",
    signup: "/api/agents/signup",
  },
  agentprofile: {
    get: "/api/agents/profile",
    update: "/api/agents/profile",
  },
  agentsettingpassword: {
    post: "/api/agents/change-password",
  },
  agentsettingnotification: {
    post: "/api/agents/notification-settings",
  },
};
