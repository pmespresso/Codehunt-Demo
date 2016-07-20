import React from 'react';
import Popup from '../Navbar/Popup';

class ProductPopup extends React.Component {


  constructor() {
    super();

    this.state = {
      product: {
        id: 1,
        name: "codeAcademy",
        link: 'https://www.codeacademy.com',
        media: '/img/codeacademy.jpeg',
        upvote: 169,
        description: "Code for anyone",
        maker: {
          name: 'Nathan Park',
          avatar: '/img/hieu.jpeg'
        }
      },

      comments: [
        {
          name: "Leo",
          avatar: "/img/leo.jpeg",
          content: "I love this shit"
        },
        {
          name: "Johnny",
          avatar: "/img/hieu.jpeg",
          content: "This shit cray!"
        }
      ]
    }
  }

  renderUpvoteButton() {
		return (
			<a className="upvote-button" href="#">
				<span>
					<i className="fa fa-sort-asc"></i>
				</span>

				{this.state.product.upvote}
			</a>
		);
	}

  renderHeader() {
    return (
      <header style={{backgroundImage: 'url(' + this.state.product.media + ')'}}>

        <section className="header-shadow">
          <h1>{this.state.product.name}</h1>
          <p>{this.state.product.description}</p>
          <section>

            {this.renderUpvoteButton()}
            <a className="getit-btn" href={this.state.product.link} target="_blank"> GET IT </a>
          </section>
        </section>
      </header>

    );
  }

  renderBodyDiscussion() {
    return (
      <section className="discussion">
        <h2> Discussion </h2>

        <section className="post-comment">
          <img className="medium-avatar" src="/img/leo.jpeg" />
          <input placeholder="What Do You Think?" />
        </section>
      </section>

    );
  }

  renderBody() {
    return (
      <section className="product-popup-body">
        <main>
          {this.renderBodyDiscussion()}
        </main>
      </section>

    );
  }

  renderComments() {

    return (
      <ul className="comment-list">
        {
          this.state.comments.map(function(comment, idx) {
            return (
              <li key={idx}>
                <img className="medium-avatar" src={comment.avatar} />

                <section>
                  <strong>{comment.name}</strong>
                  <p>{comment.content}</p>
                </section>

               </li>
             );
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <Popup {...this.props} style="product-popup" >
        <h2> Product Info Here </h2>
        {this.renderHeader()}
        {this.renderBody()}
        {this.renderComments()}
      </Popup>
    );
  }

}

export default ProductPopup;
