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

module.exports = {
    deleteCategory
};


module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory
};
