import React from 'react';
import './autocompleteSearch.css';

export default class AutocompleteSearch extends React.Component {
    constructor (props){
        super(props);
        this.items = [
            "USA",
            "RU",
            "CN",
            "China",
            "CooCoo"
        ];
        this.state = {
            suggestions: [],
            searchValue: ''

        }
    }

    onChange= (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0){
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState({
            suggestions: ({suggestions}),
            searchValue: value
        })
    }

    selectSuggestion = (value) => {
        this.setState({
            suggestions: [],
            searchValue: value
        });
    }

    renderSuggestions () {
        const { suggestions } = this.state.suggestions;
        if(this.state.suggestions.length===0){
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={()=>this.selectSuggestion(item)}>{item}</li>)}
            </ul>
        );
    }

    render() {
        return (
            <div className = "AutoCompleteText">
                <input value = {this.state.searchValue} onChange = {this.onChange} type = "text" placeholder = "Country Name" />
                {this.renderSuggestions()}
            </div>
        )
    }
}