

export default React => {
  const { Component } = React
  const withFilter = ComponentToApplyFilter => {
    return class extends Component {
      updateFilter = () => {

      }
      render(){
        <ComponentToApplyFilter {...this.props} updateFilter={this.updateFilter} />
      }
    }
  }
}
