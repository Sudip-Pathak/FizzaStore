import bcrypt from "bcryptjs";

const users = [
    {
        name: "admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("password", 10),  // // Not following the logic of signup, as is it wrapping in database.
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john.doe@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
    },
    {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: bcrypt.hashSync("password", 10),
        isAdmin: false,
    },
];

export default users;




