import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/")
    };
  }
  // constructor가 없으면 state = {}로.
  // 있으면, 지금 처럼 constructor안으로.

  componentDidMount = async () => {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    // 렌더링할 일이 없는 경우(this.isMovie = pathname.includes('/movie/')).
    // re랜더링이 필요한 경우 this.state안에 둠.
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/"); // return push를 하면, if이면 push를 if가 아니면, return ;으로 function을 종료함.
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  };

  render() {
    // console.log(this.props);
    console.log(this.state.result);
    const { result, loading, error } = this.state;
    return <DetailPresenter result={result} loading={loading} error={error} />;
  }
}
