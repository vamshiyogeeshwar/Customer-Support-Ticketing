const API_BASE_URL = 'http://team-env.eba-mghaptds.ap-south-1.elasticbeanstalk.com';

const KnowledgeAPI = {
  async getAllArticles() {
    const response = await fetch(`${API_BASE_URL}/api/kb/gtallkb`);
    if (!response.ok) throw new Error("Failed to fetch articles");
    return response.json();
  },

  async addArticle(article) {
    const response = await fetch(`${API_BASE_URL}/api/kb/adkb`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    if (!response.ok) throw new Error("Failed to add article");
    return response.json();
  },

  async updateArticle(article) {
    const response = await fetch(`${API_BASE_URL}/api/kb/updkb`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    if (!response.ok) throw new Error("Failed to update article");
    return response.json();
  },

  async deleteArticle(id) {
    const response = await fetch(`${API_BASE_URL}/api/kb/delkb/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete article");
    return response.json();
  },

  async getArticleById(id) {
    const response = await fetch(`${API_BASE_URL}/api/kb/gtkbid/${id}`, {
      method: "GET",
    });
    if (!response.ok) throw new Error("Failed to fetch article by ID");
    return response.json();
  },
};


export default KnowledgeAPI;
