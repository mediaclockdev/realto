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
  agentdocuments: {
    stats: "/api/documents/stats",
    newfolder: "/api/folders",
    listallfolders: "/api/folders",
    updatefolder: "/api/folders/:id",
    deletefolder: "/api/folders/:id?delete_files=false",
    uploaddocuments: "/api/documents/upload",
    listalldocuments: "/api/documents",
    viewdocuments: "/api/documents/:id/view",
    downloaddocuments: "/api/documents/:id/download",
    updatedocuments: "/api/documents/:id",
    deletedocuments: "/api/documents/:id",
  },
};
