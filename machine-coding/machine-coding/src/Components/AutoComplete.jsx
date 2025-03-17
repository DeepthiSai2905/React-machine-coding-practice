import React, { useEffect, useState, useRef} from 'react'
import '../css/autocomplete.css';

// should be solved in 30min max - whole component and optimisations
const AutoComplete = () => {
    const [results, setResults] = useState([]);
    const [selectedItems, setselectedItems] = useState([]);
    const [input, setInput]= useState('');
    const [showResults, setShowResults] = useState(false);
    const cacheRef = useRef({}); // can use useref here

    /*
     Improve performance -  Debouncing - instead of making api call on every key stroke, call api when user stops typing
    
    */
    useEffect(()=>{
        // debouncing

        // optimisation 1 - using timer
        const debounceTimer = setTimeout(fetchData, 500);
        // fetchData();

        //return will be called during unmounting of component
        // cleanup function
        return ()=>{
            clearTimeout(debounceTimer);
        }
    },[input])

    const fetchData = async() => {
        if(cacheRef.current[input]){
            console.log("cache CALL - ",input)
            setResults(cacheRef.current[input]);
            return ;
        }
        try{
            console.log("API CALL - ",input)
            const apiCall = `https://dummyjson.com/recipes/search?q=${input}`
            const res = await fetch(apiCall);
            const data = await res.json();
            setResults(data?.recipes);
            // setCache((prev)=>({...prev,[input]:data?.recipes}))
            cacheRef.current[input]=data?.recipes;
        }
        catch(error){
            console.log("error",error);
        }
    }

    const addSelectedItem = (item) => {
        setselectedItems((prev)=>[...prev,item]);
        setInput(''); // Clear input after selection
        setShowResults(false);
    }

    const removeItem = (id)=>{
        setselectedItems((prev)=> prev.filter((item)=>item.id!==id));
    }
    
    console.log("selecteditems",selectedItems)
    return (
        <div>
            <h1>AutoComplete</h1>
            {selectedItems.length>0 && 
                <div className='filtered-container'> 
                {selectedItems.map((item)=>(
                    <span key={item.id} className='selected-item'>
                        {item.name}<button onClick={()=>removeItem(item.id)}>✘</button>
                    </span>
                        
                ))}
                </div>
            }
            <input 
                type="text"
                className='search-input'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onFocus={()=>setShowResults(true)}
                // onBlur={()=> setTimeout (()=>setShowResults(false),2000)}
            />
            
            {results.length>0 && showResults && <div className='results-container'>
                {results.map((item)=>(
                    <span key={item.id} className='dropdown-item' onClick={()=>addSelectedItem(item)}>{item.name}</span>
                ))
                }
               </div>
            }
            
        </div>
    )
}

export default AutoComplete