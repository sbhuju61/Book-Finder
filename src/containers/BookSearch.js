import React, {Component} from 'react';
import { connect } from 'react-redux';
import BookCard from '../components/BookCard/BookCard';
import {Icon,Input,Loader,Grid,Card,Message,Header,Segment} from 'semantic-ui-react';
import * as actionCreators from '../store/actions/bookSearch';
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
      <Segment style={{ padding: '4em 0em' }} vertical>
    <Grid centered>
      <Grid.Row className={styles.content}  >
      <Grid.Column >
      
      <Header style={{'fontSize': '4em'}} textAlign='center' as='h1' >
      <Icon  color='teal' name='book' /> 
    Book Finder
      </Header>

      </Grid.Column>
    </Grid.Row>
      
    <Grid.Row className={styles.content}>
      <Grid.Column textAlign="center" >
      <Input 
      size='massive'  
      onChange = {(event) => this.updateSearchTerm(event.target.value)}
      icon={<Icon name='search' type = 'submit' onClick ={() => this.processSearch(this.state.searchTerm)} inverted circular link />}
      placeholder='Search...'
  />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row className={styles.content} style={{ padding: '0em 4em' }}>
      <Grid.Column >
      
        <Loader  size = 'massive' content ='Loading...' className ={this.props.loading}/>
        {this.renderErrorMessage()}
      <Card.Group itemsPerRow={this.cardRows()}  >
        {this.renderBookCard(this.props.BookInfos)
        }
        </Card.Group>
       
        
      
      </Grid.Column>
   
    </Grid.Row>

      </Grid>
      </Segment>
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
