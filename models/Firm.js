const mongoose=require('mongoose');

const firmSchema=new mongoose.Schema({

    firmName:{
        type:String,
        required:true,
        unique:true
    },
    

    area:{
     type:String,
     required:true,
    },

    category:{
        type:[
            {
                type:String,
                enum: ['veg' , 'non-veg'] //to give multiple values array and enum for more values
            }
        ]
    },

    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chinese','bakery']
            }
        ]
    },

    offer:{
        type:String
    },

    image:{
        type:String
    },

    vendor:[
      {
        type:mongoose.Schema.Types.ObjectId,  //connecting bewteen tables in mongo db relation
        ref:'Vendor'
      }
    ],

    product: [{
        type:mongoose.Schema.Types.ObjectId, //linking products to firm database with connecctions
        ref:'Product'
       }]
});


const Firm = mongoose.model('Firm',firmSchema);

module.exports=Firm