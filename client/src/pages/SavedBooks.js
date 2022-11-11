import React from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';
import { useQuery } from '@apollo/client';


const SavedBooks = () => {

  const { loading, data: userData } = useQuery(QUERY_ME);

  const savedBooks = userData?.me.savedBooks;

  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [
      {query: QUERY_ME}
    ]
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteBook = async (bookId) => {

    try {
      const { data } = await removeBook({
        variables: { userId: userData.me._id, bookId: bookId  }
      });
      removeBookId(bookId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                  <div className='google-link'>
                    <a href={book.link} target='_blank' rel='noopener noreferrer'>View in Google Books</a>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
