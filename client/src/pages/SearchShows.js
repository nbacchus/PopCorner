import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { SAVE_SHOW } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { saveShowIds, getSavedShowIds } from '../utils/localStorage';

const SearchShows = () => {
  const userData = useQuery(QUERY_ME);
  const [searchedShows, setSearchedShows] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedShowIds, setSavedShowIds] = useState(getSavedShowIds());

  const [saveShow] = useMutation(SAVE_SHOW, {
    refetchQueries: [
      { query: QUERY_ME }
    ]
  });


  useEffect(() => {
    return saveShowIds(savedShowIds);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    try {
      const response = await fetch(`http://api.tvmaze.com/search/shows?q=${searchInput}`)
      console.log(response)
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const data = await response.json();
      console.log(data)

      const show = data;
      console.log(show);

      const showData = data.map((show) => ({
        showId: show.show.id,
        name: show.show.name,
        genre: show.show.genres || ['No genres to display'],
        image: show.show.image?.original || '',
        url: show.show.url
      }));

      setSearchedShows(showData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveShow = async (showId) => {
    const showToSave = searchedShows.find((show) => show.showId === showId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveShow({
        variables: {
          userId: userData.data?.me._id,
          showId: showToSave.id,
          name: showToSave.name,
          genre: showToSave.genres,
          image: showToSave.image,
          url: showToSave.url
        }
      });
      setSavedShowIds([...savedShowIds, showToSave.showId]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light'>
        <Container>
          <h1>Search for Shows!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a show'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedShows.length
            ? `Viewing ${searchedShows.length} results:`
            : 'Search for a show to begin'}
        </h2>
        <CardColumns>
          {searchedShows.map((show) => {
            return (
              <Card key={show.showId} border='dark'>
                <h2 className="card-title">{show.name}</h2>
                {show.image ? (
                  <Card.Img src={show.image} alt={`The cover for ${show.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{show.name}</Card.Title>
                  <p className='small'>Genre: {show.genre}</p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedShowIds?.some((savedShowId) => savedShowId === show.showId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveShow(show.showId)}>
                      {savedShowIds?.some((savedShowId) => savedShowId === show.showId)
                        ? 'This show has been saved!'
                        : 'Save this Show!'}
                    </Button>
                  )}
                  <div className='google-link'>
                    <a href={show.url} target='_blank' rel='noopener noreferrer'>View Show in TVMaze</a>
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

export default SearchShows;