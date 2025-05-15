const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
  const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Vendor ID from request:', req.vendorid); // Changed to match verifyToken

        const {firmName, area, category, region, offer} = req.body
        
        const image = req.file? req.file.filename:undefined;    

        const vendor = await Vendor.findById(req.vendorid); // Changed to match verifyToken
        console.log('Found vendor:', vendor);

        if(!vendor){
            return res.status(404).json({message: "Vendor not found"});
        }
        
        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        })
        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm._id);
        await vendor.save();


        return res.status(201).json({ message: "Firm added successfully" });
    } catch (error) {
        console.error('Error in addFirm:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const deleteFirmById = async(req, res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await Firm.findByIdAndDelete(firmId);
        if(!deletedProduct){
            return res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
}
module.exports = { 
    addFirm: [upload.single('image'), addFirm], deleteFirmById
};