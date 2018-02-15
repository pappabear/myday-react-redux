//export const addArticle = article => (
//	console.log('Put your addArticle API call here stupid')
//	return { type: "ADD_ARTICLE", payload: article }
//);

export function addArticle(article) {
	console.log('Put your addArticle API call here')
	console.log("id=" + article.id);
	console.log("title=" + article.title);
    return {
        type: 'ADD_ARTICLE',
        payload: article
    };
}

export function articlesFetchDataSuccess(articles) {
    return {
        type: 'ARTICLES_FETCH_DATA_SUCCESS',
        articles
    };
}

export function articlesFetchData() {
	console.log('Put your articlesFetchData() API call here, since its connected and thunked')
	    return (dispatch) => {
			var articles = [
		        {
		            id: '1',
		            title: 'Article 1'
		        },
		        {
		            id: '2',
		            title: 'Article 2'
		        }
			];			
			dispatch(articlesFetchDataSuccess(articles));
		};
}
