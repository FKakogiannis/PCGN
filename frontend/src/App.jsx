import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from './ResponsiveAppBar.jsx';
import Footer from './Footer.jsx';
import LoginPage from './LoginPage.jsx';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider, TextField, Button } from '@mui/material';
import { auth } from './utils/firebase';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('board games');
  const [username, setUsername] = useState('');
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null); 


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const [comments, setComments] = useState({
    'board games': [
      { username: 'Alice', comment: 'I love board games!' },
      { username: 'David', comment: 'Can’t wait to try the new game!' },
    ],
    'rpgs': [
      { username: 'Bob', comment: 'RPGs are the best!' },
      { username: 'Sara', comment: 'Looking forward to our next campaign.' },
    ],
    'wargames': [
      { username: 'Charlie', comment: 'Wargames for the win!' },
      { username: 'Tom', comment: 'Warhammer is amazing.' },
    ],
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddComment = () => {
    if (!username || !newComment) return;

    setComments((prevComments) => ({
      ...prevComments,
      [selectedCategory]: [
        { username, comment: newComment },
        ...prevComments[selectedCategory],
      ],
    }));

    setUsername('');
    setNewComment('');
  };

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <ResponsiveAppBar onSelectCategory={handleCategorySelect} />
      <Container component="main" sx={{ flexGrow: 1, mt: 4 }}>
        <Typography variant="h6">Add a Comment for {selectedCategory}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 4 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            sx={{ mt: 1 }}
          >
            Submit
          </Button>
        </Box>
        
        <Typography variant="h4">Selected Category: {selectedCategory}</Typography>
        {selectedCategory === 'board games' && <div>Showing Board Games</div>}
        {selectedCategory === 'rpgs' && <div>Showing RPGs</div>}
        {selectedCategory === 'wargames' && <div>Showing Wargames</div>}
      
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            User Comments for {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </Typography>
          <List>
            {comments[selectedCategory].map((comment, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={comment.username}
                    secondary={comment.comment}
                  />
                </ListItem>
                {index < comments[selectedCategory].length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Container>
      
      <Box
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          py: 2,
          mt: 'auto',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
