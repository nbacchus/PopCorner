import React from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_SHOW } from '../utils/mutations';
import { removeShowId } from '../utils/localStorage';
import { useQuery } from '@apollo/client';
// test

const SavedShows = () => {

  const { loading, data: userData } = useQuery(QUERY_ME);

  const savedShows = userData?.me.savedShows;

  const [removeShow] = useMutation(REMOVE_SHOW, {
    refetchQueries: [
      { query: QUERY_ME }
    ]
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDeleteShow = async (showId) => {

    try {
      const { data } = await removeShow({
        variables: { userId: userData.me._id, showId: showId }
      });
      removeShowId(showId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved shows!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {savedShows.length
            ? `Viewing ${savedShows.length} saved ${savedShows.length === 1 ? 'show' : 'shows'}:`
            : 'You have no saved shows!'}
        </h2>
        <CardColumns>
          {savedShows.map((show) => {
            return (
              <Card key={show.showId} border='dark'>
                {show.image ? <Card.Img src={show.image} alt={`The cover for ${show.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{show.name}</Card.Title>
                  <p className='small'>Genre: {show.genre}</p>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteShow(show.showId)}>
                    Delete this Show!
                  </Button>
                  <div className='google-link'>
                    <a href={show.url} target='_blank' rel='noopener noreferrer'>View in TVMaze</a>
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

export default SavedShows;
