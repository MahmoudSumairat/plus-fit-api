const addressDB = require("../db/models/Address");
const getDBUpdateFields = require("../helpers/getDBUpdateFields");
const getUpdateDataRow = require("../helpers/getUpdateDataRow");

class Address {
  addressData = {
    firstName: "",
    lastName: "",
    email: "",
    countyId: null,
    address1: null,
    address2: null,
    city: null,
    zipCode: null,
    mobilePhone: null,
    additionalMobilePhone: null,
    userId: null,
  };
  constructor(data) {
    if (Object.values(data).length) {
      this.addressData = { ...data };
    }
  }

  static getAddressById = async (addressId) => {
    try {
      const addressData = await addressDB.getAddressById(addressId);
      return Promise.resolve(addressData[0]);
    } catch (err) {
      throw err;
    }
  };

  create = async () => {
    try {
      const {
        firstName,
        lastName,
        email,
        countryId,
        address1,
        address2,
        city,
        zipCode,
        mobilePhone,
        additionalMobilePhone,
        userId,
      } = this.addressData;
      const addDataRow = [
        firstName,
        lastName,
        email,
        countryId,
        address1,
        address2,
        city,
        zipCode,
        mobilePhone,
        additionalMobilePhone,
        userId,
      ];
      const { insertId } = await addressDB.createAddress(addDataRow);
      return Promise.resolve(insertId);
    } catch (err) {
      throw err;
    }
  };

  updateAddress = async () => {
    try {
      const {
        firstName,
        lastName,
        email,
        countryId,
        address1,
        address2,
        city,
        zipCode,
        mobilePhone,
        additionalMobilePhone,
        userId,
        addressId,
      } = this.addressData;

      const updateAddressData = {
        first_name: firstName,
        last_name: lastName,
        email,
        address_1: address1,
        address_2: address2,
        city,
        country_id: countryId,
        zip_code: zipCode,
        mobile_phone: mobilePhone,
        additional_mobile_phone: additionalMobilePhone,
        user_id: userId,
      };
      const updateDataRow = getUpdateDataRow(updateAddressData, addressId);
      const updateFields = getDBUpdateFields(updateAddressData);
      await addressDB.updateAddress(updateFields, updateDataRow);
      return Promise.resolve(this.addressData);
    } catch (err) {
      throw err;
    }
  };

  deleteAddress = async () => {
    try {
      await addressDB.deleteAddress(this.addressData.addressId);
      return Promise.resolve(this.addressData.addressId);
    } catch (err) {
      throw err;
    }
  };
}

module.exports = Address;
