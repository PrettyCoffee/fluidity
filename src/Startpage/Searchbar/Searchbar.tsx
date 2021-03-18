import React from 'react';
import styled from "@emotion/styled";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as settingsHandler from "../Settings/settingsHandler";

import google from "../../data/pictures/google.svg";
import duckduckgo from "../../data/pictures/duckduckgo.svg";
import qwant from "../../data/pictures/qwant.svg";

const StyledSearchbarContainer = styled.div`
    position: fixed;
    left: 100px;
    right: 50px;
    bottom: 40px;
    height:min-content;
    `;
const StyledSearchbar = styled.input`
    width: 100%;
    font-size: 30pt;
    
    background-color: rgba(0,0,0,0);
    color: var(--default-color);
    transition: .3s;
    border: none;
    border-bottom: 2px solid var(--default-color);
    opacity: 0.3;
    
    ::placeholder {
        color: var(--default-color);
    }
    
    :hover, :focus {
        opacity: 1;
        outline: none;
    }
`;

const SearchIcon = styled.img`
    position: fixed;
    left: 35px;
    bottom: 40px;
    height: 2.9rem;
    transition: .3s;
`;

export const Searchbar = () => {
    const engine: string = settingsHandler.getValue("search-engine") || "duckduckgo.com/";
    const searchSymbol = engine.startsWith("google") ? google
        : engine.startsWith("qwant") ? qwant
            : duckduckgo;

    function redirectToSearch(query: string) {
        window.location.href = "https://" + engine + "?q=" + query;
    }

    return (
        <StyledSearchbarContainer>
            <StyledSearchbar
                placeholder="Always stay clean!"
                type="input"
                onKeyUp={e => e.which === 13 && redirectToSearch(e.currentTarget.value)}
                autoFocus={true}
            />
            <SearchIcon src={searchSymbol} />
        </StyledSearchbarContainer>
    );
}
