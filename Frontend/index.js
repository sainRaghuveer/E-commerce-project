const button = document.getElementById("btn");


button.addEventListener("click", userForm);

async function userForm(){
    let obj={
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value,
        phone:document.getElementById("phone").value
    };

    try {
        const response =await fetch("https://e-commerce-website-fs.onrender.com/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(obj)
        });

        const res = await response.json();
        console.log(res);
    } catch (error) {
        console.log(error);
    }

}


const login = document.getElementById("btn1");


login.addEventListener("click", userLogin);

async function userLogin(){
    let obj={
        email:document.getElementById("email1").value,
        password:document.getElementById("password1").value,
    };

    try {
        const response =await fetch("https://e-commerce-website-fs.onrender.com/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(obj)
        });

        const res = await response.json();
        console.log(res);

        const username = document.createElement("h1");
        username.innerText=res.user[0].name;

        const email = document.createElement("h1");
        email.innerText=res.user[0].email;

        const div = document.getElementById("username");
        div.append(username, email);

    } catch (error) {
        console.log(error);
    }

};
