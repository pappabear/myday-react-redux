import React, { Component } from "react";
import { connect } from "react-redux";
import { articlesFetchData } from '../actions';

const mapStateToProps = state => {
	console.log('List->mapStateToProps->state.articles = ' + state.articles.length);
	console.log('List->mapStateToProps->state = ' + state.length);
  	return { articles: state.articles };
};

//const ConnectedList = ({ articles }) => (
//  <ul className="list-group list-group-flush">
//    {articles.map(el => (
//      <li className="list-group-item" key={el.id}>
//        {el.title}
//      </li>
//    ))}
//  </ul>
//);

class List extends Component {
	
    componentDidMount() {
		console.log('List->componentDidMount->props.articles = ' + this.props.articles.length);
        this.props.fetchData();
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
			<ul className="list-group list-group-flush">
			    {this.props.articles.map(el => (
			      <li className="list-group-item" key={el.id}>
			        {el.title}
			      </li>
			    ))}
			</ul>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(articlesFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);

