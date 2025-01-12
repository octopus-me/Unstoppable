import React, { useState } from 'react';
import style from './Search.module.css';
import searchIcon from '../Imagens/icon.png';
import { gql, useLazyQuery } from '@apollo/client';

import Button from '../Layout/Button';

const GET_SUGGESTIONS = gql`
    query GetSuggestions(
        $searchTerm: String!
    ){
        suggestions(term: $searchTerm){
            id
            suggestion
        }
    }
`;

function Search() {
    const [term, setTerm] = useState('');
    const [getSuggestions, { loading, data, refetch}] = useLazyQuery(GET_SUGGESTIONS);

    const handleInputChange = (e) => {
        
        const value = e.target.value;
        setTerm(value);

        getSuggestions({ variables: { searchTerm: value } });
    };


    const handleSuggestionClick = (suggestion) => {
        setTerm(suggestion);
        refetch({ searchTerm: '' });
    };


    function renderSuggestions() {

        if (loading) {
            return <p>Carregando...</p>;
        }

        initialPartBold();
    
        if (data) {
            return (
                <ul className={style.list}>
                    {data.suggestions.map((suggestion) => (
                        <li key={suggestion.id}>
                            <Button                                 
                                handleSug={() => handleSuggestionClick(suggestion.suggestion)} 
                                sugg={initialPartBold(suggestion.suggestion)}
                            ></Button>

                        </li>       
                    ))}
                </ul>
            );
        }

        return null;
    }

    function initialPartBold(suggestedText){
        const size = term.length;
        
        if(suggestedText){
            
            const matchedText = suggestedText.slice(0,size)
            const afterMatch = suggestedText.slice(size,)

            return (
                <>
                    <strong>{matchedText}</strong>
                    {afterMatch}
                </>
            )
        }

        return null
    }

    function searchInput(){
        return (
            <input 
                type="text" 
                placeholder='Digite para buscar...' 
                value={term} 
                onChange={handleInputChange}>
            </input>
            
        )
    }
    
    return(
        <div>
            <div className={style.search}>

                <img src={searchIcon} alt="icon"></img>

                <h1>Busca com Autocompletar</h1>
                <p>Digite no campo abaixo para exibir as sugestões</p>
                
                {searchInput()}

                <button className={style.button}>BUSCAR</button>

            </div>

            <div className={style.suggestions}>
                {renderSuggestions()}
            </div>

        </div>

    )
}

export default Search;