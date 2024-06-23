const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body; // Getting input from the models
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        });

        const savedFirm=await firm.save();

        vendor.firm.push(savedFirm);

        await vendor.save();

        return res.status(200).json({ message: 'Firm added successfully' });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

};

const deleteFirmById=async(req,res)=>{
    try{
        const firmId=req.params.firmId;

        const deletedFirm=await Firm.findByIdAndDelete(firmId);

        if(!deletedFirm){
            return res.status(404).json({error:"No Firm found"});
        }
        res.status(200).json({ message: "Firm deleted successfully" });

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
      }
}

// Export middleware and controller
module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmById };
