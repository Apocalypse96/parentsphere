# 🌐 **ParentSphere** 👪

Welcome to **ParentSphere**, the ultimate social network for parents! ParentSphere brings moms and dads together in a powerful, safe, and connected community where they can share experiences, ask questions, and stay up-to-date on their children's schools and neighborhoods. 🎉


## 📚 **Overview**

**ParentSphere** revolutionizes how parents connect with each other by automatically joining them into **social circles** based on:
- The **school** their child attends 📖
- The **community** or neighborhood they live in 🏘️

From school-related groups to local community circles, ParentSphere ensures that parents are always connected, supported, and informed.

Parents can:
- **Create Posts** to discuss anything, from school lunches to extracurricular activities 📝
- **Reply to Posts** and engage in meaningful conversations 🗨️
- **Upvote or Downvote** posts and replies, making sure the best content rises to the top! 👍👎
- **Create New Social Circles** for specialized interests 🌐
- **Search for Circles** to discover new groups and communities 🔍

ParentSphere is **your space, your sphere**—a place where parents meet, collaborate, and build a supportive network for their children and families. 💪

---

## 🎯 **Key Features**

- **Auto-join Circles**: Parents are automatically added to relevant circles based on their child’s school, grade, section, and community! 🎯
- **Post, Reply, and Engage**: Share ideas, ask questions, and discuss with other parents in your circles. 🗣️
- **Voting System**: Upvote or downvote posts and replies to curate the best content. 🔥
- **Create and Discover Circles**: Want a special circle for a bus route or an activity group? Easily create one, or search for existing circles! 🌟
- **User-Initiated Circles**: Start circles for specific interests like extracurricular clubs, hobbies, or community activities! 🛠️

---

## 🛠 **Tech Stack**

ParentSphere is built on a robust and modern web technology stack:

### **Backend**:
- **Node.js** & **Express.js**: Blazing-fast and scalable server-side architecture 🚀
- **Sequelize ORM**: For handling the relational data models and database operations seamlessly 💽
- **MySQL**: Reliable and robust relational database to store user and circle data 📊

### **Frontend** (Future Idea):
- **React.js**: Build interactive UIs for a dynamic frontend experience (future expansion) ⚛️

---

## 📂 **Project Structure**

Here's the organized structure of ParentSphere:

```plaintext
/parentsphere
├── config
│   └── db.js                # Database configuration
├── controllers
│   ├── parentController.js   # Logic for parent-related actions
│   ├── postController.js     # Logic for posts, replies, and votes
│   └── circleController.js   # Logic for managing circles
├── models
│   ├── Parent.js             # Parent model schema
│   ├── Circle.js             # Circle model schema
│   ├── Post.js               # Post model schema
│   ├── Reply.js              # Reply model schema
│   └── Vote.js               # Vote model schema
├── routes
│   ├── parentRoutes.js       # Routes for parent operations
│   ├── postRoutes.js         # Routes for posts, replies, and voting
│   └── circleRoutes.js       # Routes for circles and searches
├── utils
│   └── helpers.js            # Utility functions for shared logic
├── migrations
│   └── migrations.sql        # SQL scripts to set up the database schema
├── app.js                    # Main server file
├── .env                      # Environment variables (DB credentials)
└── README.md                 # You are here!
```

---

## 🚀 **Getting Started**

Follow these steps to get ParentSphere running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Apocalypse96/parentsphere.git
cd parentsphere
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

Create a `.env` file in the root directory and add your database configuration:

```env
DB_NAME=parentsphere
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
PORT=3000
```

Make sure you have MySQL running and create the database:

```sql
CREATE DATABASE parentsphere;
```

### 4. Run the Application

Sync the database and start the server:

```bash
node app.js
```

The server should now be running on `http://localhost:3000`.

### 5. Test the Endpoints

Use **Postman** or **cURL** to test the API:

- **Register a Parent**:
  ```bash
  POST http://localhost:3000/api/parents/register
  ```
  Example JSON Body:
  ```json
  {
    "name": "Jane Doe",
    "child_school_id": 1,
    "child_grade": "Grade II",
    "child_section": "Section B",
    "community": "Palm Meadows"
  }
  ```

- **Create a Post**:
  ```bash
  POST http://localhost:3000/api/posts/create
  ```
  Example JSON Body:
  ```json
  {
    "circle_id": 1,
    "parent_id": 1,
    "content": "Can anyone recommend a good tutor for math?"
  }
  ```

---

## 💡 **Future Enhancements**

ParentSphere is only just getting started! Here are some exciting ideas for future enhancements:

- **Mobile App**: Develop a mobile app using React Native so parents can stay connected on the go 📱.
- **Push Notifications**: Notify parents instantly about new posts, replies, or important announcements 🔔.
- **Event Scheduling**: Allow parents to create events like playdates, PTA meetings, or extracurricular activities 📅.
- **Advanced Search & Filters**: Enable more complex search and filtering options for circles and posts 🔍.

