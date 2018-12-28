import React from 'react'

export default class AuthorsPreview extends React.Component {
  render () {
    return (
      <div>
        <h1>Authors</h1>
        {
          this.props.widgetsFor('authors').map( (author, index) => {
            return (
              <div key={ index }>
                <hr />
                <strong>{ author.getIn(['data', 'name']) }</strong>
                { author.getIn(['widgets', 'description']) }
              </div>
            )
          })
        }
      </div>
    )
  }
}