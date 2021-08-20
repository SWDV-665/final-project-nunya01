const express = require('express');
const app = express();
const itemRoute = express.Router();

let ItemModel = require('../model/HomeItem');

// Add Item
itemRoute.route('/create-item').post((req, res, next) => {
    ItemModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all items
itemRoute.route('/').get((req, res) => {
    ItemModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single item
itemRoute.route('/get-item/:id').get((req, res) => {
    ItemModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update item
itemRoute.route('/update-item/:id').put((req, res, next) => {
    ItemModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            res.json(data)
            console.log('Item successfully updated!')
        }
    })
})

// Delete item
itemRoute.route('/delete-item/:id').delete((req, res, next) => {
    ItemModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = itemRoute;