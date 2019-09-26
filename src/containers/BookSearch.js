import React, {Component} from 'react';
import { connect } from 'react-redux';
import BookCard from '../components/BookCard/BookCard'
import { Icon,Input } from 'semantic-ui-react';
import {Loader,Grid,Card,Message} from 'semantic-ui-react';
import * as actionCreators from '../store/actions/bookSearch'
import styles from './bookSearch.module.css';
import { withWindowSizeListener } from 'react-window-size-listener';

class BookSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {searchTerm: ''}
    this.renderBookCard= this.renderBookCard.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.processSearch = this.processSearch.bind(this);
    
  }
  
  renderBookCard = (BookInfos) => {
    
    if (BookInfos !== null){
     
   return BookInfos.map(BookInfo => <BookCard key = {BookInfo.id}info = {BookInfo} />);
    }
  }

  updateSearchTerm = (searchTerm) => {
  this.setState({searchTerm:searchTerm});
  } 

  processSearch = (val) => {
 
  if (val.length > 0){
    
    this.props.onGetBookData(val);
  }
}

cardRows = () => {
  if (this.props.windowSize.windowWidth < 1024 && this.props.windowSize.windowWidth > 500 ){
    return "2";
  }
  if (this.props.windowSize.windowWidth < 500 ){
    return "1";
  }
return "3";
}
renderErrorMessage = () => {
if (this.props.error){
return <Message negative ><Message.Header>{`Error: Cannot get book results `}</Message.Header></Message>
}
}


  render() {
    //()
    return (
    
    <Grid>

    <Grid.Row className ={[styles.content,styles.main].join(' ')}>
      <Grid.Column textAlign="center">
      <Input
      size='massive'  
      onChange = {(event) => this.updateSearchTerm(event.target.value)}
      icon={<Icon name='search' type = 'submit' onClick ={() => this.processSearch(this.state.searchTerm)} inverted circular link />}
      placeholder='Search...'
  />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row >
      <Grid.Column  className ={styles.content}>
      
        <Loader size = 'massive' content ='Loading...' className ={this.props.loading}/>
        {this.renderErrorMessage()}
      <Card.Group itemsPerRow={this.cardRows()}  className ={styles.padding}>
        {this.renderBookCard(this.props.BookInfos)
        }
        </Card.Group>
       
        
      
      </Grid.Column>
   
    </Grid.Row>

      </Grid>
  );
    }
};

const mapStateToProps = state => {
  
  return {
    BookInfos: state.BookInfos,
    error: state.error, 
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetBookData: (searchTerm) => dispatch(actionCreators.getBookData(searchTerm))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(withWindowSizeListener(BookSearch));
