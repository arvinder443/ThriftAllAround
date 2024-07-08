const Category = require("../models/CategoryModel");

const addCategory = (req, res) => {
    const { category_name, category_description } = req.body;
    let validation = "";
    if (!category_name) validation += "Enter Category Name. ";
    if (!category_description) validation += "Enter Description. ";
    if (!req.file) validation += "Enter Category image. ";

    if (validation) {
        res.json({
            status: 400,
            success: false,
            msg: validation.trim()
        });
    } else {
        Category.findOne({ category_name: req.body.category_name })
            .then(categoryPass => {
                if (!categoryPass) {
                    const addCategory = new Category();
                    addCategory.category_name = req.body.category_name;
                    addCategory.category_description = req.body.category_description;
                    if (req.file) {
                        addCategory.category_image = "category/" + req.file.filename;
                    }
                    addCategory.save()
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                msg: "Category added."
                            });
                        })
                        .catch(err => {
                            res.json({
                                status: 400,
                                success: false,
                                msg: String(err)
                            });
                        });
                } else {
                    res.json({
                        status: 400,
                        success: false,
                        msg: "Category name already exists."
                    });
                }
            })
            .catch(categoryFail => {
                res.json({
                    status: 400,
                    success: false,
                    msg: String(categoryFail)
                });
            });
    }
};

const getAllCategories=(req,res)=>{
    Category.find(req.body)
    .then(getAllCategoriesPass=>{
        res.json({
            status:200,
            success:true,
            msg:getAllCategoriesPass
        })
    })
    .catch(getAllCategoriesFail=>{
        res.json({
            status:200,
            success:true,
            msg:String(getAllCategoriesFail)
        })
    })
}

const deleteCategory = (req, res) => {
    Category.findOne({ _id: req.body._id })
        .then(deleteCategoryPass => {
            if (deleteCategoryPass) {
                Category.deleteOne({ _id: req.body._id })
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            msg: "Category deleted"
                        });
                    })
                    .catch(err => {
                        res.json({
                            status: 400,
                            success: false,
                            msg: String(err)
                        });
                    });
            } else {
                res.json({
                    status: 404,
                    success: false,
                    msg: "Category not found"
                });
            }
        })
        .catch(deleteCategoryFail => {
            res.json({
                status: 400,
                success: false,
                msg: String(deleteCategoryFail)
            });
        });
};
const updateCategory = (req, res) => {
    if (!req.body._id) {
        return res.json({
            status: 400,
            success: false,
            msg: "Category ID is required"
        });
    }

    Category.findOne({_id: req.body._id})
        .then(updateCategoryPass => {
            if (updateCategoryPass) {
                if (req.body.category_name && req.body.category_name.trim() !== "") {
                    updateCategoryPass.category_name = req.body.category_name;
                } else {
                    return res.json({
                        status: 400,
                        success: false,
                        msg: "Category name is required"
                    });
                }

                if (req.body.category_description && req.body.category_description.trim() !== "") {
                    updateCategoryPass.category_description = req.body.category_description;
                } else {
                    return res.json({
                        status: 400,
                        success: false,
                        msg: "Category description is required"
                    });
                }

                if (req.file && req.file.filename) {
                    updateCategoryPass.category_image = "category/" + req.file.filename;
                }

                updateCategoryPass.save()
                    .then(() => {
                        res.json({
                            status: 200,
                            success: true,
                            msg: "Category updated successfully"
                        });
                    })
                    .catch(saveError => {
                        res.json({
                            status: 500,
                            success: false,
                            msg: "Failed to save the updated category: " + String(saveError)
                        });
                    });
            } else {
                res.json({
                    status: 404,
                    success: false,
                    msg: "Category not found"
                });
            }
        })
        .catch(updateCategoryFail => {
            res.json({
                status: 500,
                success: false,
                msg: "Error finding category: " + String(updateCategoryFail)
            });
        });
};




module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
};
