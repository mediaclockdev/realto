export const Endpoints = {
  auth: {
    login: "/api/agents/login",
    signup: "/api/agents/signup",
    // ponytail: guessed from the /api/agents/* pattern — confirm with backend
    verifyOtp: "/api/agents/verify-otp",
    resendOtp: "/api/agents/resend-otp",
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
  properties: {
    create: "/api/properties",
    list: "/api/properties",
    statistics: "/api/properties/statistics",
    update: "/api/properties/:id",
    delete: "/api/properties/:id",
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
  agentdashboard: {
    dashboardStats: "/api/dashboard/stats",
  },
  agentleadManagement: {
    inquryListing: "/api/inquiries",
    createLead: "/api/inquiries",
    updateInquire: "/api/inquiries/:id",
    deleteLead: "/api/inquiries/:id",
    bulkDelete: "/api/inquiries/bulk",
  },
};
