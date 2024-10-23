const Circle = require('../models/Circle');
const Parent = require('../models/Parent');

// Function to add a parent to the appropriate social circles
exports.addParentToCircles = async (parent) => {
    const { child_school_id, child_grade, child_section, community } = parent;

    // Define circle names based on parent data
    const schoolCircle = `School: ${child_school_id}`;
    const gradeCircle = `Grade ${child_grade}, School: ${child_school_id}`;
    const sectionCircle = `Section ${child_section}, Grade ${child_grade}, School: ${child_school_id}`;
    const communityCircle = community ? `Community: ${community}` : null;
    const combinedCircle = community ? `${community}, School: ${child_school_id}` : null;

    // Array to hold the social circles
    const socialCircles = [schoolCircle, gradeCircle, sectionCircle];
    if (communityCircle) socialCircles.push(communityCircle, combinedCircle);

    // Iterate through the circles and create them if they don't exist, then add parent to the circle
    for (const circleName of socialCircles) {
        let circle = await Circle.findOne({ where: { name: circleName } });
        if (!circle) {
            // Create new circle
            circle = await Circle.create({ name: circleName, school_id: child_school_id });
        }
        // Add parent to the circle (we assume there's a membership logic to handle this)
        await circle.addParent(parent);
    }
};

// API to handle creating a new circle (for parent-initiated circles)
exports.createUserInitiatedCircle = async (req, res) => {
    const { name, parentId, school_id } = req.body;

    // Check if the circle already exists
    let existingCircle = await Circle.findOne({ where: { name } });
    if (existingCircle) {
        return res.status(400).json({ message: "Circle already exists" });
    }

    // Create the new circle
    const newCircle = await Circle.create({ name, school_id, userInitiated: true });

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
