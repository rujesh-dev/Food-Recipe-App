import {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const GlobalContext = createContext(null);

export default function GlobalState({children}){

    const [searchParams, setSearchParams] = useState('');
    const [loading, setLoading] = useState(false);

    const [recipeList, setRecipeList] = useState([]);

    const [recipeDetailsData, setRecipeDetailsData] = useState(null);

    const [favouritesList, setFavouritesList] = useState([]);

    const navigate = useNavigate();


    async function handleAddToFavourites(currentElement) {
        console.log(currentElement, "favourites1111");
        
        const copyFavouritesList = [...favouritesList];

        const index = copyFavouritesList.findIndex((item)=> item.id === currentElement.id);

        if(index === -1){
            copyFavouritesList.push(currentElement)
        }else{
            copyFavouritesList.splice(currentElement)

        }

        setFavouritesList(copyFavouritesList)

        console.log(favouritesList, "copyFavourietlis");
        
    }

    async function handleSubmit(event){
        event.preventDefault();
        try{
            const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`);
            const data = await res.json();
            // console.log(data);
            
            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes)
                setLoading(false);
                setSearchParams('')
                navigate('/')
            }
        }

        catch(e){
            console.log(e);
            setLoading(false);
            setSearchParams('')
            
        }
    }

    console.log(loading, recipeList);
    
    return (
        <GlobalContext.Provider value={{searchParams, setSearchParams, handleSubmit, loading, recipeList, recipeDetailsData, setRecipeDetailsData, handleAddToFavourites, favouritesList, setFavouritesList}}>{children}</GlobalContext.Provider>
    )
}