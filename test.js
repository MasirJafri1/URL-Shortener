const ShortUniqueId = require("short-unique-id");

const shortId = new ShortUniqueId({ length: 10 });

console.log("Here is the id : ",shortId.randomUUID())