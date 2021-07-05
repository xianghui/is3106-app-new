const MOCK_NOTES_URL = "mock-notes.json";

const api = {
  getNotes() {
    return fetch(MOCK_NOTES_URL);
  },
};

export default api;
