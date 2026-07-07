import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const registerUser = async () => {

const res = await fetch("http://localhost:5000/api/auth/register", {

method: "POST",

headers: {

"Content-Type": "application/json"

},

body: JSON.stringify({

name,
email,
password

})

});

const data = await res.json();

if(res.ok){

alert("Registered Successfully");

navigate("/login");

}
else{

alert(data.message);

}

};

return (

<div>

<h2>Register</h2>

<input placeholder="Name" onChange={(e)=>setName(e.target.value)} />

<br/><br/>

<input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

<br/><br/>

<input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

<br/><br/>

<button onClick={registerUser}>

Register

</button>

</div>

);

}

export default Register;
