import axios from 'axios';
import {useEffect, useState } from "react";
 
function ShopItems()
{
  const [id, setId] = useState('');
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shopItems, setItems] = useState([]);



useEffect(() => {
 (async () => await Load())();
  }, []);
 
 //READ
 async function  Load()
  {
     const result = await axios.get(
         "http://192.168.1.129:8080/readAll");
         setItems(result.data);
         console.log(result.data);
  }
 

  //CREATE
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://192.168.1.129:8080/create",
        {
            name: name,
            quantity: quantity
        });
          alert("shopItems Registation Successfully");
          setId("");
          setName("");
          setQuantity("");
          Load();
        }
    catch(err)
        {
          alert("Creation of shopItems Failed");
        }
   }

 
   async function editItem(shopItems)
   {
    setName(shopItems.name);
    setQuantity(shopItems.quantity); 
    setId(shopItems.id);
   }

 //DELETE
   async function DeleteItem(id)
   {
        await axios.delete("http://192.168.1.129:8080/delete/" + id); 
        alert("Item deleted Successfully");
        Load();
   }

 //UPDATE
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://192.168.1.129:8080/update/" + id ,
       {

        name: name,
        quantity: quantity
       
       });
         alert("Item Updated");
         setId("");
         setName("");
         setQuantity("");
         Load();
       }
   catch(err)
       {
         alert("shopItems Updateddd Failed");
       }
  }



  //html design
  return (
    <div>
       <h1>Einkaufsliste</h1>
       <div class="container mt-4" >
          <form>

              <div class="form-group">
                <label>Product Name</label>
                <input  type="text" class="form-control" id="name"
                value={name}
                onChange={(event) =>
                  {
                    setName(event.target.value);      
                  }}
                />
              </div>


              <div class="form-group">
                <label>Product Quantity</label>
                <input  type="text" class="form-control" id="quantity" 
                 value={quantity}
                  onChange={(event) =>
                    {
                      setQuantity(event.target.value);      
                    }}
                />
              </div>

              <div>
              <button   class="btn btn-primary mt-4"  onClick={save}>ADD</button>

              <button   class="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>
                <br/>
<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col"> Name</th>
      <th scope="col"> Quantity</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {shopItems.map(function fn(shopItem)
       {
            return(
            <tbody>
                <tr>
                <td>{shopItem.name}</td>
                <td>{shopItem.quantity}</td>    
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editItem(shopItem)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeleteItem(shopItem.id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
}

  export default ShopItems;
  