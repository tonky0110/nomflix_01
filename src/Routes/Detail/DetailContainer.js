import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class DetailContainer extends React.Component {
  state = {
    result: null,
    loading: true,
    error: null
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/"); // return push를 하면, if이면 push를 if가 아니면, return ;으로 function을 종료함.
    }
  };

  render() {
    // console.log(this.props);
    const { result, loading, error } = this.state;
    return <DetailPresenter result={result} loading={loading} error={error} />;
  }
}
