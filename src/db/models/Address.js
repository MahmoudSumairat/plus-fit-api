const db = require("../connection/dbConnect");
const queryHandler = require("../../helpers/queryHandler");
const { format } = require("mysql");

const Address = {
  createAddress: (addressData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
            
                INSERT INTO addresses
                (first_name, 
                last_name, 
                email, 
                country_id, 
                address_1, 
                address_2, 
                city, 
                zip_code, 
                mobile_phone, 
                additional_mobile_phone, 
                user_id)
                VALUES
                (?)

            
            `,
        [addressData],
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  getAddressById: (addressId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        SELECT * FROM addresses WHERE address_id = ?
      
      `,
        addressId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  updateAddress: (addressFields, addressData) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        UPDATE addresses SET ${addressFields}
        WHERE address_id = ?
      
      `,
        addressData,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },

  deleteAddress: (addressId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
      
        DELETE FROM addresses WHERE address_id = ?
      
      `,
        addressId,
        (err, res) => queryHandler(err, res, resolve, reject)
      );
    });
  },
};

module.exports = Address;
