-- The Schools table stores unique school entries, each with a name and ID.
-- Example: Entry -> (id: 1, name: "DPS School")
CREATE TABLE IF NOT EXISTS Schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- The Parents table holds parent information and includes an optional community field.
-- This table relates to Children for handling multiple children per parent.
-- Example: Entry -> (id: 1, name: "John Doe", community: "Brigade Society")
CREATE TABLE IF NOT EXISTS Parents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    community VARCHAR(255) DEFAULT NULL
);

-- The Children table allows each parent to register multiple children, associating each child with
-- a specific school, grade, and section. This supports cases where parents have multiple children in different grades or schools.
-- Example: Entry -> (id: 1, parent_id: 1, school_id: 1, grade: "I", section: "A")
CREATE TABLE IF NOT EXISTS Children (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NOT NULL,       -- Links to the parent in Parents table
    school_id INT NOT NULL,       -- School associated with this child
    grade VARCHAR(50) NOT NULL,   -- Child's grade level
    section VARCHAR(50) NOT NULL, -- Child's section in the grade
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE,
    FOREIGN KEY (school_id) REFERENCES Schools(id) ON DELETE CASCADE
);

-- The Circles table represents social circles, which can be school-related, community-based, or user-initiated.
-- The `parent_circle_id` field enables a hierarchical structure among circles.
-- Examples:
-- 1. School-based Circle: (id: 1, name: "DPS School", school_id: 1)
-- 2. Community-based Circle: (id: 2, name: "Brigade Society", community: "Brigade Society")
-- 3. Hierarchical Circle: (id: 3, name: "Grade I, DPS School", parent_circle_id: 1)
CREATE TABLE IF NOT EXISTS Circles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,           -- Circle name (e.g., "Grade I, DPS School")
    school_id INT DEFAULT NULL,           -- Optional link to a school
    community VARCHAR(255) DEFAULT NULL,  -- Optional community field for community-based circles
    parent_circle_id INT DEFAULT NULL,    -- Links to another circle for hierarchical structure
    user_initiated BOOLEAN DEFAULT FALSE, -- Indicates if the circle is created by a parent
    FOREIGN KEY (school_id) REFERENCES Schools(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_circle_id) REFERENCES Circles(id) ON DELETE CASCADE -- Supports hierarchical circles
);

-- The CircleMemberships table establishes a many-to-many relationship between parents and circles,
-- allowing parents to join any circle, including those not associated with a school.
-- Example: Entry -> (parent_id: 1, circle_id: 3) - John Doe joins "Grade I, DPS School"
CREATE TABLE IF NOT EXISTS CircleMemberships (
    parent_id INT NOT NULL,       -- Link to parent in Parents table
    circle_id INT NOT NULL,       -- Link to circle in Circles table
    PRIMARY KEY (parent_id, circle_id),  -- Composite key ensures unique memberships
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE,
    FOREIGN KEY (circle_id) REFERENCES Circles(id) ON DELETE CASCADE
);

-- The Posts table stores content created by parents within circles.
-- Each post belongs to a specific circle and is associated with a parent.
-- Example: Entry -> (id: 1, circle_id: 1, parent_id: 1, content: "Upcoming school events?")
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    circle_id INT NOT NULL,       -- Circle in which the post is made
    parent_id INT NOT NULL,       -- Parent who made the post
    content TEXT NOT NULL,        -- Content of the post
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of post creation
    FOREIGN KEY (circle_id) REFERENCES Circles(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE
);

-- The Replies table allows multi-level threading, where each reply can reference another reply.
-- This enables unlimited nesting, where each reply can reply to any other reply.
-- Examples:
-- 1. Direct Reply to Post: (id: 1, post_id: 1, parent_id: 1, content: "Looking forward to it!", parent_reply_id: NULL)
-- 2. Second-level Reply: (id: 2, post_id: 1, parent_id: 2, content: "Same here!", parent_reply_id: 1)
-- 3. Third-level Reply: (id: 3, post_id: 1, parent_id: 3, content: "What events?", parent_reply_id: 2)
CREATE TABLE IF NOT EXISTS Replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,            -- Original post that the reply belongs to
    parent_id INT NOT NULL,          -- Parent who made the reply
    content TEXT NOT NULL,           -- Content of the reply
    parent_reply_id INT DEFAULT NULL, -- Allows threading by linking to another reply
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_reply_id) REFERENCES Replies(id) ON DELETE CASCADE -- Self-referencing foreign key
);

-- The Votes table records upvotes or downvotes on posts and replies, allowing parents to engage with content.
-- Examples:
-- 1. Upvote for a Post: (id: 1, post_id: 1, parent_id: 1, vote_type: 'upvote')
-- 2. Downvote for a Reply: (id: 2, reply_id: 2, parent_id: 2, vote_type: 'downvote')
CREATE TABLE IF NOT EXISTS Votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT DEFAULT NULL,        -- Post being voted on (optional for reply votes)
    reply_id INT DEFAULT NULL,       -- Reply being voted on (optional for post votes)
    parent_id INT NOT NULL,          -- Parent casting the vote
    vote_type ENUM('upvote', 'downvote') NOT NULL,  -- Vote type (upvote or downvote)
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE,
    FOREIGN KEY (reply_id) REFERENCES Replies(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Parents(id) ON DELETE CASCADE
);
