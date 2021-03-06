import React from 'react';
import { Card,Image } from 'semantic-ui-react';
import BookModal from "../BookModal/BookModal";
import { withWindowSizeListener } from 'react-window-size-listener';
const BookCard = (props) =>{
  
  const alternateImageSource = 'data:image/png;base64,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'
  const imageSource = props.info.volumeInfo.imageLinks !== undefined ? props.info.volumeInfo.imageLinks.thumbnail : alternateImageSource
  const imageSize = props.windowSize.windowWidth < 425 ? '200px' : '400px'
  return (
    <Card>
    <Image src={imageSource}  style ={{'height': imageSize,'width':'auto'}}/>
    <Card.Content>
      <Card.Header>{props.info.volumeInfo.title}</Card.Header>
      
      <Card.Description>
        {`By: ${props.info.volumeInfo.authors}`} <br></br>
        {`Published By: ${props.info.volumeInfo.publisher}`} <br></br>
        {`Published Date: ${props.info.volumeInfo.publishedDate}`} <br></br>
       
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <BookModal buttonName = {'Details'} bookInfo = {props}></BookModal>
    </Card.Content>
  </Card>
  );
};

export default withWindowSizeListener(BookCard);
