import React from "react";
import { moviesApi } from "api";
import HomePresenter from "./HomePresenter.js";

export default class HomeContainer extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    loading: true,
    error: null
  };

  componentDidMount = async () => {
    try {
      const {
        data: { results: nowPlaying }
      } = await moviesApi.nowPlaying();
      // console.log(nowPlaying);

      const {
        data: { results: upcoming }
      } = await moviesApi.upcoming();
      // console.log(upcoming);

      const {
        data: { results: popular }
      } = await moviesApi.popular();
      // console.log(popular);
      // throw Error();
      this.setState({
        nowPlaying,
        upcoming,
        popular
      });
    } catch {
      this.setState({
        error: "Can't find movie information."
      });
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { nowPlaying, upcoming, popular, loading, error } = this.state;
    console.log(nowPlaying, upcoming, popular, loading, error);
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
