import React from 'react';
import styled from "@emotion/styled"
import * as settingsHandler from "../Settings/settingsHandler"

const StyledSearchbar = styled.input`
    position: fixed;
    left: 50px;
    right: 50px;
    bottom: 40px;

    width: calc(100% - 100px);
    font-size: 30pt;

    background-color: rgba(0,0,0,0);
    color: var(--default-color);
    opacity: 0.3;
    transition: .3s;
    border: none;
    border-bottom: 2px solid var(--default-color);
    
    ::placeholder {
        color: var(--default-color);
    }
    
    :hover, :focus {
        opacity: 1;
        outline: none;
    }
`;

export const Searchbar = () => {
    const engine = settingsHandler.getValue("search-engine") || "duckduckgo.com/";

    function redirectToSearch(query: string) {
        window.location.replace("https://" + engine + "?q=" + query);
    }

    return (
        <StyledSearchbar
            placeholder="Always stay clean!"
            type="input"
            onKeyUp={e => e.which === 13 && redirectToSearch(e.currentTarget.value)}
            autoFocus={true}
        />
    );
}
