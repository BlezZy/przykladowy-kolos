const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()

        if(!allUsers) {
            return res.status(404).json({error: 'Users not found'})
        }

        return res.status(200).json(allUsers)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getUserByID = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({error: 'Invalid ID'})
        }

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({error: 'User not found'})
        }

        return res.status(200).json(user)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const addUser = async (req, res) => {
    try {
        const userData = req.body
        if (!userData) {
            return res.status(404).json({error: 'Request body empty'})
        }

        const newUser = new User(userData)
        const savedUser = await newUser.save()
        return res.status(200).json(savedUser)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({error: 'Invalid ID'})
        }
        const userData = req.body

        if (!userData) {
            return res.status(404).json({error: 'Request body empty'})
        }

        const updatedUser = await User.findByIdAndUpdate(id, userData)
        return res.status(200).json(updatedUser)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(404).json({error: 'Invalid ID'})
        }
        const deleteUser = await User.findByIdAndDelete(id)
        return res.status(200).json(deleteUser)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getUser = async (req, res) => {
    try {
        const { name, isActive, minAge, maxAge} = req.query;

        const query = {};
        if (name) query.name = name;
        if (isActive !== undefined) query.isActive = isActive === 'true';

        if (minAge) query.age = { ...query.age, $gte: Number(minAge) };
        if (maxAge) query.age = { ...query.age, $lte: Number(maxAge) };


        const users = await User.find(query);

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found with the given criteria" });
        }

        res.status(200).json({ message: "Users retrieved", users });
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(400).json({ message: err.message });
    }
};

const getUserStatistics = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $group: {
                    _id: null,
                    youngest: { $min: "$age" },
                    oldest: { $max: "$age" },
                    averageAge: { $avg: "$age" },
                    activeCount: { $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] } },
                    inactiveCount: { $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    youngest: 1,
                    oldest: 1,
                    averageAge: 1,
                    activeCount: 1,
                    inactiveCount: 1
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({ message: "User statistics", data: result[0] });
    } catch (err) {
        console.error("Error in aggregation:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    getAllUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
    getUser,
    getUserStatistics
}