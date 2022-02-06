import Joi from "joi";
import multer from "multer";
import path from "path";
import CustomErrorHandler from "../services/CustomErrorHandler";
import fs from "fs";
import Product from "../models/product";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 100000 * 5 },
}).single("image");

const productController = {
  async product(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        console.log(err);
        return next(CustomErrorHandler.serverError("Internal server Error.."));
      }

      const filePath = req.file.path;
      //validation
      const productSchema = Joi.object({
        name: Joi.string().required(),
        size: Joi.string().required(),
        price: Joi.number().required(),
      });
      const { error } = productSchema.validate(req.body);
      if (error) return next(error);

      if (error) {
        //delete the image
        fs.unlink(`${appRoot}${filePath}`, (err) => {
          if (err) {
            return next(
              CustomErrorHandler.serverError("Internal server Error...")
            );
          }
          return next(error);
        });
      }
      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });

        res.status(200).json(document);
      } catch (error) {
        return next(CustomErrorHandler.serverError("Internal error..."));
      }
    });
  },
  async update(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        console.log(err);
        return next(CustomErrorHandler.serverError("Internal server Error.."));
      }
      let filePath;
      if (req.file) {
        filePath = req.file.path;
      }
      //validation
      const productSchema = Joi.object({
        name: Joi.string().required(),
        size: Joi.string().required(),
        price: Joi.number().required(),
      });
      const { error } = productSchema.validate(req.body);
      if (error) return next(error);

      if (error && filePath) {
        //delete the image
        fs.unlink(`${appRoot}${filePath}`, (err) => {
          if (err) {
            return next(
              CustomErrorHandler.serverError("Internal server Error...")
            );
          }
          return next(error);
        });
      }
      const { name, price, size } = req.body;
      let document;
      try {
        document = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            name,
            price,
            size,
            ...(filePath && { image: filePath }),
          },
          { new: true }
        );
        res.status(200).json(document);
      } catch (error) {
        return next(CustomErrorHandler.serverError("Internal error..."));
      }
    });
  },
  async get(req, res, next) {
    let products;
    try {
      products = await Product.find();
      return res.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  },
  async delete(req, res, next) {
    const id = req.params.id;
    try {
      await Product.findOneAndRemove({ _id: id });
      res.status(201).json({ Status: "OK" });
    } catch (error) {
      return next(CustomErrorHandler.serverError("Internal error..."));
    }
  },
};

export default productController;
