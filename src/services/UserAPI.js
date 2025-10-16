//code owith api's without sample data
import Cookies from "js-cookie";

const API_BASE_URL =
  "http://team-env.eba-mghaptds.ap-south-1.elasticbeanstalk.com"; // 🔧 Replace this with your real backend URL

const UserAPI = {
  async getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/api/usr/gtusrs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify({
        pageNumber: 0,
        pageSize: 10,
        // totalElements: 3,
        // totalPages: 1,
        // last: true,
      }),
    });
    return response.json();
  },

  async saveUser(userData) {
    const response = await fetch(`${API_BASE_URL}/api/usr/sv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async updateUser(userData) {
    const response = await fetch(`${API_BASE_URL}/api/usr/updt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async deleteUser(id) {
    const response = await fetch(`${API_BASE_URL}/api/usr/dlusr/${id}`, {
      method: "DELETE",
       headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
    });
    return response.json();
  },

  // ✅ Get User by ID
  async getUserById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/usr/gt/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user by ID");

      return await response.json();
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },
};

export default UserAPI;
