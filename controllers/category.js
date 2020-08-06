const Category = require("../models/category");
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category) {
            return res.status(400).json({
                error: 'Category does not exist!!'
            });
        }
        req.category = category;
        next();
    });
};

exports.create = (req, res) => {
    const category = new Category(req.body);
    // console.log(category);
    category.save((err, data) => {
        console.log(data)
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

// exports.create = async (req, res) => {

//     try {
//         const category = new Category(req.body);
//         console.log(category)
//         await category.save();
//         res.status(200).send(category);
//     } catch (e) {
//         res.status(400).send({ error: errorHandler(e) })
//     }

// };

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    const category = req.category;
    console.log(category);
    category.name = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
};

exports.remove = (req, res) => {
    const category = req.category;

    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: `${data.name} has been deleted!`
        });
    });
};

exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json(data);
    });
};
