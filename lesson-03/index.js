/// setTimeout - to simulate a delayed operation.
console.log("Start");

setTimeout(() =>{
    console.log("Database response");
}, 2000 );

console.log("End");

/// Promise - represents an operation that will finish later.
const promise = new Promise((resolve, reject) => {
    resolve("Success");  /// Resolve - The operation succeeded.
    reject("Error"); /// Reject - The operation failed.
});

/// .then() - to handle the resolved value of a promise.
const getUser = new Promise((resolve, reject) => {
    resolve("User found")
});

getUser.then((result) => {
    console.log(result);
});

const getUser2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            id: 1,
            name: "Mayank Kumar",
        });
    }, 2000);
});

getUser2.then((user) => {
    console.log(user);
})


/// .reject() - to handle the rejected value of a promise.
const getUser3 = new Promise((resolve, reject) => {
    const useExists = false;
    if(useExists){
        resolve({
            id: 1,
            name: "Mayank Kumar",
        });
    } else {
        reject("User not found");
    }
});

getUser3.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

/// async/await - to handle promises in a more synchronous way.
    // async - to declare a function as asynchronous.
const hello = async() => {
    return "Hello";
};

hello().then((result) => {
    console.log("Async result:", result);
})
    
    // await - Wait for this Promise to finish before continuing this async function.
const getUser4 = async() => {
    const user = await getUser2;
    console.log("Await User:", user);
}

// try/catch - to handle errors in async functions.
const getUser5 = async () => {
  try {
    const user = await fetchUser();

    console.log(user);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
};

///
const getCustomer = () => {
    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            const customerExists = false;
            if(customerExists){
                resolve({
                    id: 1,
                    name: "Mayank Kumar",
                    email: "mayank@example.com"
                });
            } else {
                reject("Customer not found");
            }
        }, 2000);
    });
}

const getCustomerData = async() => {
    try {
        const customer = await getCustomer();
        console.log("Customer Data:", customer);
    } catch(error) {
        console.log("Error:", error);
    }
};

getCustomerData();