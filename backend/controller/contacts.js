const Contact = require("../models/contactModel");

exports.getContacts = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const offSet = (parseInt(page) - 1) * limit;
  const total_contacts = await Contact.find().count();
  try {
    const result = await Contact.find().limit(limit).skip(offSet);
    res.status(200).json({
      success: true,
      result: result,
      total_pages: Math.ceil(total_contacts / limit),
      page: page,
    });
  } catch (error) {
    res.status(500).json({ err: err });
  }
};
exports.upDateContact = async (req, res, next) => {
  const {
    emailAddress,
    relatedName,
    homeAddress2,
    displayName,
    homePhone,
    _id,
    notes,
  } = req.body;
  try {
    const updateRecord = await Contact.updateOne(
      { _id: _id },
      {
        emailAddress: emailAddress,
        relatedName: relatedName,
        homeAddress2: homeAddress2,
        displayName: displayName,
        homePhone: homePhone,
        notes: notes,
      }
    );
    res.status(200).json({ success: true, updateRecord });
  } catch (error) {
    res.status(500).json({ err: err });
  }
};
