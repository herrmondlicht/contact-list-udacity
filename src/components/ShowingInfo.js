export default React => {
  const { Component } = React;
  const ShowingInfo = (props) => {
    const { showingLength, totalLength, clearFilter } = props;
    return (
      showingLength !== totalLength && (
      <div className="showing-contacts" >
        <span>Showing {showingLength} out of {totalLength}</span>
        <button onClick={clearFilter}>Show all</button>
      </div>
    ))
  }
  return ShowingInfo;
}
