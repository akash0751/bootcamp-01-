const users = [
    { name: "AK", age: 30 },
    { name: "BK", age: 22 },
    { name: "CK", age: 27 },
    { name: "DK", age: 19 },
    { name: "EK", age: 35 }
];

const filterByAge = (arr, minAge) => {
    return arr.filter(user => user.age > minAge);
};

const filteredUsers = filterByAge(users, 20);

console.log("Users older than 20:", filteredUsers);
