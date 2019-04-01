const dataset = require('./super-nested-data').requests;

const mongoose = require('../mongoose/lib');
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
  campus: {
    cafeteria: Boolean,
    cashboxes: Boolean,
    cashboxes_extra_info: Number,
    ccc: Boolean,
    classroom: Boolean,
    classroom_extra_info: String,
    gym: Boolean,
    gym_extra_info: String,
    includes_food: Boolean,
    includes_food_extra_info: String,
    library: Boolean,
    location_on_campus: String,
    screens: Boolean,
    screens_extra_info: String,
    setup_image: String,
    speakers: Boolean,
    tables: Boolean,
    tables_extra_info: String,
    theater: Boolean
  },
  fundraiser: {
    food_sales_expected_costs: String,
    food_sales_expected_income: String,
    food_sales_expected_items_sold: String,
    food_sales_expected_selling_price: String,
    food_sales_product_description: String,
    fundraiser_type: String
  },
  general: {
    activity_name: String,
    advisor_email: String,
    all_dates: String,
    event_description: String,
    event_on_campus: String,
    is_fundraiser: String,
    organization_name: String,
    requester_email: String,
    requester_name: String,
    start_date: String
  },
  meta: {
    approved: {
      admin: {
        approved: Boolean,
        time: Number,
        who: String
      },
      asb: {
        approved: Boolean,
        time: Number,
        who: String
      },
      ccc: {
        approved: Boolean,
        time: Number,
        who: String
      },
      gym: {
        approved: Boolean,
        time: Number,
        who: String
      }
    },
    archived: Boolean,
  }
});
const RequestModel = mongoose.model('Request', RequestSchema);

// Load data into DB
mongoose.connect('mongodb://localhost/requests', function (err) {
  if (err) {
    throw err;
  }

  Object.keys(dataset).forEach((k) => {
    // console.log('k = ' + k);
    RequestModel.create(dataset[k], (err, data) => {
      if (err) {
        throw err;
      }
      // console.log('================ created ' + data.toString());
    });
  });

  RequestModel.find({'campus.speakers': true}).then(data => {
    console.log('found ' + JSON.stringify(data));
  })

  // cleanup();
});

function cleanup() {
  RequestModel.find({}).remove({}, () => {
    mongoose.disconnect();
  }).exec();
}
