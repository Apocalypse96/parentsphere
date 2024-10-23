-- Create the Schools table
CREATE TABLE IF NOT EXISTS Schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the Parents table
CREATE TABLE IF NOT EXISTS Parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    child_school_id INT NOT NULL,
    child_grade VARCHAR(50) NOT NULL,
    child_section VARCHAR(50) NOT NULL,
    community VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (child_school_id) REFERENCES Schools(id) ON DELETE CASCADE
);

-- Create the Social Circles table
CREATE TABLE IF NOT EXISTS Circles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    school_id INT NOT NULL,
    user_initiated BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (school_id) REFERENCES Schools(id) ON DELETE CASCADE
);

-- Create the Circle Memberships table (Many-to-Many relationship between parents and circles)
CREATE TABLE IF NOT EXISTS CircleMemberships (
    parent_id INT NOT NULL,
    circle_id INT NOT NULL,
    PRIMARY KEY (parent_id, circle_id),
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE,
    FOREIGN KEY (circle_id) REFERENCES Circles(id) ON DELETE CASCADE
);

-- Create the Posts table
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    circle_id INT NOT NULL,
    parent_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (circle_id) REFERENCES Circles(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE
);

-- Create the Replies table
CREATE TABLE IF NOT EXISTS Replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    parent_id INT NOT NULL,
    content TEXT NOT NULL,
    parent_reply_id INT DEFAULT NULL, -- Reply to another reply (threading)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_reply_id) REFERENCES Replies(id) ON DELETE CASCADE
);

-- Create the Votes table
CREATE TABLE IF NOT EXISTS Votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT DEFAULT NULL,
    reply_id INT DEFAULT NULL,
    parent_id INT NOT NULL,
    vote_type ENUM('upvote', 'downvote') NOT NULL,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    FOREIGN KEY (reply_id) REFERENCES Replies(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE
);
