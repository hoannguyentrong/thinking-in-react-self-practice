// var ReactDOM = require('react-dom');
// var React = require('react');


var Comment = React.createClass({
  getInitialState: function () {
    return {author: '', text: ''};
  },
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span>{this.props.text}</span>
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentList = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} text={comment.text}/>
      );
    });
    return (
      <div className="commentList">
        {commentList}
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function () {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadCommentFromServer();
  },
  loadCommentFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  onCommentSubmitted: function (newComment) {
    console.log(newComment);
    var comments = this.state.data;
    var newComments = comments.concat([newComment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: newComment,
      success: function (data) {
        debugger;
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmited={this.onCommentSubmitted}/>
      </div>
    )
  }
});

var author = '';
var comment = '';

var CommentForm = React.createClass({
  getInitialState: function () {
    return {author: '', text: ''};
  },
  handleAuthorChange: function (e) {
    author = e.target.value;
    this.setState({author: e.target.value});
  },
  handleTextChange: function (e) {
    console.log(this.state);
    this.setState({text: e.target.value});
    console.log(this.state);
  },
  handleSubmitForm: function (e) {
    e.preventDefault();
    if (this.state.author && this.state.text) {
      this.props.onCommentSubmited({author: this.state.author, text: this.state.text});
      this.setState({author: '', text: ''});
    }
  },
  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmitForm}>
        <input type="text" placeholder="Your name" onChange={this.handleAuthorChange} value={this.state.author}/>
        <input type="text" placeholder="Text" onChange={this.handleTextChange} value={this.state.text}/>
        <input type="submit" value="Post"/>
      </form>
    );
  }
});

var data = [{
  author: 'AAA',
  comment: 'AAA comment'
}, {
  author: 'BBB',
  comment: 'BBB comment'
}];

ReactDOM.render(
  <CommentBox url="/api/comments"/>, document.getElementById('content')
);
