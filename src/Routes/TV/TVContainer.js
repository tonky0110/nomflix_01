import React from "react";
import { tvApi } from "api";
import TVPresenter from "./TVPresenter";

export default class TVContainer extends React.Component {
  state = {
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null
  };

  componentDidMount = async () => {
    try {
      const {
        data: { results: topRated }
      } = await tvApi.topRated();

      const {
        data: { results: popular }
      } = await tvApi.popular();

      const {
        data: { results: airingToday }
      } = await tvApi.airingToday();

      this.setState({
        topRated,
        popular,
        airingToday
      });
    } catch {
      console.log("Can't find Tv information.");
    } finally {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { topRated, popular, airingToday, loading, error } = this.state;
    console.log(topRated, popular, airingToday, loading, error);
    return (
      <TVPresenter
        topRated={topRated}
        popular={popular}
        airingToday={airingToday}
        loading={loading}
        error={error}
      />
    );
  }
}
