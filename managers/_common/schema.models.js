const emojis = require('../../public/emojis.data.json');

module.exports = {
  id: {
    path: 'id',
    type: 'string',
    length: { min: 1, max: 50 },
  },
  userName: {
    path: 'userName',
    type: 'string',
    length: { min: 3, max: 20 },
    custom: 'userName',
  },
  password: {
    path: 'password',
    type: 'string',
    length: { min: 8, max: 100 },
  },
  title: {
    path: 'title',
    type: 'string',
    length: { min: 3, max: 300 },
  },
  label: {
    path: 'label',
    type: 'string',
    length: { min: 3, max: 100 },
  },
  shortDesc: {
    path: 'desc',
    type: 'string',
    length: { min: 3, max: 300 },
  },
  longDesc: {
    path: 'desc',
    type: 'string',
    length: { min: 3, max: 2000 },
  },
  url: {
    path: 'url',
    type: 'string',
    length: { min: 9, max: 300 },
  },
  emoji: {
    path: 'emoji',
    type: 'Array',
    items: {
      type: 'string',
      length: { min: 1, max: 10 },
      oneOf: emojis.value,
    },
  },
  price: {
    path: 'price',
    type: 'number',
  },
  avatar: {
    path: 'avatar',
    type: 'string',
    length: { min: 8, max: 100 },
  },
  text: {
    type: 'String',
    length: { min: 3, max: 20 },
  },
  longText: {
    type: 'String',
    length: { min: 3, max: 250 },
  },
  paragraph: {
    type: 'String',
    length: { min: 3, max: 10000 },
  },
  phone: {
    type: 'String',
    length: { min: 10, max: 15 },
  },
  gender: {
    type: 'String',
    regex: /^(male|female)$/,
  },
  email: {
    type: 'String',
    regex:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  number: {
    type: 'Number',
    length: { min: 1, max: 6 },
  },
  arrayOfStrings: {
    type: 'Array',
    items: {
      type: 'String',
      length: { min: 3, max: 100 },
    },
  },
  obj: {
    type: 'Object',
  },
  bool: {
    type: 'Boolean',
  },
  role: {
    type: 'string',
    regex: /^(superAdmin|admin|user)$/i,
  },
  capacity: {
    type: 'Number',
    min: 1,
    max: 80,
  },
  grade: {
    type: 'Number',
    min: 1,
    max: 12,
  },
  academicYear: {
    type: 'String',
    regex: /^\d{4}-\d{4}$/,
  },
};
