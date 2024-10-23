const Parent = require('../models/Parent');
const circleController = require('./circleController'); // Import the circle controller to add parents to circles

// Register a parent and automatically add them to the relevant social circles
exports.registerParent = async (req, res) => {
    try {
        const { name, child_school_id, child_grade, child_section, community } = req.body;

        // Check if the parent already exists in the system
        let parent = await Parent.findOne({ where: { name } });
        if (!parent) {
            // Create new parent if they don't exist
            parent = await Parent.create({
                name,
                child_school_id,
                child_grade,
                child_section,
                community,
            });
        } else {
            return res.status(400).json({ message: "Parent already registered" });
        }

        // Add the parent to the appropriate social circles
        await circleController.addParentToCircles(parent);

        res.status(201).json({ message: 'Parent registered successfully and added to social circles' });
    } catch (error) {
        console.error('Error registering parent:', error);
        res.status(500).json({ message: 'Server error occurred while registering parent' });
    }
};

// Fetch a parent's profile and their circles
exports.getParentProfile = async (req, res) => {
    try {
        const { parentId } = req.params;

        // Fetch the parent details
        const parent = await Parent.findByPk(parentId, {
            include: ['Circles'], // Assuming you've set up associations between parents and circles
        });

        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        res.status(200).json(parent);
    } catch (error) {
        console.error('Error fetching parent profile:', error);
        res.status(500).json({ message: 'Server error occurred while fetching parent profile' });
    }
};

// Update parent details (e.g., changing grade or community)
exports.updateParentDetails = async (req, res) => {
    try {
        const { parentId } = req.params;
        const { child_grade, child_section, community } = req.body;

        // Find the parent
        const parent = await Parent.findByPk(parentId);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }

        // Update the parent's details
        await parent.update({
            child_grade,
            child_section,
            community,
        });

        // Re-add the parent to the appropriate circles if any details have changed
        await circleController.addParentToCircles(parent);

        res.status(200).json({ message: 'Parent details updated successfully' });
    } catch (error) {
        console.error('Error updating parent details:', error);
        res.status(500).json({ message: 'Server error occurred while updating parent details' });
    }
};
