import React, { Component } from 'react';
import Like from './common/like';
import Pagination from './common/pagination';

import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = { movies: getMovies(), pageSize: 4 };

	handleDelete(movie) {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	}

	handleLiked(movie) {
		const movies = this.state.movies;
		const movieIndex = movies.indexOf(movie);
		movies[movieIndex].liked = !movies[movieIndex].liked;
		this.setState({ movies });
	}

	handlePageChange() {}

	render() {
		const { length: count } = this.state.movies;

		if (count === 0) return 'There are no movies in the database.';

		return (
			<React.Fragment>
				<p>Showing {count} movies in the database.</p>

				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>Title</th>
							<th scope='col'>Genre</th>
							<th scope='col'>Stock</th>
							<th scope='col'>Rate</th>
							<th scope='col'>Rate</th>
							<th scope='col' />
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like liked={movie.liked} onLiked={() => this.handleLiked(movie)} />
								</td>
								<td>
									<button className='btn btn-sm btn-danger' onClick={() => this.handleDelete(movie)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination itemsCount={count} pageSize={this.state.pageSize} onPageChange={this.handlePageChange} />
			</React.Fragment>
		);
	}
}

export default Movies;
