const Circle = require('../models/Circle');
const Parent = require('../models/Parent');
const { Op } = require('sequelize'); // Import for query operators

// Function to add a parent to the appropriate social circles
exports.addParentToCircles = async (parent) => {
    const { child_school_id, child_grade, child_section, community } = parent;

    // Define circle names based on parent data
    const schoolCircleName = `School: ${child_school_id}`;
    const gradeCircleName = `Grade ${child_grade}, School: ${child_school_id}`;
    const sectionCircleName = `Section ${child_section}, Grade ${child_grade}, School: ${child_school_id}`;
    const communityCircleName = community ? `Community: ${community}` : null;
    const combinedCircleName = community ? `${community}, School: ${child_school_id}` : null;

    // Array to hold the social circles
    const socialCircles = [];

    // 1. Ensure the School circle exists (parent circle)
    let schoolCircle = await Circle.findOne({ where: { name: schoolCircleName } });
    if (!schoolCircle) {
        schoolCircle = await Circle.create({ name: schoolCircleName, school_id: child_school_id });
    }
    socialCircles.push(schoolCircle);

    // 2. Create or find Grade circle under the School circle
    let gradeCircle = await Circle.findOne({ where: { name: gradeCircleName } });
    if (!gradeCircle) {
        gradeCircle = await Circle.create({
            name: gradeCircleName,
            school_id: child_school_id,
            parent_circle_id: schoolCircle.id // Setting parent_circle_id for hierarchy
        });
    }
    socialCircles.push(gradeCircle);

    // 3. Create or find Section circle under the Grade circle
    let sectionCircle = await Circle.findOne({ where: { name: sectionCircleName } });
    if (!sectionCircle) {
        sectionCircle = await Circle.create({
            name: sectionCircleName,
            school_id: child_school_id,
            parent_circle_id: gradeCircle.id // Setting parent_circle_id for hierarchy
        });
    }
    socialCircles.push(sectionCircle);

    // 4. Optionally create community-based circles if provided
    if (communityCircleName) {
        let communityCircle = await Circle.findOne({ where: { name: communityCircleName } });
        if (!communityCircle) {
            communityCircle = await Circle.create({
                name: communityCircleName,
                community: community
            });
        }
        socialCircles.push(communityCircle);

        // Create combined circle for community and school, linked to community circle
        let combinedCircle = await Circle.findOne({ where: { name: combinedCircleName } });
        if (!combinedCircle) {
            combinedCircle = await Circle.create({
                name: combinedCircleName,
                school_id: child_school_id,
                community: community,
                parent_circle_id: communityCircle.id // Setting community circle as parent
            });
        }
        socialCircles.push(combinedCircle);
    }

    // Add parent to each circle
    for (const circle of socialCircles) {
        await circle.addParent(parent); // Assuming circle.addParent exists for membership
    }
};

// API to handle creating a new circle (for parent-initiated circles)
exports.createUserInitiatedCircle = async (req, res) => {
    const { name, parentId, school_id, parent_circle_id } = req.body;

    // Check if the circle already exists
    let existingCircle = await Circle.findOne({ where: { name } });
    if (existingCircle) {
        return res.status(400).json({ message: "Circle already exists" });
    }

    // Create the new circle with an optional parent_circle_id for hierarchy
    const newCircle = await Circle.create({
        name,
        school_id,
        parent_circle_id, // Allows new circle to be nested under an existing circle
        userInitiated: true
    });

    // Add the parent who created it to the circle
    const parent = await Parent.findByPk(parentId);
    await newCircle.addParent(parent);

    res.status(201).json({ message: "User-initiated circle created", circle: newCircle });
};

// API to search for available circles (for discoverability)
exports.searchCircles = async (req, res) => {
    const { query } = req.query;

    // Search for circles by matching the query string in the name
    const circles = await Circle.findAll({
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        }
    });

    res.status(200).json(circles);
};
