import { useEffect, useState } from "react";
import api from "../axios";
import "./Admin.css";
function Admin(){

const [users,setUsers] = useState([]);
const [orders,setOrders] = useState([]);
const [products,setProducts] = useState([]);


// FETCH DATA
useEffect(()=>{

// products
fetch("http://localhost:5000/api/products")
.then(res=>res.json())
.then(data=>setProducts(data));


// orders
api.get("/orders")
.then(res=>setOrders(res.data));


// users
api.get("/users")
.then(res=>setUsers(res.data));

},[]);


// TOTAL REVENUE
const totalRevenue = orders.reduce((sum,o)=>{

return sum + (o.total || 0);

},0);


return(

<div className="admin-container">

<h2>Admin Dashboard</h2>

<div className="stats">

<div className="stat-card">

<h3>Total Users</h3>

<p>{users.length}</p>

</div>


<div className="stat-card">

<h3>Total Products</h3>

<p>{products.length}</p>

</div>


<div className="stat-card">

<h3>Total Orders</h3>

<p>{orders.length}</p>

</div>


<div className="stat-card">

<h3>Total Revenue</h3>

<p>₹ {totalRevenue}</p>

</div>

</div>

</div>

);

}

export default Admin;