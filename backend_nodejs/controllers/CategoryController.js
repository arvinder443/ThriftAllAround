const Category = require("../models/CategoryModel")

const addCategory = (req, res) => {
    const { category_name, category_description, category_image } = req.body
    let validation = ""
    if (!category_name) validation += "Enter Category Name."
    if (!category_description) validation += "Enter Description."
    if (!category_image) validation += "Enter Category image."

    if (validation) {
        res.json({
            status: 400,
            success: false,
            msg: "Enter all the fields"
        })
    }
    else {
        Category.findOne({ category_name: req.body.category_name })
            .then(categoryPass => {
                if (category_name == null) {
                    const addCategory = new Category()
                    addCategory.category_name = req.body.category_name
                    addCategory.category_description = req.body.category_description
                    if(req.file)
                    {
                        addCategory.category_image="category/"+req.file.filename
                    }
                    categoryPass.save()
                    res.json({
                        status:200,
                        success:true,
                        msg:"Category added."
                    })
                }

            })
            .catch(categoryFail => {
                res.json({
                    status: 400,
                    success: false,
                    msg: String(categoryFail)
                })

            })
    }
}

module.exports = addCategory