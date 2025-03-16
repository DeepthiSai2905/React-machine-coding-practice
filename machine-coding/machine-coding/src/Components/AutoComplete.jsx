import React, { useEffect, useState } from 'react'
import '../css/autocomplete.css';

const AutoComplete = () => {
    const [results, setResults] = useState([]);
    const [selectedItems, setselectedItems] = useState([]);
    const [input, setInput]= useState('');
    const [showResults, setShowResults] = useState(false);

    useEffect(()=>{
        fetchData();
    },[input])

    useEffect(() => {
        console.log("Updated selectedItems:", selectedItems);
    }, [selectedItems]);
    
    const fetchData = async() => {
        try{
            const apiCall = `https://dummyjson.com/recipes/search?q=${input}`
            const res = await fetch(apiCall);
            const data = await res.json();
            setResults(data?.recipes);
        }
        catch(error){
            console.log("error",error);
        }
    }

    const addSelectedItem = (item) => {
        setselectedItems((prev)=>[...prev,item]);
        setInput(''); // Clear input after selection
        setShowResults(false); 

        console.log("selecteditems",selectedItems);
    }

    const removeItem = (id)=>{
        setselectedItems(selectedItems.filter((item)=>item.id!==id));
    }
    
    console.log("selecteditems",selectedItems)
    return (
        <div>
            <h1>AutoComplete</h1>
            <input 
                type="text"
                className='search-input'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onFocus={()=>setShowResults(true)}
                onBlur={()=>setShowResults(false)}
            />
            {results.length>0 && showResults && <div className='results-container'>
                {results.map((item)=>(
                    <span key={item.id} className='dropdown-item' onClick={()=>addSelectedItem(item)}>{item.name}</span>
                ))
                }
                {selectedItems.length>0 && 
                  <div className='filtered-container'> 
                    {selectedItems.map((item)=>(
                        <span key={item.id} className='selected-item'>
                            {item.name}<button onClick={()=>removeItem(item.id)}>Remove</button>

                        </span>
                            
                    ))}
                  </div>
                }
               </div>
            }
        </div>
    )
}

export default AutoComplete